//schema for user
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
// var mongooseUniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    firstName: {type:String},
    lastName: {type:String},
    email: {type: String, unique: true,
        required: true},
    age: {type: String},
    height: {type: String},
    weight: {type: String},
    hash: String,
    salt: String,
    gender: {type: String},
    exercise:[{type:mongoose.Schema.Types.ObjectId,ref:'Exercise'}],
    meal:[{type:mongoose.Schema.Types.ObjectId,ref:'Meal'}]
}, { usePushEach: true })

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };
  
  UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };
  


  UserSchema.methods.generateJwt = function() {
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
      
        return jwt.sign({
          _id: this.ObjectId,
          email: this.email,
          name: this.name,
          exp: parseInt(expiry.getTime() / 1000),
        }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
      };

UserSchema.plugin(mongoosePaginate)
//UserSchema.plugin(mongooseUniqueValidator);

const User = mongoose.model('User', UserSchema)

module.exports = User;



