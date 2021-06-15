/**
 * =====================================================================
 * * HOME ROUTES
 * =====================================================================
 */

// Import Router from express
var router = require('express').Router();


// Index Controller (for testing purpose yet)
var indexController = require('../controllers/home/index.controller');
router.get('/', indexController.render);


// Login Controller
var loginCtlr = require('../controllers/home/login.controller');
router.post('/login', loginCtlr.login);


// Register Controller
var registerCtlr = require('../controllers/home/register.controller');
router.post('/register/representative'  , registerCtlr.representative);
router.post('/register/citizen'         , registerCtlr.citizen);
router.post('/register/super_admin'     , registerCtlr.super_admin);
router.post('/register/health_official' , registerCtlr.health_official);


// Export module
module.exports = router;