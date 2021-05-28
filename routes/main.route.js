var router = require('express').Router();


/* Main Controller */


// Index Controller
var indexController = require('../controllers/main/index.controller');
router.get('/', indexController.render);


// Login Controller
var loginController = require('../controllers/main/login.controller');
router.post('/login', loginController.login);


// Register Controller
var registerController = require('../controllers/main/register.controller');
router.post('/register/representative', registerController.representative);
router.post('/register/citizen', registerController.citizen);
router.post('/register/super_admin', registerController.super_admin);
router.post('/register/health_official', registerController.health_official);

// Export module
module.exports = router;