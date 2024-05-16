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
  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.fromRoute = params.get('fromRoute') || '';
      this.zipCode = params.get('zipcode') || '';
      this.sportName = params.get('sportName') || '';
    });
  }

  onSubmit() {
    if (this.fromRoute === 'clubs') {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          zipCode: this.zipCode,
          sportName: this.sportName
        }
      };
      this.router.navigate(['/clubs'], navigationExtras);
    } else if (this.fromRoute === 'playerRequest') {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          zipCode: this.zipCode,
          sportName: this.sportName
        }
      };
      this.router.navigate(['/player-request'], navigationExtras);
    } else if (this.fromRoute === 'hub') {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          sportName: this.sportName
        }
      };
      this.router.navigate(['/hub'], navigationExtras);
    } 
    else if (this.fromRoute === 'add-request') {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          zipCode: this.zipCode,
          sportName: this.sportName
        }
      };
      this.router.navigate(['/add-request'], navigationExtras);
    } 
  }

  goBack(){
    this.router.navigate(['']);
  }
}