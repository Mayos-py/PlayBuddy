import { Component } from '@angular/core';
import { Router , ActivatedRoute, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  zipCode: string = '';
  sportName: string = '';
  fromRoute: string = '';
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { [key: string]: any };
      this.fromRoute = state['fromRoute'] || '';
      this.zipCode = state['zipcode'] !== undefined ? state['zipcode'] : null;
      this.sportName = state['sportName'] || '';
      console.log('From Route:', this.fromRoute);
      console.log('Zip Code:', this.zipCode);
      console.log('Sport Name:', this.sportName);
    }
  }
  ngOnInit() {
  }

  onSubmit() {
    if (this.fromRoute === 'clubs') {
      const navigationExtras: NavigationExtras = {
        state: {
          zipCode: this.zipCode,
          sportName: this.sportName
        }
      };
      this.router.navigate(['/clubs'], navigationExtras);
    } else if (this.fromRoute === 'playerRequest') {
      const navigationExtras: NavigationExtras = {
        state: {
          zipCode: this.zipCode,
          sportName: this.sportName
        }
      };
      this.router.navigate(['/player-request'], navigationExtras);
    } else if (this.fromRoute === 'hub') {
      const navigationExtras: NavigationExtras = {
        state: {
          sportName: this.sportName
        }
      };
      this.router.navigate(['/hub'], navigationExtras);
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
          zipCode: this.zipCode,
          sportName: this.sportName
        }
      };
      this.router.navigate(['/player-request'], navigationExtras);
    } 
  }

  goBack(){
    this.router.navigate(['']);
  }
}