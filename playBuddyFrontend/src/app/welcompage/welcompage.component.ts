import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlaybuddyproxyService } from '../playbuddyproxy.service';

@Component({
  selector: 'app-welcompage',
  templateUrl: './welcompage.component.html',
  styleUrl: './welcompage.component.css'
})
export class WelcompageComponent {
  constructor(private router: Router, private proxyService: PlaybuddyproxyService) { }

  navigateToPopup(fromRoute: string) {
    this.router.navigate(['/popup'], {
      state: { fromRoute }
    });
  }

  navigateToLoginPopup() {
    this.proxyService.getUserInfo().subscribe({
      next: (data) => {
        console.log('User info:', data);
        if (data.username) {
          this.router.navigate(['/popup']);
        } else if (data.error === "No user information available") {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('Error fetching user info:', error);
        this.router.navigate(['/login']);
      }
    });
  }
}
