import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlaybuddyproxyService } from '../playbuddyproxy.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-request',
  templateUrl: './player-request.component.html',
  styleUrls: ['./player-request.component.css']
})
export class PlayerRequestComponent implements OnInit, OnDestroy {
  otherDisplayedColumns: string[] = ['userName', 'playerNeeded', 'joined', 'preferredCourt', 'date', 'time', 'action'];
  myDisplayedColumns: string[] = ['playerNeeded', 'preferredCourt', 'date', 'time', 'action'];
  otherRequestsDataSource = new MatTableDataSource<any>();
  ownRequestsDataSource = new MatTableDataSource<any>();
  zipCode: number | null = null;
  sportName: string | null = null;
  reqId: string | null = null;
  currentUser: any; 
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
      
      // Fetch current user info
      this.fetchCurrentUser();

      this.subscriptions.add(
        this.proxy$.getFilteredPlayerRequests(this.zipCode, this.sportName).subscribe((result: any[]) => {
          const otherRequests = result.filter(request => request.ssoID !== this.currentUser.id);
          const ownRequests = result.filter(request => request.ssoID === this.currentUser.id);
          this.otherRequestsDataSource = new MatTableDataSource<any>(otherRequests);
          this.ownRequestsDataSource = new MatTableDataSource<any>(ownRequests);
          console.log('Retrieved data from server.');
        })
      );
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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

  navigateToProfilePopup() {
    const navigationExtras: NavigationExtras = {
      state: {
       userName: this.currentUser.username,
       email: this.currentUser.email,
       zipCode: this.zipCode,
       sportName: this.sportName
      }
    };
    this.router.navigate(['/profile'], navigationExtras);
  }

  joinRequest(request: any) {
    // Increment the number of players joined
    request.joined++;
    var userJSON = JSON.stringify({
      ssoId: this.currentUser.id,
      userName: this.currentUser.username
    });
    this.proxy$.addUserInGroup(userJSON, request.reqId).subscribe(() => {
      console.log('User added to group');
    }, (error) => {
      console.error('Failed to add user to group:', error);
    });
  }

  startChat(request: any) {
    console.log('Starting chat with:', request.userName);
    console.log('Starting chat with:', request.reqId);

    // Navigate to the user-group component passing the request ID
    const navigationExtras: NavigationExtras = {
      state: {
        reqId: request.reqId,
        sportName: this.sportName,
        zipCode: this.zipCode
      }
    };
    this.router.navigate(['/user-group'],  navigationExtras);
  }


  fetchCurrentUser() {
    // Call the service method to fetch current user info
    this.proxy$.getUserInfo().subscribe((user) => {
      this.currentUser = user;
    });
  }
}
