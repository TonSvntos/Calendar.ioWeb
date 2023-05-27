import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SearchCustomersComponent } from './search-customers/search-customers.component';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './services/cliente.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent
    , ScheduleComponent
    , LoginComponent
    , SearchCustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule

  ],
  providers: [
    LoginService,
    ClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
