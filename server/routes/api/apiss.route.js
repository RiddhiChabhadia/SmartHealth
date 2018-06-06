var express = require('express')

var router = express.Router()

var UserController = require('../../controllers/user.controller');
var ExerciseController=require('../../controllers/exercise.controller');

 var FoodController=require('../../controllers/food.controller');
////user curd operation url
router.get('/', UserController.getUsers)
router.post('/', UserController.createUser)
router.put('/', UserController.updateUser)
router.delete('/:id',UserController.removeUser)
router.post('/login',UserController.login)
router.post('/sendMail',UserController.sendMail)
router.get('/searchbyEmail', UserController.getUsersbyEmail)

//exercise curd operation url
router.post('/exercise',ExerciseController.createExercise)
router.get('/exercise',ExerciseController.getExercises)
router.get('/exercise/:id',ExerciseController.getExercisebyId)
router.put('/exercise/:id',ExerciseController.updateExercise)
router.delete('/exercise/:id',ExerciseController.removeExercise)
router.get('/search/:name',ExerciseController.searchExercise)
router.get('/exercises/sortbyExerciseName',ExerciseController.sortExercisebyName)
router.get('/exercises/sortbyExerciseDate',ExerciseController.sortExercisebyDate)


// router.get('/sortedUser', ToDoController.sortUser)

//food curd operation url
router.post('/food',FoodController.createMeal)
router.get('/food',FoodController.getMeals)
router.put('/food/:id',FoodController.updateMeal)
router.delete('/food/:id',FoodController.removeMeal)
router.get('/food/:id',FoodController.getMealById)
router.get('/searchfood/:name',FoodController.searchFood)




// router.get('/searchUser/:name', ToDoController.searchUser)

module.exports = router;