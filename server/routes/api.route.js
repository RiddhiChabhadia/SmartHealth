var express = require('express')

var router = express.Router()
var api = require('./api/apiss.route')


router.use('/users', api);


module.exports = router;