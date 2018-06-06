import { Component, OnInit } from '@angular/core';

import Exercise from '../models/exercise.model';
import {ExerciseService} from '../services/exercise.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  

  constructor(private execService: ExerciseService,
  private router:Router) { 
    this.execList=[]; 
   }

  ngOnInit() {

    this.getExList();
    
  }
newExercise =new Exercise();
execList: Exercise[];
newexcList:Exercise[];
exercise:Exercise;
//create exercise
  create() {
console.log(this.newExercise);


    this.execService.createExercise(this.newExercise)
      .subscribe((res) => {
        this.execList.push(res.data)
        this.newExercise = new Exercise()
        this.router.navigateByUrl("/dashboard");
      })
  }
//get exercise list
  getExList(){
      this.execService.getExercise()
      .subscribe(Exercise => {
        //assign the todolist property to the proper http response
        //this.userList = users
        this.newexcList=Exercise;
        console.log(Exercise)
      })


  }
//edit a exercise
  editRecords(oldExerc){

    console.log(oldExerc._id);
    var newexercise=new Exercise();
    newexercise.exerciseName="hello world";
    newexercise.reps="56";
    newexercise._id=oldExerc._id;
    console.log(newexercise.exerciseName+"in dashboard");
    this.execService.updateExercise(newexercise)
        .subscribe(
            result => console.log(result)
        );
    //this.exercise._id=newExerc._id;
   // this.exercise.exerciseName = "hello world";
    // this.exercise.reps ="56";
  
    // this.execService.updateExercise(this.exercise)
    //     .subscribe(
    //         result => console.log(result)
    //     );
    // this.exercise = null;


    
  }
//delete a exercise
  deleteRecords(oldRec){

console.log(oldRec._id+"inside delete")
    this.execService.deleteExercise(oldRec)
    .subscribe(
        result => console.log(result)
    );




  }
  cancel(){
    this.router.navigateByUrl("/dashboard");
  }

}
