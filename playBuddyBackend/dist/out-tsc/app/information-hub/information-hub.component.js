import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
let InformationHubComponent = class InformationHubComponent {
    constructor(router, proxyService, route) {
        this.router = router;
        this.proxyService = proxyService;
        this.route = route;
        this.displayedColumns = ['sportName', 'history', 'rules', 'gearInfo'];
        this.dataSource = new MatTableDataSource();
        this.subscriptions = new Subscription();
        this.sportName = null;
    }
    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.sportName = params['sportName'];
            console.log('Sport Name:', this.sportName);
            this.subscriptions.add(this.proxyService.getSpecificSportsInfo(this.sportName).subscribe({
                next: (data) => {
                    this.dataSource.data = [data];
                    console.log("Retrieved data from server:", data);
                },
                error: (error) => console.error('Error fetching sports data:', error)
            }));
        });
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    clickEvent() {
        this.router.navigate(['']);
    }
    navigateToPopup(fromRoute, sportName) {
        this.router.navigate(['/popup', { fromRoute, sportName }]);
    }
};
InformationHubComponent = __decorate([
    Component({
        selector: 'app-information-hub',
        templateUrl: './information-hub.component.html',
        styleUrls: ['./information-hub.component.css']
    })
], InformationHubComponent);
export { InformationHubComponent };
//# sourceMappingURL=information-hub.component.js.map