import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AddRequestComponent = class AddRequestComponent {
    constructor(router, $proxy, route) {
        this.router = router;
        this.$proxy = $proxy;
        this.route = route;
        this.zipCode = null;
        this.sportName = null;
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        this.minDate = yyyy + '-' + mm + '-' + dd;
        this.route.queryParams.subscribe(params => {
            this.zipCode = params['zipCode'] ? Number(params['zipCode']) : null;
            this.sportName = params['sportName'];
            console.log('Zip Code:', this.zipCode);
            console.log('Sport Name:', this.sportName);
        });
    }
    ngOnInit() {
    }
    submitForm(formData) {
        let formDataJson = typeof formData === 'string' ? JSON.parse(formData) : { ...formData };
        formDataJson.joined = 0;
        formDataJson.zipCode = this.zipCode;
        formDataJson.sportName = this.sportName;
        console.log(formDataJson);
        this.$proxy.addPlayerRequest(formDataJson).subscribe((response) => {
            console.log('Post Request Successful', response);
            const navigationExtras = {
                queryParams: {
                    zipCode: this.zipCode,
                    sportName: this.sportName
                }
            };
            this.router.navigate(['/player-request'], navigationExtras);
        });
    }
    navigateToPopup(fromRoute) {
        this.router.navigate(['/popup', { fromRoute }]);
    }
    cancelForm() {
        console.log("Form canceled!");
        this.router.navigate(['']);
    }
};
AddRequestComponent = __decorate([
    Component({
        selector: 'app-add-request',
        templateUrl: './add-request.component.html',
        styleUrl: './add-request.component.css'
    })
], AddRequestComponent);
export { AddRequestComponent };
//# sourceMappingURL=add-request.component.js.map