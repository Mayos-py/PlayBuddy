import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcompage',
  templateUrl: './welcompage.component.html',
  styleUrl: './welcompage.component.css'
})
export class WelcompageComponent {
  constructor(private router: Router) { }

  navigateToPopup(fromRoute: string) {
    this.router.navigate(['/popup', { fromRoute }]);
  }
}
