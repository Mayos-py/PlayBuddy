import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlaybuddyproxyService } from '../playbuddyproxy.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css']
})
export class UserGroupComponent implements OnInit, OnDestroy {
  groupInfo: any;
  reqId: string | null = null;
  sportName: string | null = null;
  zipCode: number | null = null;
  currentUser: any;
  dataSource = new MatTableDataSource<any>();
  subscriptions = new Subscription();

  constructor(
    private router: Router,
    private proxy$: PlaybuddyproxyService,
    private route: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { [key: string]: any };
      this.reqId = state['reqId'];
      this.sportName = state['sportName'];
      this.zipCode = state['zipCode'];
    }

    console.log('reqID:',this.reqId)
    if (this.reqId) {
      this.subscriptions.add(
        this.proxy$.getUserGroupInfo(this.reqId).subscribe({
          next: (data) => {
            this.dataSource.data = [data];
            this.groupInfo = [data];
            // console.log('Retrieved User info:', data);
          },
          error: (error) => console.error('Error fetching sports data:', error)
        })
      );
    } else {
      console.error('reqId is null');
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  cancel() {
    const navigationExtras: NavigationExtras = {
      state: {
        zipCode: this.zipCode,
        sportName: this.sportName
      }
    };
    this.router.navigate(['/player-request'], navigationExtras);
  }

}
