import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import Food from '../models/food.models';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-editfood',
  templateUrl: './editfood.component.html',
  styleUrls: ['./editfood.component.scss']
})
export class EditfoodComponent implements OnInit {

  newFood = new Food();
  params: any;


  
  constructor(private route: ActivatedRoute, private foodService: FoodService, private routerr: Router) {



    // this.newFood.mealName = "hi";
    // this.newFood.kcal = "4";
    // this.newFood.date = new Date();
//auto populate data to be edited 
    this.route.params.subscribe(params => {
      console.log(params.id + "parmmsss-------");
      this.params = params.id
    });
    this.foodService.getOneMeal(this.params).
      subscribe(res => {
        console.log(res) + "inside edit comp res";
        this.newFood.mealName = res.mealName;
        this.newFood.kcal = res.kcal;
        this.newFood.date = res.date;
      }
      );

  }
  ngOnInit() {




  }

//on edit food update the food object
  editFood() {



    console.log(this.newFood._id + "olldexrec in update methoddddd");
    var newfood1 = new Food();
    newfood1.mealName = this.newFood.mealName;
    newfood1.kcal = this.newFood.kcal;
    newfood1._id = this.params
    newfood1.date = this.newFood.date;
    console.log(newfood1.mealName + "in dashboard");
    this.foodService.updateFood(newfood1)
      .subscribe(
        result => {
          console.log(result);
          this.routerr.navigateByUrl("/dashboard");
        }

      );
  }


}
