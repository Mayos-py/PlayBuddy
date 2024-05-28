import { __decorate } from "tslib";
import { Component } from '@angular/core';
let WelcompageComponent = class WelcompageComponent {
    constructor(router) {
        this.router = router;
    }
    navigateToPopup(fromRoute) {
        this.router.navigate(['/popup', { fromRoute }]);
    }
};
WelcompageComponent = __decorate([
    Component({
        selector: 'app-welcompage',
        templateUrl: './welcompage.component.html',
        styleUrl: './welcompage.component.css'
    })
], WelcompageComponent);
export { WelcompageComponent };
//# sourceMappingURL=welcompage.component.js.map