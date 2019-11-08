import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ScrumboardComponent } from './scrumboard/scrumboard.component';
import { AuthGuard } from './auth.guard';
import { CreateprojectComponent } from './createproject/createproject.component';
import { ChangeroleComponent } from './changerole/changerole.component';
import { ChangeroleGuard } from './changerole.guard';
import { CreategoalComponent } from './creategoal/creategoal.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {path: 'createproject', component: CreateprojectComponent},
  { path: 'scrumboard/:project_id', component: ScrumboardComponent, canActivate:[AuthGuard] },
  { path: 'changerole/:project_id', component: ChangeroleComponent, canActivate:[AuthGuard, ChangeroleGuard]},
  { path: 'creategoal/:id', component: CreategoalComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [  ]
