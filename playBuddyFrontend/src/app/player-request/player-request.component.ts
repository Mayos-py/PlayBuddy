import { Component, OnInit } from '@angular/core';
import { PlaybuddyproxyService } from '../playbuddyproxy.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-request',
  templateUrl: './player-request.component.html',
  styleUrls: ['./player-request.component.css']
})

export class PlayerRequestComponent implements OnInit {
  
  displayedColumns: string[] = [ 'userName', 'playerNeeded', 'joined', 'preferredCourt', 'sportName', 'zipCode', 'date', 'time'];
  dataSource = new MatTableDataSource<any>();
  zipCode: number | null = null;
  sportName: string | null = null;

  

  ngOnInit(): void {
  }

  constructor(
    private router: Router, private proxy$: PlaybuddyproxyService, private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.zipCode = params['zipCode'] ? Number(params['zipCode']) : null;
      this.sportName = params['sportName'];
      console.log('Zip Code:', this.zipCode);
      console.log('Sport Name:', this.sportName);

      // Call the getListsIndex method with zipCode and sportName
      this.proxy$.getFilteredPlayerRequests(this.zipCode, this.sportName).subscribe((result: any[]) => {
        this.dataSource = new MatTableDataSource<any>(result);
        console.log('retrieved data from server.');
      });
    });
  }

  clickEvent(): void {
    this.router.navigate(['']);
  }

  navigateToPopup(fromRoute: string) {
    this.router.navigate(['/popup', { fromRoute }]);
  }
}
