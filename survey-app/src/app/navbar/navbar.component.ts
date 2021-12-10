import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _userService: UserService, 
    private _router:Router, private _route: ActivatedRoute ) { }

  ngOnInit(): void {
  }

  logout():void{
    let observable = this._userService.logoutUser();
    observable.subscribe((data:any)=>{
      console.log(data);
      this._router.navigate(['/login']);
    })
  }

}
