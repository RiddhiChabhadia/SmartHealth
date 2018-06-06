var UserService = require('../services/user.service')
var passport = require('passport');
var jwt = require('jsonwebtoken');

_this = this


exports.getUsers = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    console.log(page, limit)

    try {
        var users = await UserService.getUsers({}, page, limit)
        console.log("user is" + users);
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

//create new user
exports.createUser = async function (req, res, next) {

    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight,
        gender: req.body.gender,
        password: req.body.password

    }


    try {
        var createdUser = await UserService.createUser(user);

        var token;
        token = UserService.generateJwt();
        console.log("created" + createdUser);
        return res.status(201).json({ status: 201, data: token, message: "Succesfully Created User" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}



//update user
exports.updateUser = async function (req, res, next) {

    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" })
    }

    var id = req.body._id;

    console.log(req.body._id+"...............");

    var user = {
        id,

        firstName: req.body.firstName ? req.body.firstName : null,
        lastName: req.body.lastName ? req.body.lastName : null,
        password: req.body.password ? req.body.password : null,
        email: req.body.email ? req.body.email : null,
        age: req.body.age ? req.body.age : null,
        height: req.body.height ? req.body.height : null,
        weight: req.body.weight ? req.body.weight : null,
        gender: req.body.gender ? req.body.gender : null,


    }

    try {
        var updatedUser = await UserService.updateUser(user)
        return res.status(200).json({ status: 200, data: updatedUser, message: "Succesfully Updated User" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}


//delete user
exports.removeUser = async function (req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await UserService.deleteUser(id)
        return res.status(204).json({ status: 204, message: "Succesfully User Deleted" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }

}




//authenticate user
exports.login = function (req, res) {


    passport.authenticate('local', function (err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};

exports.sortUser = async function (req, res, next) {
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    console.log(page, limit)
    try {
        var users = await UserService.SortUsers()
        console.log("user is" + users);
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
//send email to user on signup
exports.sendMail = async function (req, res, next) {
    var email = req.body.email;
    console.log(email);
    try {
        var users = await UserService.SendMail(email)
        return res.status(200).json({ status: 200, data: users, message: "Mail triggered" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

}
exports.searchUser = async function (req, res, next) {
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;


    console.log("in search");

    var name= req.params.name;

    console.log("in search"+name);
    try {
        var users = await UserService.SearchUsers(name)
        console.log("user is" + users);
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


//search user by email

exports.getUsersbyEmail = async function (req, res, next) {
    // var id =  req.params.id;
    var decoded = jwt.decode(req.query.token);

    try {
        var users = await UserService.getUsersbyEmail(decoded.email);
        console.log("user is" + users);
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Recieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}