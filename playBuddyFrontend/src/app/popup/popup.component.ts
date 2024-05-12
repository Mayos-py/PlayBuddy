import { Component } from '@angular/core';
import { Router , ActivatedRoute, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  zipCode!: string;
  sportName!: string;
  fromRoute: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.fromRoute = params.get('fromRoute') || '';
    });
  }

  onSubmit() {
    console.log('Zip Code:', this.zipCode);
    console.log('Sport Name:', this.sportName);

    if (this.fromRoute === 'clubs') {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          zipCode: this.zipCode,
          sportName: this.sportName
        }
      };
      this.router.navigate(['/clubs'], navigationExtras);
    } 
  }

  goBack(){
    this.router.navigate(['']);
  }
}