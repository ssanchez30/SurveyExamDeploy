import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-new-survey-form',
  templateUrl: './new-survey-form.component.html',
  styleUrls: ['./new-survey-form.component.css']
})
export class NewSurveyFormComponent implements OnInit {

  newSurvey:any;

  constructor(private _userService: UserService, 
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


    this.newSurvey={
      question:"",
      option1:"",
      option2:"",
      option3:"",
      option4:""
    }
  }
    createNewSurvey(event:any):void{
      event.preventDefault();
  
      console.log('este es new survey: ', this.newSurvey)
      
      this._userService.createSurvey(this.newSurvey);
      this._router.navigate(['/dashboard']);
    }

  
  

}
