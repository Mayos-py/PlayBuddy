import { Component, OnInit } from '@angular/core';
import { PlaybuddyproxyService } from '../playbuddyproxy.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-request',
  templateUrl: './player-request.component.html',
  styleUrls: ['./player-request.component.css']
})

export class PlayerRequestComponent implements OnInit {
  
  displayedColumns: string[] = [ 'userName', 'playerNeeded', 'joined', 'preferredCourt', 'sportName', 'zipCode', 'date', 'time'];
  dataSource = new MatTableDataSource<any>();

  constructor(private router: Router, private proxy$: PlaybuddyproxyService) { }

  ngOnInit(): void {
    this.getPlayerRequests();
  }

  getPlayerRequests(): void {
    this.proxy$.getPlayerRequests().subscribe((result: any[]) => {
      this.dataSource = new MatTableDataSource<any>(result);
      console.log("Retrieved player requests from server.");
    });
  }

  clickEvent(): void {
    this.router.navigate(['']);
  }
}
