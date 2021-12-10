import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { NewSurveyFormComponent } from './new-survey-form/new-survey-form.component';
import { UserParamComponent } from './user-param/user-param.component';
import { UserService } from './user/user.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SurveytableComponent } from './surveytable/surveytable.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    DashboardComponent,
    NewUserFormComponent,
    NewSurveyFormComponent,
    UserParamComponent,
    NavbarComponent,
    SurveytableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
