var router = require('express').Router();


/* Health Official Route */


// Vaccination Controller
var vaccCtlr = require('../controllers/health_officials/vaccination.controller');
router.get('/vaccinated-citizens', vaccCtlr.getAllUsersAndVaccRecords);


// User Information Controller
var infoController = require('../controllers/health_officials/info.controller');
// TODO: include the properties and paths here


// Account Controller
var accountCtlr = require('../controllers/health_officials/account.controller');
// TODO: include the properties and paths here


// Export module
module.exports = router;