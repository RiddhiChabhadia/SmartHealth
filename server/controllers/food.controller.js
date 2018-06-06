var UserService = require('../services/user.service')
var MealService = require('../services/food.service');
var jwt = require('jsonwebtoken');
var meal = require('../models/food.model')

_this = this


//create new meal
exports.createMeal = async function (req, res, next) {
    //  console.log("id from payload"+req.query.token);
    var decoded = jwt.decode(req.query.token);
    //console.log( "decccode:  "+ decoded.email);
    try {
        var newUser = await UserService.getUsersbyEmail(decoded.email);
    } catch (e) {

        return e;
    }
    if (newUser) {

        try {
            var meal = {
                mealName: req.body.mealName,
                kcal: req.body.kcal,
                user: newUser,
                date: req.body.date
            }

            var createdMeal = await MealService.createMeal(meal);
            return res.status(201).json({ status: 201, data: createdMeal, message: "Succesfully Created Meal" })
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message })
        }


    }
    else return res.status(401).json({ status: 400, message: "Unauthorized User" })

}

//get list of meals
exports.getMeals = async function (req, res, next) {



    var decoded = jwt.decode(req.query.token);
    try {
        var newUser = await UserService.getUsersbyEmail(decoded.email);
    } catch (e) {

        return e;
    }

    if (newUser) {

        try {
            var meals = await MealService.getMeals(newUser._id);
            //console.log("ex is"+exercises);
            return res.status(200).json({ status: 200, data: meals, message: "meals Recieved" });
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }
    else return res.status(401).json({ status: 400, message: "Unauthorized User" })
}



//update meal
exports.updateMeal = async function (req, res, next) {


    console.log("in put");
    var decoded = jwt.decode(req.query.token);
    try {
        var newUser = await UserService.getUsersbyEmail(decoded.email);
    } catch (e) {

        return e;
    }

    console.log(req.params.id);
    //  }
    //Course.findById(req.params.id, function (err, course) {
    console.log("no error" + newUser);

    if (newUser) {

        var meal = await MealService.getOneMeal(req.params.id);

        // console.log("------"+exercise+"from service")
        //     console.log("--body----"+req.body.exerciseName+"from service")

        meal.mealName = req.body.mealName ? req.body.mealName : null;
        meal.kcal = req.body.reps ? req.body.kcal : null;
        meal.date = req.body.date ? req.body.date : new date();
        console.log(meal.mealName + "after update");
        console.log(meal.kcal + "after update");
        try {

            console.log("in try");
            console.log("id in try" + meal._id);
            var updatedMeal = await MealService.updateMeal(meal)
            return res.status(200).json({ status: 200, data: updatedMeal, message: "Succesfully Updated Meal" })
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message })
        }
    }
    else return res.status(401).json({ status: 400, message: "Unauthorized User" });
}



//delete meal 
exports.removeMeal = async function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    try {
        var newUser = await UserService.getUsersbyEmail(decoded.email);
    } catch (e) {

        return e;
    }

    console.log(req.params.id);
    //  }
    //Course.findById(req.params.id, function (err, course) {
    console.log("no error" + newUser);

    if (newUser) {
        var id = req.params.id;
        console.log("in delete controller" + id);

        try {
            var deleted = await MealService.deleteMeal(id, newUser)
            return res.status(204).json({ status: 204, message: "Succesfully meal Deleted" })
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message })
        }
    } else return res.status(401).json({ status: 400, message: "Unauthorized User" });

}

//get meal by id
exports.getMealById = async function (req, res, next) {
    console.log("inside get one");
    var decoded = jwt.decode(req.query.token);

    try {
        var newUser = await UserService.getUsersbyEmail(decoded.email);
    } catch (e) {

        return e;
    }
    console.log("no error" + newUser);
    if (newUser) {
        try {


            var meal = await MealService.getOneMeal(req.params.id);

            console.log("meal is" + meal);
            return res.status(200).json({ status: 200, data: meal, message: "Succesfully meal  Recieved " });
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }
    else return res.status(401).json({ status: 401, message: "Unauthorized User" });


}
//search meal by name

exports.searchFood = async function (req, res, next) {
    console.log("in search");
    var decoded = jwt.decode(req.query.token);
    try {
        var newUser = await UserService.getUsersbyEmail(decoded.email);
    } catch (e) {

        return e;
    }

    //  }
    //Course.findById(req.params.id, function (err, course) {
    console.log("no error" + newUser);

    if (newUser) {


        console.log("in search");

        var name = req.params.name;


        console.log("in search value of name" + name);
        var name = req.params.name;
        try {
            var food = await MealService.searchFood(name)
            console.log("ex  is" + food);
            return res.status(200).json({ status: 200, data: food, message: "Succesfully Users Recieved" });
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }
    else return res.status(401).json({ status: 401, message: "Unauthorized User" });
}

