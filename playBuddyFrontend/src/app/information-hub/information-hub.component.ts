import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlaybuddyproxyService } from '../playbuddyproxy.service';

@Component({
  selector: 'app-information-hub',
  templateUrl: './information-hub.component.html',
  styleUrls: ['./information-hub.component.css']
})
export class InformationHubComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['sportName', 'history', 'rules', 'gearInfo'];
  dataSource = new MatTableDataSource<any>();
  private subscriptions = new Subscription();
  sportName: string | null = null;

  constructor(private router: Router, private proxyService: PlaybuddyproxyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sportName = params['sportName'];
      console.log('Sport Name:', this.sportName);
  
      this.subscriptions.add(
        this.proxyService.getSpecificSportsInfo(this.sportName).subscribe({
          next: (data) => {
            this.dataSource.data = [data];
            console.log("Retrieved data from server:", data);
          },
          error: (error) => console.error('Error fetching sports data:', error)
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  clickEvent(): void {
    this.router.navigate(['']);
  }

  navigateToPopup(fromRoute: string, sportName: string | null) {
    this.router.navigate(['/popup', { fromRoute, sportName }]);
  }
}
