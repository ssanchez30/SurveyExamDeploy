import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  allUsers: any[] = [];

  constructor(private _userService: UserService,
    private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    let observable = this._userService.validateUser();
    observable.subscribe((data: any) => {
      console.log("data observable dash", data)
    },
      (error: any) => {
        console.log(error.statusText)
        this._router.navigate(['/login']);
      })

    this.getUsers();
  }

  getUsers(): void {
    this.allUsers = this._userService.users;
    
  }

}
