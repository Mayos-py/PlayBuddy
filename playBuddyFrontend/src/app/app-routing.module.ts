import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcompageComponent } from './welcompage/welcompage.component';
import { ClubsComponent } from './clubs/clubs.component';
import { PopupComponent } from './popup/popup.component';
import { InformationHubComponent } from './information-hub/information-hub.component';
import { PlayerRequestComponent } from './player-request/player-request.component';

const routes: Routes = [
  { path: '', component:  WelcompageComponent},
  { path: 'clubs', component: ClubsComponent},
  { path: 'popup', component: PopupComponent },
  { path: 'hub', component: InformationHubComponent},
  { path: 'player-request', component: PlayerRequestComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
