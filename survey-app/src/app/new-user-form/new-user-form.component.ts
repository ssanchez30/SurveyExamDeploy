import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css']
})
export class NewUserFormComponent implements OnInit {

  newUser: any;
  errorMessage: string="";
  
  constructor(private _userService:UserService,
    private _router:Router, private _route:ActivatedRoute) { }

  ngOnInit(): void {

    let observable = this._userService.validateUser();
    observable.subscribe((data: any) => {
      console.log("data observable", data)
    },
      (error: any) => {
        console.log(error.statusText)
        this._router.navigate(['/login']);
      })

    this.newUser={
      firstName:"",
      lastName:"",
      password:"",
      userName:"",
      confpass:""
    }
  }

  createNewUser(event:any):void{
    event.preventDefault();

    this._userService.createUser(this.newUser);
    this._router.navigate(['/dashboard']);
  }


}
