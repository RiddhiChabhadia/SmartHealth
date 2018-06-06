var Meal = require('../models/food.model');
var User = require('../models/user.model')

_this = this




////get meal from database of a user 
exports.getMeals = async function (userid) {

    try {
        var meals = await Meal.find({ "user": userid })
        return meals;
    } catch (e) {
        throw Error(e)
    }
}


exports.getOneMeal = async function (id) {

    try {
        var meals = await Meal.findById(id)
        console.log("******" + meals + "*******")
        return meals;
    } catch (e) {
        throw Error(e)
    }
}


////create meal from database of a user 

exports.createMeal = async function (meal) {
    console.log(" in service");

    // try{
    //     var oldUser = await User.findOne({ "email" : exercise.user});}
    //     catch(e){

    //         throw Error(e)
    //     }


    //     if(oldUser){

    console.log(meal.user + "-----" + "mxxxx   service");
    console.log("-----" + meal.mealName + "mxxxxName service");
    var oldUser = meal.user;
    console.log("old user" + oldUser);
    var newmeal = new Meal({
        mealName: meal.mealName,
        kcal: meal.kcal,
        date: meal.date,
        user: meal.user


    });
    oldUser.meal.push(newmeal);
    oldUser.save();
    //oldUser.exercise.push(newexercise);
    console.log("new" + newmeal);


    try {
        var savedMeal = await newmeal.save();
        console.log(savedMeal + "-------------------****saved");

        return savedMeal;
    } catch (e) {
        throw Error("service error")
    }
}



////update meal from database of a user 
exports.updateMeal = async function (meal) {
    // var id = 
    console.log("id in service" + meal._id)

    try {
        var oldMeal = await Meal.findById(meal._id);
    } catch (e) {
        throw Error(e)
    }

    // if(!oldExercise){
    //     return false;
    // }

    console.log(meal)
    console.log("in service");

    oldMeal.mealName = meal.mealName,
        oldMeal.kcal = meal.kcal,
        oldMeal.date = meal.date,
        console.log(oldMeal)

    try {
        var savedMeal = await oldMeal.save();
        console.log(savedMeal + "saved meal");
        return savedMeal;
    } catch (e) {
        throw Error(e);
    }
}


////delete meal from database of a user 
exports.deleteMeal = async function (id, user) {

    user.exercise.pull(id);
    user.save();

    try {
        var deleted = await Meal.remove({ _id: id })
        if (deleted.result.n === 0) {
            throw Error("Meals Could not be deleted")
        }
        return deleted
    } catch (e) {
        throw Error(e)
    }
}
    exports.searchFood = async function (searchString) {
        console.log("in serv")

        var regexValue = '\.*' + searchString + '\.';
        console.log(searchString);
        try {
            var result = await Meal.find({ mealName: new RegExp(regexValue, 'i') });;


            console.log(result + "insidee sev");
            return result;
        } catch (e) {
            return e;

        }




    }



