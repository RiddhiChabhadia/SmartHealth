import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import User from './models/user.model';
import {AuthenticationService, TokenPayload} from './services/authentication.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
 export class AppComponent {

//   constructor() {}

 

// //   constructor(
// // //private userService: UserService,
// //   //  private auth: AuthenticationService
// // ) { }


//   // public newUser: User = new User()
//   // public newUser1: User = new User()

//   // //An Empty list for the visible todo list
//   // userList: User[];



//   // editUsers: User[] = [];



//   ngOnInit(): void {

//     //At component initialization the 
//     // this.userService.getUsers()
//     //   .subscribe(users => {
//     //     //assign the todolist property to the proper http response
//     //     this.userList = users
//     //     console.log(users)
//     //   })
//   }


//   // create() {
//   //   this.userService.createUser(this.newUser)
//   //     .subscribe((res) => {
//   //       this.userList.push(res.data)
//   //       this.newUser = new User()
//   //     })
//   // }

//   // editUser(user: User) {
//   //   console.log(user)
//   //   if (this.userList.includes(user)) {
//   //     if (!this.editUsers.includes(user)) {
//   //       this.editUsers.push(user)
//   //     } else {
//   //       this.editUsers.splice(this.editUsers.indexOf(user), 1)
//   //       this.userService.editUser(user).subscribe(res => {
//   //         console.log('Update Succesful')
//   //       }, err => {
//   //         this.editUser(user)
//   //         console.error('Update Unsuccessful')
//   //       })
//   //     }
//   //   }
//   // }

//   // doneTodo(user: User) {

//   //   this.userService.editUser(user).subscribe(res => {
//   //     console.log('Update Succesful')
//   //   }, err => {
//   //     this.editUser(user)
//   //     console.error('Update Unsuccessful')
//   //   })
//   // }

//   // submitTodo(event, user: User) {
//   //   if (event.keyCode == 13) {
//   //     this.editUser(user)
//   //   }
//   // }

//   // deleteTodo(user: User) {
//   //   this.userService.deleteUser(user._id).subscribe(res => {
//   //     this.userList.splice(this.userList.indexOf(user), 1);
//   //   })
//   // }




  
   title = 'SmartHealth';


}
