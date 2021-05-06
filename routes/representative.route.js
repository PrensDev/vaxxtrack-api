/* Representative Controller */

// Import required modules/packages]
var router = require('express').Router();


// Index Controller
var indexController = require('../controllers/representative/index.controller');
router.get('/', indexController.render);


// Register Controller
var registerController = require('../controllers/representative/register.controller');
router.post('/register', registerController.register);


// Login Controller
var loginController = require('../controllers/representative/login.controller');
router.get('/login', loginController.login);


// Establishment Controller
var establishmentController = require('../controllers/representative/establishment.controller');
router.get('/establishment'     , establishmentController.findAll);
router.get('/establishment/:id' , establishmentController.find);


// Export module
module.exports = router;