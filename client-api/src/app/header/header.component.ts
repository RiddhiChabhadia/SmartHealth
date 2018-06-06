import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { UserService } from './../services/user.service';
import User from './../models/user.model';
import {AuthenticationService, TokenPayload} from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
//import { userInfo } from 'os';
import { tokenName } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  
})
export class HeaderComponent implements OnInit{
  emailId :String;
  state = 'Default';
  constructor(

    private userService: UserService,
    private auth: AuthenticationService,private router: Router,
    private modalService: BsModalService
  ) {this.userList=[]; }


  isIn : boolean = false;   // store state
  modalRef: BsModalRef;
  modalRef2: BsModalRef

  myForm1: FormGroup;

  myForm2: FormGroup;

  isSignUp : boolean = false;

  //modal for opening signup and login popup

  openModal(template: TemplateRef<any>) {
console.log("inside open mod");


      let bool = this.isIn;
      this.isIn = bool === false ? true : false;
      this.modalRef = this.modalService.show(template);
    
      this.closeFirstModal();

  }

 
  

  openModal2(template: TemplateRef<any>) {
      let bool = this.isIn;
      this.isIn = bool === false ? true : false;
      this.modalRef2 = this.modalService.show(template);
  }



  public newUser: User = new User()
  public newUser1: User = new User()

  //An Empty list for the visible todo list
  userList: User[];



  editUsers: User[] = [];



  ngOnInit(): void {

    this.myForm2 = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      height: new FormControl(null, Validators.required),
      weight: new FormControl(null, Validators.required)
  });

  this.myForm1 = new FormGroup({
      email: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required)
  });


  }
//sign up user

  create() {

    const user = new User();
    user.firstName= this.myForm2.value.firstName;
    user.lastName= this.myForm2.value.lastName,
    user.email= this.myForm2.value.email,
    user.password= this.myForm2.value.password,
    user.age=this.myForm2.value.age,
    user.gender=this.myForm2.value.gender,
    user.height=this.myForm2.value.height,
    user.weight=this.myForm2.value.weight,



    this.userService.createUser(user)
      .subscribe((res) => {
        
       
        this.userList.push(res.data)
        //this.newUser = new User()
        this.myForm2.reset();
       
      })

    this.userService.sendMail(user)
    .subscribe((res)=>{
      this.userList.push(res.data)
    })

      console.log(this.newUser);
      this.myForm2.reset();
  }

  // editUser(user: User) {
  //   console.log(user)
  //   if (this.userList.includes(user)) {
  //     if (!this.editUsers.includes(user)) {
  //       this.editUsers.push(user)
  //     } else {
  //       this.editUsers.splice(this.editUsers.indexOf(user), 1)
  //       this.userService.editUser(user).subscribe(res => {
  //         console.log('Update Succesful')
  //       }, err => {
  //         this.editUser(user)
  //         console.error('Update Unsuccessful')
  //       })
  //     }
  //   }
  // }

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



  credentials: TokenPayload = {
    email: '',
    password: ''
  };




//   login() {

//     console.log("inside login");
//     const user = new User();
//     this.emailId=this.myForm1.value.email;
//     this.credentials.email=this.myForm1.value.email;
//     this.credentials.password= this.myForm1.value.password;
//     console.log("email"+ this.myForm1.value.email);
//     console.log("pass"+ this.myForm1.value.password);
//     this.auth.login(this.credentials).subscribe(() => {
//       this.router.navigateByUrl('/exercise');
//     }, (err) => {
//       console.error(err);
//     }); 
//  }


//authenticate user
 onSubmitLogin() {
  console.log("inside login");
  const user = new User();
    this.credentials.email=this.myForm1.value.email;
    this.credentials.password= this.myForm1.value.password;
    console.log("email"+ this.myForm1.value.email);
    console.log("pass"+ this.myForm1.value.password);
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/dashboard');
      this.state='Default';
      this.modalRef.hide();
    }, (err) => {
      console.error(err);
     // window.alert("Invalid Credentials");
      this.state='Error';
    }); 
  this.myForm1.reset();
}

onProfile(){
  console.log("user................"+tokenName);
}

 onLogout() {
  this.auth.logout();
  this.router.navigate(['homepage']);
}


//check if user is logged in
isLoggedIn() {
  return this.auth.isLoggedIn();
}


 closeFirstModal() {
   console.log("inside close first modal");
   if(this.modalRef2)
   this.modalRef2.hide();
  // this.modalRef2 = null;
}

toggleState() { // click handler
   let bool = this.isIn;
   this.isIn = bool === false ? true : false;
}
windowClose(){
  this.state='Default';
  this.modalRef.hide();
}
windowClose2(){
  this.state='Default';
  this.modalRef2.hide();
}
successFunction(){
  this.state='Success'
}
}