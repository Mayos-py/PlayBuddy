import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlaybuddyproxyService } from '../playbuddyproxy.service';

@Component({
  selector: 'app-information-hub',
  templateUrl: './information-hub.component.html',
  styleUrls: ['./information-hub.component.css']
})
export class InformationHubComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['sportName', 'history', 'rules', 'gearInfo'];
  dataSource = new MatTableDataSource<any>();
  private subscriptions = new Subscription();

  constructor(private router: Router, private proxyService: PlaybuddyproxyService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.proxyService.getAllSportsInfo().subscribe({
        next: (data) => {
          this.dataSource.data = [data]; // Wrapping the data in an array if it's a single object
          console.log("Retrieved data from server:", data);
        },
        error: (error) => console.error('Error fetching sports data:', error)
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Clean up the subscription
  }

  clickEvent(): void {
    this.router.navigate(['']);
  }
}
