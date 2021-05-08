var router = require('express').Router();


/* Citizen Controller */


// Index Controller
var indexController = require('../controllers/citizen/index.controller');
router.get('/', indexController.render);


// Register Controller
var registerController = require('../controllers/citizen/register.controller');
router.get('/register', registerController.register);


// Export module
module.exports = router;