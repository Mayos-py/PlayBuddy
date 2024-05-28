import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PopupComponent = class PopupComponent {
    constructor(router, route) {
        this.router = router;
        this.route = route;
        this.zipCode = '';
        this.sportName = '';
        this.fromRoute = '';
    }
    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.fromRoute = params.get('fromRoute') || '';
            this.zipCode = params.get('zipcode') || '';
            this.sportName = params.get('sportName') || '';
        });
    }
    onSubmit() {
        if (this.fromRoute === 'clubs') {
            const navigationExtras = {
                queryParams: {
                    zipCode: this.zipCode,
                    sportName: this.sportName
                }
            };
            this.router.navigate(['/clubs'], navigationExtras);
        }
        else if (this.fromRoute === 'playerRequest') {
            const navigationExtras = {
                queryParams: {
                    zipCode: this.zipCode,
                    sportName: this.sportName
                }
            };
            this.router.navigate(['/player-request'], navigationExtras);
        }
        else if (this.fromRoute === 'hub') {
            const navigationExtras = {
                queryParams: {
                    sportName: this.sportName
                }
            };
            this.router.navigate(['/hub'], navigationExtras);
        }
        else if (this.fromRoute === 'add-request') {
            const navigationExtras = {
                queryParams: {
                    zipCode: this.zipCode,
                    sportName: this.sportName
                }
            };
            this.router.navigate(['/add-request'], navigationExtras);
        }
    }
    goBack() {
        this.router.navigate(['']);
    }
};
PopupComponent = __decorate([
    Component({
        selector: 'app-popup',
        templateUrl: './popup.component.html',
        styleUrls: ['./popup.component.css']
    })
], PopupComponent);
export { PopupComponent };
//# sourceMappingURL=popup.component.js.map