import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcompageComponent } from './welcompage/welcompage.component';
import { ClubsComponent } from './clubs/clubs.component';

const routes: Routes = [
  { path: '', component:  WelcompageComponent},
  { path: 'clubs', component: ClubsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
