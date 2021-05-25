var router = require('express').Router();


/* Citizen Controller */


// Index Controller
var indexController = require('../controllers/citizen/index.controller');
router.get('/', indexController.render);


// Health Status Log Controller
var healthStatusLogController = require('../controllers/citizen/health_status_log.controller');
// Todo: include the properties and paths here


// Visiting Log Controller
var visitingLogController = require('../controllers/citizen/visiting_log.controller');
// Todo: include the properties and paths here


// User Information Controller
var infoController = require('../controllers/citizen/info.controller');
// Todo: include the properties and paths here


// Account Controller
var accountController = require('../controllers/citizen/account.controller');
// Todo: include the properties and paths here


// Export module
module.exports = router;