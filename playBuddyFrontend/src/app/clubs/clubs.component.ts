
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { PlaybuddyproxyService } from '../playbuddyproxy.service'; 
import {MatTableDataSource} from '@angular/material/table';
import { Router} from '@angular/router';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrl: './clubs.component.css'
})

export class ClubsComponent {

  displayedColumns: string[] = ['clubName', 'zipCode', 'address'];
  dataSource = new MatTableDataSource<any>();

  constructor(private router: Router, proxy$: PlaybuddyproxyService) {
    proxy$.getListsIndex().subscribe( (result: any[]) => 
    {
      this.dataSource = new MatTableDataSource<any>(result);
      console.log("retrieved data from server.");
    });
  }

  ngOnInit() {
  }

  clickEvent(): void {
    this.router.navigate(['']);
  }
}