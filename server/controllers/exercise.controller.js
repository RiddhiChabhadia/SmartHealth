var UserService = require('../services/user.service')
var ExerciseService = require('../services/exercise.service');
var jwt = require('jsonwebtoken');
var User = require('../models/user.model')

_this = this


//creating a new exercise
exports.createExercise = async function(req, res, next){
 //  console.log("id from payload"+req.query.token);
   var decoded = jwt.decode(req.query.token);
   console.log( "decccode:  "+ decoded.email);
try{ var newUser= await UserService.getUsersbyEmail(decoded.email);
} catch(e){

    return e;
}
  if(newUser){

         try{
            var exercise = {
                exerciseName:req.body.exerciseName,
                reps:req.body.reps,
                user: newUser,
                date:req.body.date
            }

             var createdExercise = await ExerciseService.createExercise(exercise);
            return res.status(201).json({status: 201, data: createdExercise, message: "Succesfully Created Exercise"})
        }catch(e){
            return res.status(400).json({status: 400, message:e.message})
        }
    
  
    }
    else return res.status(401).json({status: 400, message:"Unauthorized User"}) 

}


//get a  exercise by id
exports.getExercises = async function(req, res, next){

   

    var decoded = jwt.decode(req.query.token);
 try{ var newUser= await UserService.getUsersbyEmail(decoded.email);
 } catch(e){
 
     return e;
 }

 if(newUser){

    try{
        var exercises = await ExerciseService.getExercises(newUser._id);
        //console.log("ex is"+exercises);
        return res.status(200).json({status: 200, data: exercises, message: "exercises Recieved"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}
else return res.status(401).json({status: 400, message:"Unauthorized User"}) }



//update a  exercise 
exports.updateExercise = async function(req, res, next){


    console.log("in put");
    var decoded = jwt.decode(req.query.token);
 try{ var newUser= await UserService.getUsersbyEmail(decoded.email);
    } catch(e){
 
     return e;}

    console.log(req.params.id);
//  }
//Course.findById(req.params.id, function (err, course) {
console.log("no error"+newUser);

if(newUser){

var exercise= await ExerciseService.getOneExercise(req.params.id);

// console.log("------"+exercise+"from service")
//     console.log("--body----"+req.body.exerciseName+"from service")

    exercise.exerciseName=req.body.exerciseName?req.body.exerciseName:null;
    exercise.reps=req.body.reps? req.body.reps:null;
    exercise.date=req.body.date?req.body.date:new Date();
console.log(exercise.exerciseName+"after update");
console.log(exercise.reps+"after update");
    try{

        console.log("in try");
        console.log("id in try"+ exercise._id);
        var updatedExercise = await ExerciseService.updateExercise(exercise)
        return res.status(200).json({status: 200, data: updatedExercise, message: "Succesfully Updated Exercise"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}
else return res.status(401).json({status: 400, message:"Unauthorized User"});
}



//delete exercise
exports.removeExercise = async function(req, res, next){
    var decoded = jwt.decode(req.query.token);
 try{ var newUser= await UserService.getUsersbyEmail(decoded.email);
    } catch(e){
 
     return e;}

    console.log(req.params.id);
//  }
//Course.findById(req.params.id, function (err, course) {
console.log("no error"+newUser);

if(newUser){
    var id = req.params.id;
    console.log("in delete controller"+id);

    try{
        var deleted = await ExerciseService.deleteExercise(id,newUser)
        return res.status(204).json({status:204,data:deleted, message: "Succesfully exercise Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}else return res.status(401).json({status: 400, message:"Unauthorized User"});

}


//search exercise
exports.searchExercise = async function (req, res, next) {



    console.log("in search");
    var decoded = jwt.decode(req.query.token);
 try{ var newUser= await UserService.getUsersbyEmail(decoded.email);
    } catch(e){
 
     return e;}

//  }
//Course.findById(req.params.id, function (err, course) {
console.log("no error"+newUser);

if(newUser){


    console.log("in search");

    var name= req.params.name;

  
    console.log("in search value of name"+name);
    var name= req.params.name;
    try {
        var exercise = await ExerciseService.searchExercise(name)
        console.log("ex  is" + exercise);
        return res.status(200).json({ status: 200, data: exercise, message: "Succesfully Users Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }}
    else return res.status(401).json({status: 401, message:"Unauthorized User"});
}


//sort exercise by name ascending
exports.sortExercisebyName = async function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    try{ var newUser= await UserService.getUsersbyEmail(decoded.email);
       } catch(e){
    
        return e;}
   
   //  }
   //Course.findById(req.params.id, function (err, course) {
   console.log("no error"+newUser);
   
   if(newUser){
    try {

        
        var exercise = await ExerciseService.sortExercisebyName(newUser._id);
        console.log("exercise is" + exercise);
        return res.status(200).json({ status: 200, data: exercise, message: "Succesfully ex  Recieved in sort" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }}
    else return res.status(401).json({status: 401, message:"Unauthorized User"});
}

//sort exercise by date descending
exports.sortExercisebyDate = async function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    try{ var newUser= await UserService.getUsersbyEmail(decoded.email);
       } catch(e){
    
        return e;}
   
   //  }
   //Course.findById(req.params.id, function (err, course) {
   console.log("no error"+newUser);
   
   if(newUser){
    try {

        
        var exercise = await ExerciseService.sortExercisebyDate(newUser._id);
        console.log("exercise is" + exercise);
        return res.status(200).json({ status: 200, data: exercise, message: "Succesfully ex  Recieved in sort" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }}
    else return res.status(401).json({status: 401, message:"Unauthorized User"});
}


//search exercise by id
exports.getExercisebyId=async function(req,res,next){
console.log("inside get one");
var decoded = jwt.decode(req.query.token);

    try{ var newUser= await UserService.getUsersbyEmail(decoded.email);
    } catch(e){
 
     return e;}
console.log("no error"+newUser);
  if(newUser){
    try {

        
        var exercise= await ExerciseService.getOneExercise(req.params.id);

        console.log("exercise is" + exercise);
        return res.status(200).json({ status: 200, data: exercise, message: "Succesfully ex  Recieved " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }}
else return res.status(401).json({status: 401, message:"Unauthorized User"});


}