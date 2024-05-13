import { Component } from '@angular/core';
import { PlaybuddyproxyService } from '../playbuddyproxy.service';
import { Router , ActivatedRoute} from '@angular/router';
import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrl: './add-request.component.css'
})
export class AddRequestComponent {

  constructor( private router: Router, private $proxy: PlaybuddyproxyService) { }

  ngOnInit(): void {
  }

  submitForm(formData: any) {
    console.log(formData);
    this.$proxy.addPlayerRequest(formData).subscribe((response) => {
      console.log('Post Request Successful', response);
    });
  }

  cancelForm() {
    console.log("Form canceled!");
    this.router.navigate(['']);
  }
}
