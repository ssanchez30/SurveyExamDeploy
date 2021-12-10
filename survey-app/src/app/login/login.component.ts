import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginPassword: string="";
  loginUsername: string="";
  errorMessage: string="";

  constructor(private _userService:UserService, 
    private _router:Router, private _route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  loginHandler(event:any):void{
    event.preventDefault();
    let currentUser ={
      loginPassword: this.loginPassword,
      loginUsername: this.loginUsername
    }
    let observable = this._userService.loginUser(currentUser)
    observable.subscribe((data:any)=>{
      this._router.navigate(['/dashboard'])
    },
    (error:any)=>{
      console.log(error);
      this.errorMessage = error.statusText;
    });
  }

}
