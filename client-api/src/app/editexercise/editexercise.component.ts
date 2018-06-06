import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import Exercise from '../models/exercise.model';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-editexercise',
  templateUrl: './editexercise.component.html',
  styleUrls: ['./editexercise.component.scss']
})
export class EditexerciseComponent implements OnInit {

  newExercise =new Exercise();
  params:any;
  constructor(private route: ActivatedRoute,private execService: ExerciseService, private routerr:Router) {
//auto populate data to be edited 
    this.newExercise.exerciseName="hi";
    this.newExercise.reps="4";
    this.newExercise.date=new Date();



    this.route.params.subscribe( params => {console.log(params.id+"parmmsss-------");
  this.params=params.id});
    this.execService.getOneExercise(this.params).
    subscribe(res=>{console.log(res)+"inside edit comp res";
    this.newExercise.exerciseName=res.exerciseName;
    this.newExercise.reps=res.reps;
    this.newExercise.date=res.date;}
  );
    
  }
  
  






  ngOnInit() {

   

}
//on exercise  update the exercise object
editExercise(){

   console.log(this.newExercise._id+"olldexrec in update methoddddd");
    var newexercise1 = new Exercise();
    newexercise1.exerciseName = this.newExercise.exerciseName;
    newexercise1.reps = this.newExercise.reps;
    newexercise1.reps = this.newExercise.reps;
    newexercise1._id = this.params
    newexercise1.date=this.newExercise.date;
    console.log(newexercise1.exerciseName + "in dashboard");
    this.execService.updateExercise(newexercise1)
      .subscribe(
        result =>{ console.log(result);
        this.routerr.navigateByUrl("/dashboard");
        }
      
      );
}


}