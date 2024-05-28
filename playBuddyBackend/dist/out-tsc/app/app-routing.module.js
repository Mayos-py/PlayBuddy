import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcompageComponent } from './welcompage/welcompage.component';
import { ClubsComponent } from './clubs/clubs.component';
import { PopupComponent } from './popup/popup.component';
import { InformationHubComponent } from './information-hub/information-hub.component';
import { PlayerRequestComponent } from './player-request/player-request.component';
import { AddRequestComponent } from './add-request/add-request.component';
const routes = [
    { path: '', component: WelcompageComponent },
    { path: 'clubs', component: ClubsComponent },
    { path: 'popup', component: PopupComponent },
    { path: 'hub', component: InformationHubComponent },
    { path: 'player-request', component: PlayerRequestComponent },
    { path: 'add-request', component: AddRequestComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map