import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-surveytable',
  templateUrl: './surveytable.component.html',
  styleUrls: ['./surveytable.component.css']
})
export class SurveytableComponent implements OnInit {

  allUsers: any[] = [];
  surveyId: any;
  firstName: any;
  storage: any;

  constructor(private _http: HttpClient, private _userService: UserService) { }

  ngOnInit(): void {

    // this.getUsers();
    this.cargarActualizaUsers();

    let observable = this._userService.validateUser()
    observable.subscribe((data: any) => {
      this.storage = data;
      console.log("data observable table", data)
    })

    //this.surveyId=""
    //this.storage=sessionStorage;
    //console.log("storage",this.storage)


  }

  getUsers(): void {
    this.allUsers = this._userService.users;
  }

  cargarActualizaUsers() {
    let observable = this._userService.cargarUsuarios()
    observable.subscribe((data: any) => {
      this.allUsers = data;
    })
  }

  deleteActualSurvey(_id: any): void {
    let observable = this._userService.deleteSurveybyid(_id)
    observable.subscribe((data: any) => {
      console.log("devolviendose.. ", data)
      this.cargarActualizaUsers();
    })
  }

}


