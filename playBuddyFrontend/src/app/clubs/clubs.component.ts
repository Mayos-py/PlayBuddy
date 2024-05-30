
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { PlaybuddyproxyService } from '../playbuddyproxy.service'; 
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})

export class ClubsComponent {

  displayedColumns: string[] = ['clubName', 'zipCode', 'address'];
  dataSource = new MatTableDataSource<any>();
  zipCode: number | null = null;
  sportName: string | null = null;

  constructor(
    private router: Router, private proxy$: PlaybuddyproxyService, private route: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { [key: string]: any };
      this.zipCode = state['zipCode'] ? Number(state['zipCode']) : null;
      this.sportName = state['sportName'];
      this.proxy$.getFilteredClubs(this.zipCode, this.sportName).subscribe((result: any[]) => {
        this.dataSource = new MatTableDataSource<any>(result);
        console.log('Retrieved data from server.');
      });
    }
  }

  ngOnInit() {
  }

  clickEvent(): void {
    this.router.navigate(['']);
  }

  navigateToPopup(fromRoute: string, zipcode: number | null, sportName: string | null) {
    this.router.navigate(['/popup'], {
      state: { fromRoute, zipcode, sportName }
    });
  }
}