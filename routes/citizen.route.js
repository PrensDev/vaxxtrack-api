/* Citizen Controller */

// Import required modules/packages]
var express = require('express');
var router = express.Router();


// Index Controller
var indexController = require('../controllers/citizen/index.controller');
router.get('/', indexController.render);


// Login Controller
var loginController = require('../controllers/citizen/login.controller');
router.get('/login', loginController.login);


// Register Controller
var registerController = require('../controllers/citizen/register.controller');
router.get('/register', registerController.register);


// Export module
module.exports = router;