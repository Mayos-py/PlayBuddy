import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
let ClubsComponent = class ClubsComponent {
    constructor(router, proxy$, route) {
        this.router = router;
        this.proxy$ = proxy$;
        this.route = route;
        this.displayedColumns = ['clubName', 'zipCode', 'address'];
        this.dataSource = new MatTableDataSource();
        this.zipCode = null;
        this.sportName = null;
        this.route.queryParams.subscribe(params => {
            this.zipCode = params['zipCode'] ? Number(params['zipCode']) : null;
            this.sportName = params['sportName'];
            console.log('Zip Code:', this.zipCode);
            console.log('Sport Name:', this.sportName);
            this.proxy$.getFilteredClubs(this.zipCode, this.sportName).subscribe((result) => {
                this.dataSource = new MatTableDataSource(result);
                console.log('retrieved data from server.');
            });
        });
    }
    ngOnInit() {
    }
    clickEvent() {
        this.router.navigate(['']);
    }
    navigateToPopup(fromRoute, zipcode, sportName) {
        this.router.navigate(['/popup', { fromRoute, zipcode, sportName }]);
    }
};
ClubsComponent = __decorate([
    Component({
        selector: 'app-clubs',
        templateUrl: './clubs.component.html',
        styleUrls: ['./clubs.component.css']
    })
], ClubsComponent);
export { ClubsComponent };
//# sourceMappingURL=clubs.component.js.map