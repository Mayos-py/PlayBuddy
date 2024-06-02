import { Component } from '@angular/core';
import { Router , ActivatedRoute, NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrl: './profile-popup.component.css'
})
export class ProfilePopupComponent {
  constructor(private router: Router){}
  goBack(){
    this.router.navigate(['']);
  }
}
