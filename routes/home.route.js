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


/**
 * =====================================================================
 * * FOR METHODS THAT CAN BE REQUESTED WITHOUT AUTHORIZATION
 * =====================================================================
 */

// COVID-19 Cases Status
var casesStatusCtlr = require('../controllers/all/cases_status.controller');
router.get('/covid-cases-status' , casesStatusCtlr.getCasesStatus);

// Vaccination Status
var vaccStatusCtlr = require('../controllers/all/vaccination_status.controller');
router.get('/vaccination-records-status', vaccStatusCtlr.getVaccRecordsStatus);
router.get('/vaccination-appointments-status', vaccStatusCtlr.getVaccAppointmentsStatus);

// Vaccines
var vaccCtlr = require('../controllers/all/vaccines.controller');
router.get('/vaccines'              , vaccCtlr.getAllVaccines);
router.get('/vaccines/:vaccine_ID'  , vaccCtlr.getOneVaccine);


// Export module
module.exports = router;