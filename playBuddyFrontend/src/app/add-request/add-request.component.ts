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
    let formDataJson = typeof formData === 'string' ? JSON.parse(formData) : { ...formData };
    formDataJson.joined = 0;
    formDataJson.zipCode = this.zipCode;
    formDataJson.sportName = this.sportName;
    console.log(formDataJson)
    
    this.$proxy.addPlayerRequest(formDataJson).subscribe((response) => {
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
