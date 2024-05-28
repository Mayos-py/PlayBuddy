import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
let PlayerRequestComponent = class PlayerRequestComponent {
    ngOnInit() {
    }
    constructor(router, proxy$, route) {
        this.router = router;
        this.proxy$ = proxy$;
        this.route = route;
        this.displayedColumns = ['userName', 'playerNeeded', 'joined', 'preferredCourt', 'sportName', 'zipCode', 'date', 'time', 'action'];
        this.dataSource = new MatTableDataSource();
        this.zipCode = null;
        this.sportName = null;
        this.route.queryParams.subscribe(params => {
            this.zipCode = params['zipCode'] ? Number(params['zipCode']) : null;
            this.sportName = params['sportName'];
            console.log('Zip Code:', this.zipCode);
            console.log('Sport Name:', this.sportName);
            this.proxy$.getFilteredPlayerRequests(this.zipCode, this.sportName).subscribe((result) => {
                this.dataSource = new MatTableDataSource(result);
                console.log('retrieved data from server.');
            });
        });
    }
    clickEvent() {
        this.router.navigate(['']);
    }
    navigateToPopup(fromRoute, zipcode, sportName) {
        this.router.navigate(['/popup', { fromRoute, zipcode, sportName }]);
    }
    navigateToRequestForm(fromRoute) {
        const navigationExtras = {
            queryParams: {
                zipCode: this.zipCode,
                sportName: this.sportName
            }
        };
        this.router.navigate(['/add-request'], navigationExtras);
    }
    joinRequest(request) {
        // join functionality here
    }
};
PlayerRequestComponent = __decorate([
    Component({
        selector: 'app-player-request',
        templateUrl: './player-request.component.html',
        styleUrls: ['./player-request.component.css']
    })
], PlayerRequestComponent);
export { PlayerRequestComponent };
//# sourceMappingURL=player-request.component.js.map