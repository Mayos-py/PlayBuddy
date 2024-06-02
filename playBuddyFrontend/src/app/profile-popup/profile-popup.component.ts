import { Component } from '@angular/core';
import { Router , ActivatedRoute, NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrl: './profile-popup.component.css'
})
export class ProfilePopupComponent {

  userName: string | null = null;
  email: string | null = null;
  zipCode: number | null = null;
  sportName: string | null = null;
 
  constructor(private router: Router){
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { [key: string]: any };
      this.userName = state['userName']
      this.email = state['email'];
      this.zipCode = state['zipCode']
      this.sportName = state['sportName'];

    }
  }
  goBack(){
    const navigationExtras: NavigationExtras = {
      state: {
        zipCode: this.zipCode,
        sportName: this.sportName
      }
    };
    this.router.navigate(['/player-request'], navigationExtras);
  }
}
