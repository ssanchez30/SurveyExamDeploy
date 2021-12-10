import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-user-param',
  templateUrl: './user-param.component.html',
  styleUrls: ['./user-param.component.css']
})
export class UserParamComponent implements OnInit {

  actualSurvey:any;
  surveyID:Number=0; // deberia ser string

  constructor(private _route:ActivatedRoute, 
    private _router:Router, private _userService:UserService) { 
     
    }

  ngOnInit(): void {

    this._route.params.subscribe((params:any)=>{
      this.surveyID=params._id;
      console.log("surveyID", this.surveyID)

      this.getSurveytoVote(this.surveyID)
     
    })

  }

  getSurveytoVote(_id:any):void{
    console.log("id init",_id)

    let observable =this.actualSurvey=this._userService.findSurveybyid(_id)
    observable.subscribe((data:any)=>{ // faltabe el observable y el suscribe
      console.log(data)
      this.actualSurvey=data
      console.log("actualSurvey",this.actualSurvey)
    })
  
   
  }

  prevenir(event:any){
    event.preventDefault()
    event.stopPropagation()
  }

  addVote(event:any, surveyId:any, optionVoted:any){
    console.log("surveyId:", surveyId, "optionVoted: ",optionVoted)

  
    let observable =this._userService.addVotetoOption(surveyId, optionVoted)
    observable.subscribe((data:any)=>{
      console.log(data)
    })
    event.preventDefault();  
    this.getSurveytoVote(surveyId);
 

  }

  //getSurveytoDelete(_id:any):void{
  //  return this._userService.deleteSurveybyid(_id)
  //}

}
