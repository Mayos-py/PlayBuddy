import { Component, OnInit } from '@angular/core';
import { PlaybuddyproxyService } from '../playbuddyproxy.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {

  zipCode: number | null = null;
  sportName: string | null = null;
  minDate: string;
  currentUser: any; // Variable to store current user info

  constructor(
    private router: Router,
    private $proxy: PlaybuddyproxyService,
    private route: ActivatedRoute
  ) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    this.minDate = yyyy + '-' + mm + '-' + dd;
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { [key: string]: any };
      this.zipCode = state['zipCode'] ? Number(state['zipCode']) : null;
      this.sportName = state['sportName'];
    }
  }

  ngOnInit(): void {
    this.fetchCurrentUser(); // Fetch current user info upon initialization
  }

  fetchCurrentUser() {
    // Call the service method to fetch current user info
    this.$proxy.getUserInfo().subscribe((user) => {
      this.currentUser = user;
    });
  }

  submitForm(formData: any) {
    let formDataJson = typeof formData === 'string' ? JSON.parse(formData) : { ...formData };
    formDataJson.joined = 0;
    formDataJson.zipCode = this.zipCode;
    formDataJson.sportName = this.sportName;
    formDataJson.userName = this.currentUser.username; // Use current user's username
    console.log(formDataJson);

    this.$proxy.addPlayerRequest(formDataJson).subscribe((response) => {
      console.log('Post Request Successful', response);
      const navigationExtras: NavigationExtras = {
        state: {
          zipCode: this.zipCode,
          sportName: this.sportName
        }
      };
      this.router.navigate(['/player-request'], navigationExtras);
    });
  }

  cancelForm() {
    console.log("Form canceled!");
    const navigationExtras: NavigationExtras = {
      state: {
        zipCode: this.zipCode,
        sportName: this.sportName
      }
    };
    this.router.navigate(['/player-request'], navigationExtras);
  }
  
}
