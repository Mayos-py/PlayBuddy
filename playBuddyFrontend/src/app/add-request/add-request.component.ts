import { Component } from '@angular/core';
import { PlaybuddyproxyService } from '../playbuddyproxy.service';
import { Router , ActivatedRoute, NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrl: './add-request.component.css'
})
export class AddRequestComponent {

  zipCode: number | null = null;
  sportName: string | null = null;

  constructor( private router: Router, private $proxy: PlaybuddyproxyService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.zipCode = params['zipCode'] ? Number(params['zipCode']) : null;
      this.sportName = params['sportName'];
      console.log('Zip Code:', this.zipCode);
      console.log('Sport Name:', this.sportName);
  }); }

  ngOnInit(): void {
  }

  submitForm(formData: any) {
    console.log(formData);
    
    //Need to add correct logic to append zipCode and sportName here 
    /*formData.append('zipCode', JSON.stringify(this.zipCode));
    formData.append('sportName', JSON.stringify(this.sportName));
    formData.append('playerNeeded', 0))*/
    
    this.$proxy.addPlayerRequest(formData).subscribe((response) => {
      console.log('Post Request Successful', response);
      const navigationExtras: NavigationExtras = {
        queryParams: {
          zipCode: this.zipCode,
          sportName: this.sportName
        }
      };
      this.router.navigate(['/player-request'], navigationExtras);
    });
  }

  navigateToPopup(fromRoute: string) {
    this.router.navigate(['/popup', { fromRoute }]);
  }

  cancelForm() {
    console.log("Form canceled!");
    this.router.navigate(['']);
  }
  
}
