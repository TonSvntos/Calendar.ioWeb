import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterPageComponent } from './enter-page/enter-page.component';
import { RegisterComponent } from './register/register.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '',            component: LoginComponent },
  { path: 'enter-page', component: EnterPageComponent},
  { path: 'schedule',      component: ScheduleComponent},
  { path: 'register',      component: RegisterComponent},
  { path: 'login-page',      component: RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
