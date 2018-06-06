var User = require('../models/user.model')
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

_this = this
var api_key = 'key-1fb5306e36a416c6641a4e35f0e0d010';
var domain = 'sandbox5b91950306cc430c924ccabfb6817413.mailgun.org';
var host = 'api.mailgun.net';
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain, host: host });

//get users
exports.getUsers = async function (query, page, limit) {
    var options = {
        page,
        limit
    }
    try {
        var users = await User.paginate(query, options)
        console.lo
        return users;
    } catch (e) {
        throw Error('Error while Paginating users')
    }
}


exports.getUsersbyEmail = async function (id) {

    try {
        var users = await User.findOne({ email: id })
        return users;
    } catch (e) {
        throw Error('Error while searching user by email')
    }
}


//create user
exports.createUser = async function (user) {

    var newuser = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        height: user.height,
        weight: user.weight,
        gender: user.gender
    });

    newuser.setPassword(user.password);
    console.log("new" + newuser);



    try {
        var savedUser = await newuser.save()
        console.log(savedUser);
        return savedUser;
    } catch (e) {
        throw Error(e)
    }
}


//update user
exports.updateUser = async function (user) {
    var id = user.id

    try {
        var oldUser = await User.findById(id);
    } catch (e) {
        throw Error(e)
    }

    if (!oldUser) {
        return false;
    }

    console.log(oldUser)

    oldUser.firstName = user.firstName,
        oldUser.lastName = user.lastName,
        oldUser.age = user.age,
        oldUser.height = user.height,
        oldUser.weight = user.weight,
        oldUser.gender = user.gender
    console.log(oldUser)

    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}



//delete user

exports.deleteUser = async function (id) {

    try {
        var deleted = await User.remove({ _id: id })
        if (deleted.result.n === 0) {
            throw Error("User Could not be deleted")
        }
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }

}




// exports.authenticateUser = async function(username,pass){
// try{

//     console.log("inside method");

// var oldUser= await User.findOne({ firstName: username ,password:pass})
// if(!oldUser){
//     return false;
// }
// else {
// console.log("user found");
// return oldUser;
// }

// }catch(e){
//     throw Error("Error Occured while Deleting the User")
// }

// }


// exports.setPassword = function(password){
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
//   };

// exports.validPassword = function(password) {
//     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
//     return this.hash === hash;
//   };

exports.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

exports.SortUsers = async function () {
    try {
        var sortedUser = User.find().sort({ age: -1 });
        // var sortesUser = await this.getUsers({},1,10).find().sort({email :-1});
        console.log(sortedUser);
        return sortedUser;
    } catch (e) {
        throw Error(e)
    }
}
exports.SendMail = async function (email) {


    console.log(email);

    var data = {
        from: 'Champions <Champions@Webdesign.mailgun.org>',
        to: email,
        subject: "Welcome to Smart Health",
        html: "<html><img src='http://www.efr.org/wp-content/uploads/2016/03/healthandwellnessapps1.jpg' height='150px' width='500'><br><br><br><p style='font-family:Felipa;font-size:22px;'><b>Welcome to Smart Health!</b></p><p style='font-family:Felipa;font-size:16px;'>Thanks for Signing up!</p><p style='font-family:Felipa;font-size:16px;'>You can use Smart Health online with our unique link <a href='http://localhost:4200'>Smart Health Web App</a>.</p></html>",
    }


    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
}


exports.SearchUsers = async function (name) {
    try {
        var searchedUser = User.find({ "firstName": { '$regex': name } });
        //var searchedUser = User.find({});
        console.log(searchedUser);
        return searchedUser;
    } catch (e) {
        throw Error(e)
    }
}
