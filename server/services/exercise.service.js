var Exercise = require('../models/exercise.model');
var User=require('../models/user.model')

_this = this




//get exercise from database of a user
exports.getExercises = async function(userid){
  
    try {
        var exercises = await Exercise.find({"user":userid})
        return exercises;
    } catch (e) {
        throw Error(e)
    }
}


exports.getOneExercise = async function(id){
  
    try {
        var exercises = await Exercise.findById(id)
        console.log("******"+exercises+"*******")
        return exercises;
    } catch (e) {
        throw Error("error in get");
    }
}

//create exercise in database of a user
exports.createExercise = async function(exercise){
    console.log(" in service");

// try{
//     var oldUser = await User.findOne({ "email" : exercise.user});}
//     catch(e){

//         throw Error(e)
//     }


//     if(oldUser){

     console.log(exercise.user+"-----"+"exxxx   service");
     console.log("-----"+exercise.exerciseName+"exxxxName service");
    var oldUser=exercise.user;
    console.log("old user"+oldUser);
    var newexercise = new Exercise({
        exerciseName:exercise.exerciseName,
        reps:exercise.reps,
        date:exercise.date,
        user:exercise.user


    });
    oldUser.exercise.push(newexercise);
    oldUser.save();
//oldUser.exercise.push(newexercise);
    console.log("new"+newexercise);


    try{
        var savedExercise = await newexercise.save();
        console.log(savedExercise+"-------------------****saved");
       
        return savedExercise;
    }catch(e){
        throw Error("service error")
    }
}



//update exercise from database of a user
exports.updateExercise = async function(exercise){
   // var id = 
   console.log("id in service"+exercise._id)

    try{
        var oldExercise = await Exercise.findById(exercise._id);
    }catch(e){
        throw Error(e)
    }

    // if(!oldExercise){
    //     return false;
    // }

    console.log(exercise)
console.log("in service");

    oldExercise.exerciseName=exercise.exerciseName,
    oldExercise.reps=exercise.reps,
    oldExercise.date=exercise.date,
        console.log(oldExercise)

    try{
        var savedExercise = await oldExercise.save();
        console.log(savedExercise+"saved exercise");
        return savedExercise;
    }catch(e){
        throw Error(e);
    }
}


//delete exercise from database of a user
exports.deleteExercise = async function(id,user){
    
user.exercise.pull(id);
user.save();


    try{
        var deleted = await Exercise.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Exercise Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error(e)
    }

}

//search exercise from database of a user by name
exports.searchExercise=async function(searchString){
console.log("in serv")

var regexValue='\.*'+searchString+'\.';
console.log(searchString);
    try{
        var result=await Exercise.find({ exerciseName: new RegExp(regexValue, 'i')});; 


console.log(result+"insidee sev");
return result;
    }catch(e){
return e;

    }




}



//sort exercise from database of a user by name
exports.sortExercisebyName = async function (userid) {
    try {
        var sortedExercise = Exercise.find({"user":userid}).sort({ exerciseName:1});
         //var sortedExercise = await this.getUsers({},1,10).find().sort({exerciseName :-1});
        console.log(sortedExercise);
        return sortedExercise;
    } catch (e) {
        throw Error(e)
    }
}


////sort exercise from database of a user by date 
exports.sortExercisebyDate = async function (userid) {
    try {
        var sortedExercise = Exercise.find({"user":userid}).sort({ date:-1});
        // var sortesUser = await this.getUsers({},1,10).find().sort({email :-1});
        console.log(sortedExercise);
        return sortedExercise;
    } catch (e) {
        throw Error(e)
    }
}