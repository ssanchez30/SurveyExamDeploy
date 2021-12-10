import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: any[] = [];
  constructor(private _http: HttpClient) {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this._http.get("/api/users/")
      .subscribe((data: any) => {
        this.users = data;
        console.log(this.users);
      });
  }

  cargarUsuarios(){
    return this._http.get("/api/users/")
  }


  createUser(newUser: any): void {
    this._http.post('/api/users/', newUser)
      .subscribe((data: any) => {
        console.log(data);
        this.fetchUsers();
      })
  }

  createAndReturnUser(newUser: any) {
    console.log("Service:", newUser)
    return this._http.post("/api/users", newUser);
  }

  createSurvey(newSurvey:any):void{
    console.log("new survey en el service", newSurvey)
    this._http.post('/api/users/addSurvey', newSurvey)
      .subscribe((data:any)=>{
        console.log(data);
        this.fetchUsers();
      })
  }

  //createSurvey(newSurvey:any){
   // return this._http.post('/api/users/addSurvey', newSurvey);
 // }

 

  loginUser(currentUser: any) {
    console.log(currentUser)
    return this._http.post("/api/users/login", currentUser);
  }

  validateUser(): any {
    return this._http.get("/api/users/validate");
  }

  logoutUser():any{
    return this._http.get('/api/users/logout');
  }

  findSurveybyid(_id:any):any{
    console.log("idruta",_id)
    //console.log("ruta",`/api/users/?_id=${_id}`)

    //return this._http.get(`/users/?_id=${_id}`); asi esta malo
    return this._http.get(`/api/users/find/${_id}`);
  }

  deleteSurveybyid(_id:any):any{
    console.log("id delete", _id)
    

    return this._http.delete(`/api/users/deleteSurvey/${_id}`);

  }

  addVotetoOption( _id:any, optionVoted:any){
 
    console.log("_idinService", _id, "option in service", optionVoted)
    let envio={
      opcion:optionVoted
    }

    return this._http.put(`/api/users/updatedVote/${_id}`,envio)
    
  }
}

