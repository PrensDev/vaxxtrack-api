var router = require('express').Router();


/* Main Controller */


// Index Controller (for testing purpose yet)
var indexController = require('../controllers/main/index.controller');
router.get('/', indexController.render);


// Login Controller
var loginCtlr = require('../controllers/main/login.controller');
router.post('/login', loginCtlr.login);


// Register Controller
var registerCtlr = require('../controllers/main/register.controller');
router.post('/register/representative'  , registerCtlr.representative);
router.post('/register/citizen'         , registerCtlr.citizen);
router.post('/register/super_admin'     , registerCtlr.super_admin);
router.post('/register/health_official' , registerCtlr.health_official);


// Export module
module.exports = router;