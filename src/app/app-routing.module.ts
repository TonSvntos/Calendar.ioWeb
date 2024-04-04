import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component';
import { LoginComponent } from './login/login.component';
import { SearchCustomersComponent } from './search-customers/search-customers.component';


const routes: Routes = [
  { path: '',            component: LoginComponent },
  { path: 'schedule',      component: ScheduleComponent},
  { path: 'login',      component: LoginComponent},
  { path: 'search',      component: SearchCustomersComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
