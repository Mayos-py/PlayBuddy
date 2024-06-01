import { Component } from '@angular/core';
import { Router , ActivatedRoute, NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.css'
})
export class LoginPopupComponent {
  constructor(private router: Router){}
  goBack(){
    this.router.navigate(['']);
  }

  authGoogle(){
    window.location.href = 'https://play-buddies.azurewebsites.net/auth/google';
  }
}
