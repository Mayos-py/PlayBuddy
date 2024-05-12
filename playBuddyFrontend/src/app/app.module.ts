import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcompageComponent } from './welcompage/welcompage.component';
import { ClubsComponent } from './clubs/clubs.component';
import { HttpClientModule } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { PlaybuddyproxyService } from './playbuddyproxy.service';
import '@fortawesome/fontawesome-free/css/all.min.css';

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { PopupComponent } from './popup/popup.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    WelcompageComponent,
    ClubsComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PlaybuddyproxyService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
