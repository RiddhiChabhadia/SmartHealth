import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import Exercise from '../models/user.model';
import {UserService} from '../services/user.service';
import User from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  firstname :string ;
  lastname :string;
  age :string;
  gender :string;
  height :string;
  weight :string;
  id : string;

  constructor(private userService: UserService, private router:Router) { }
  user =new User();
  ngOnInit() {
    
    this.userService.getUserByMail()
    .subscribe(users => {
      //assign the todolist property to the proper http response
      //this.userList = users
      this.user=users;
      this.firstname=users.firstName;
      this.lastname=users.lastName;
      this.age=users.age;
      this.gender=users.gender;
      this.height=users.height;
      this.weight=users.weight;  
      this.id=users._id;
    })
  }
//edit user data
  save(){
    var user=new User();

    user._id=this.id;
    user.firstName=this.firstname;
    user.lastName=this.lastname;
    user.age=this.age;
    user.gender=this.gender;
    user.weight=this.weight;
    user.height=this.height;
    this.userService.editUser(user)
        .subscribe(
            result => console.log(result)
        );
    this.router.navigateByUrl('/dashboard');
  }
  cancel(){
    this.router.navigateByUrl('/dashboard');
  }
}
