//schema for exercise
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


//schema for exercise
var ExerciseSchema = new mongoose.Schema({
exerciseName:{type:String,text: true},
date: Date,
reps:{type:String,text: true},
//one to many relation between user and exercise
user:{type: mongoose.Schema.Types.ObjectId, ref:'User'}



}
,{collection:'exercises'});

ExerciseSchema.plugin(mongoosePaginate)


const Exercise = mongoose.model('Exercise', ExerciseSchema)

module.exports = Exercise;



