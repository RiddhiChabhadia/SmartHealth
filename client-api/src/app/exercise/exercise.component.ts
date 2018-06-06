import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Exercise from '../models/exercise.model';
import { ExerciseService } from '../services/exercise.service';
import { FoodService } from '../services/food.service';
import { UserService } from '../services/user.service';
import Food from '../models/food.models';
import { ChartModule, Highcharts } from 'angular-highcharts';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  constructor(private execService: ExerciseService, private userService: UserService, private foodService: FoodService, private router: Router) { }
  searchString: String;
  searchFoodString: String;
  newexcList: Exercise[];
  newFoodList: Food[];
  username;
  ngOnInit() {
    this.execService.getExercise()
      .subscribe(Exercise => {
        //assign the todolist property to the proper http response
        //this.userList = users
        this.newexcList = Exercise;
      })

    this.foodService.getFood()
      .subscribe(Food => {
        this.newFoodList = Food;
      })
    this.userService.getUserByMail()
      .subscribe(users => {
        //assign the todolist property to the proper http response
        //this.userList = users
        this.username = users.firstName;
      });
  }


  getChartDetails() {
    console.log("Inside getChartDetails Function now");
    this.execService.getExercise()
      .subscribe(Exercise => {

        //Declaring variables to capture exercise details
        var something = this.newexcList = Exercise;
        var date = [];
        var newDate;
        var pushups = [];
        var newPushups;
        var legs = [];
        var newLegs;
        var squats = [];
        var newSquats;
        var parseDate = [];
        var counter = 0;


        for (var i = 0; i < something.length; i++) {
          newDate = something[i].date;

          console.log("Date value coming is : " + newDate);
          if (!parseDate.includes(newDate.substring(0, 10))) {
            parseDate[counter] = newDate.substring(0, 10);
            date[counter++] = newDate;
          }
        }

        for (var j = 0; j < date.length; j++) {
          var subarray = something.filter(some => some.date === date[j]);
          for (var k = 0; k < subarray.length; k++) {
            if (subarray[k].exerciseName === "Squats") {
              newSquats = subarray[k].reps;
              squats[j] = +newSquats;
            }

            else if (subarray[k].exerciseName === "Pushups") {
              newPushups = subarray[k].reps;
              pushups[j] = +newPushups;
            }

            else if (subarray[k].exerciseName === "Legs") {
              newLegs = subarray[k].reps;
              legs[j] = +newLegs;
            }

          }
        }
        console.log(parseDate);
        this.generateGraph(parseDate, legs, squats, pushups);
      })
  }

//graphs function 
  generateGraph(parseDate, legs, squats, pushups) {
    console.log("Inside Actual Graph creation function now");
    console.log(parseDate);


    Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Daily Exercise Repetitions Done'
      },
      subtitle: {
        text: 'Source: Smart Health App'
      },
      xAxis: {
        categories: parseDate,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'No of Repetitions'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} counts</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Legs',
        data: legs
      }, {
        name: 'Squats',
        data: squats
      },
      {
        name: 'Pushups',
        data: pushups
      }]
    });
  }
//add exercise  redirect to exercise page
  onAddExercise() {

    this.router.navigateByUrl('/exercise');

  }

  //add food  redirect to food page
  onAddFood() {
    console.log("Inside add food function")
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


//search exercise on the basis of name
  onSearchClick() {
    console.log("search cliked");
    console.log(this.searchString + "search string in search");
    this.execService.searchExercises(this.searchString)
      .subscribe(result => {
      this.newexcList = result["data"];
        console.log(result["data"] + "inside search method ts")
      })
    this.searchString = "";
    console.log(this.searchString + "search string in search");

  }


//search food on the basis of name
  onSearchFoodClick() {
    console.log("search clicked");
    console.log(this.searchFoodString + "search string in search");
    this.foodService.searchFood(this.searchFoodString)
      .subscribe(result => {
      this.newFoodList = result["data"];
      console.log(this.newFoodList + "inside search method ts")
        console.log(result["data"] + "inside search method ts")
      })
    this.searchFoodString = "";
    console.log(this.searchFoodString + "search string in search");
  }

//
//sort exercise on the basis of name
  onSortbyExerciseName() {
    console.log("sort ex cliked");

    this.execService.sortByExerciseName()
      .subscribe(result => {
      this.newexcList = result["data"];
        console.log(result["data"] + "inside search method ts")
      })

  }

//sort exercise on the basis of date

  onSortbyExerciseDate() {
    console.log("sort ex  datecliked");

    this.execService.sortByExerciseDate()
      .subscribe(result => {
      this.newexcList = result["data"];
        console.log(result["data"] + "inside search method ts")
      })

  }



//on edit exercise redirect to edit component
  onEditExercise(oldExerc) {


    var navUrl = "/editExercise/" + oldExerc;
    this.router.navigateByUrl("/editExercise/" + oldExerc);

    // console.log(oldExerc);
    // var newexercise = new Exercise();
    // newexercise.exerciseName = "hello world";
    // newexercise.reps = "56";
    // newexercise._id = oldExerc;
    // console.log(newexercise.exerciseName + "in dashboard");
    // this.execService.updateExercise(newexercise)
    //   .subscribe(
    //     result => console.log(result)
    //   );
  }

//delete a exercise
  onDeleteExercise(oldRec) {

    console.log(oldRec + "inside delete")

    var index = this.newexcList.indexOf(oldRec);
    // this.newexcList.remove(oldRec);
    console.log(oldRec._id);
    console.log(index + "index");
    this.newexcList.splice(index, 1);
    this.execService.deleteExercise(oldRec._id)
      .subscribe(
        result => { console.log(result + "resssssssss") }

      );
  }


  //on edit food redirect to food component

  onEditFood(oldFood) {


    var navUrl = "/editFood/" + oldFood;
    this.router.navigateByUrl("/editFood/" + oldFood);
    // console.log(oldFood);
    // var newfood = new Food();
    // newfood.mealName = "hello world";
    // newfood.kcal = "56";
    // newfood._id = oldFood;
    // console.log(newfood.mealName + "in dashboard");
    // this.foodService.updateFood(newfood)
    //   .subscribe(
    //     result => console.log(result)
    //   );
  }

//delete food redirect to delete 
  onDeleteFood(oldRec) {

    console.log(oldRec + "inside delete")

    var index = this.newFoodList.indexOf(oldRec);
    // this.newexcList.remove(oldRec);
    console.log(oldRec._id);
    console.log(index + "index");
    this.newFoodList.splice(index, 1);

    console.log(oldRec + "inside delete")
    this.foodService.deleteFood(oldRec._id)
      .subscribe(
        result => console.log(result)
      );
  }




}