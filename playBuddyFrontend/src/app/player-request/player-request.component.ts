import { Component, OnInit } from '@angular/core';
import { PlaybuddyproxyService } from '../playbuddyproxy.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-request',
  templateUrl: './player-request.component.html',
  styleUrls: ['./player-request.component.css']
})
export class PlayerRequestComponent implements OnInit {

  otherDisplayedColumns: string[] = ['userName', 'playerNeeded', 'joined', 'preferredCourt', 'date', 'time', 'action'];
  myDisplayedColumns: string[] = ['playerNeeded', 'joined', 'preferredCourt', 'date', 'time', 'action'];
  otherRequestsDataSource = new MatTableDataSource<any>();
  ownRequestsDataSource = new MatTableDataSource<any>();
  zipCode: number | null = null;
  sportName: string | null = null;
  userName: string | null = 'currentUser';  // Replace with actual logic to get the current user's username
  subscriptions = new Subscription();

  constructor(
    private router: Router,
    private proxy$: PlaybuddyproxyService,
    private route: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { [key: string]: any };
      this.zipCode = state['zipCode'] ? Number(state['zipCode']) : null;
      this.sportName = state['sportName'];
      
      this.subscriptions.add(
        this.proxy$.getFilteredPlayerRequests(this.zipCode, this.sportName).subscribe((result: any[]) => {
          const otherRequests = result.filter(request => request.userName !== this.userName);
          const ownRequests = result.filter(request => request.userName === this.userName);
          this.otherRequestsDataSource = new MatTableDataSource<any>(otherRequests);
          this.ownRequestsDataSource = new MatTableDataSource<any>(ownRequests);
          console.log('Retrieved data from server.');
        })
      );
    }
  }

  ngOnInit(): void {
  }

  clickEvent(): void {
    this.router.navigate(['']);
  }

  navigateToPopup(fromRoute: string, zipcode: number | null, sportName: string | null) {
    this.router.navigate(['/popup'], {
      state: { fromRoute, zipcode, sportName }
    });
  }

  navigateToRequestForm() {
    const navigationExtras: NavigationExtras = {
      state: {
        zipCode: this.zipCode,
        sportName: this.sportName
      }
    };
    this.router.navigate(['/add-request'], navigationExtras);
  }

  joinRequest(request: any) {
    // join functionality here
    // After joining, update the button to "Chat"
    request.joined = true;
  }

  startChat(request: any) {
    // navigate to chat page with request details
    console.log('Starting chat with:', request.userName);
  }
}
