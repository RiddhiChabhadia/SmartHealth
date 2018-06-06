import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import Food from '../models/food.models';
import {FoodService} from '../services/food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  @Input() childMessage : Date;
  constructor(private foodService: FoodService, private router:Router) { 
    console.log(this.childMessage+" food")
  }

  
  ngOnInit() {
    this.foodService.getFood()
    .subscribe(Food => {
      //assign the todolist property to the proper http response
      //this.userList = users
      this.newfoodList=Food;
      console.log("Inside get Food list"+Food);
      console.log("Inside get new exce"+this.newfoodList);
    })
  }

  
  newFood = new Food();
  newfoodList:Food[];

  create() {
    console.log("Inside create food")
    console.log(this.newFood);
    
    
        this.foodService.createFood(this.newFood)
          .subscribe((res) => {
            this.newfoodList.push(res.data)
            this.newFood = new Food();
            this.router.navigateByUrl("/dashboard");
          })
      }


//add food redirect to add component
onAddFood(){

  this.router.navigateByUrl('/food');

}

// getExList(){
//   this.execService.getExercise()
//   .subscribe(Exercise => {
//     //assign the todolist property to the proper http response
//     //this.userList = users
//     this.newexcList=Exercise;
//     console.log("Inside get Execrise list"+Exercise);
//     console.log("Inside get new exce"+this.newexcList);
//   })


// }

//edit food

onEditFood(oldFood){

  console.log(oldFood);
  var newfood=new Food();
  newfood.mealName="hello world";
  newfood.kcal="56";
  newfood._id=oldFood;
  console.log(newfood.mealName+"in dashboard");
  this.foodService.updateFood(newfood)
      .subscribe(
          result => console.log(result)
      );
}

//delete food
onDeleteFood(oldRec){

  console.log(oldRec+"inside delete")
      this.foodService.deleteFood(oldRec)
      .subscribe(
          result => console.log(result)
      );
    }

    cancel(){
      this.router.navigateByUrl("/dashboard");
    }

}
