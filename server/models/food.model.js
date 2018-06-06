//schema for food
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
// var mongooseUniqueValidator = require('mongoose-unique-validator');


var MealSchema = new mongoose.Schema({
mealName:{type:String},
date: Date,
kcal:String,
user:{type: mongoose.Schema.Types.ObjectId, ref:'User'}



}
,{collection:'meals'});

MealSchema.plugin(mongoosePaginate)
//UserSchema.plugin(mongooseUniqueValidator);

const Meal = mongoose.model('Meal', MealSchema)

module.exports = Meal;



