import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NewUserFormComponent } from '../new-user-form/new-user-form.component';
import { NewSurveyFormComponent } from '../new-survey-form/new-survey-form.component';
import { UserParamComponent } from '../user-param/user-param.component';
import { SurveytableComponent } from '../surveytable/surveytable.component';

let routes:Routes =[
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'addUser',
    component: NewUserFormComponent
  },
  {
    path: 'addSurvey',
    component: NewSurveyFormComponent
  },
  {
    path: 'find/:_id',
    component: UserParamComponent
    
  },
  {
    path: 'deleteSurvey/:_id',
    component: SurveytableComponent
  },
  {
    path:'updatedVote/:_id',
    component: UserParamComponent

  },
  {
    path: '',
    pathMatch:'full',
    redirectTo:'/login'
  },
  {
    path:'**',
    redirectTo: '/login'
  }
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
