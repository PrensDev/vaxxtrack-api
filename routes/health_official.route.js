var router = require('express').Router();


/* Health Official Route */


// Vaccination Controller
var vaccCtlr = require('../controllers/health_official/vaccination.controller');
router.get('/vaccinated-citizens', vaccCtlr.getAllUsersAndVaccRecords);


// User Information Controller
var infoController = require('../controllers/health_official/info.controller');
// TODO: include the properties and paths here


// Account Controller
var accountCtlr = require('../controllers/health_official/account.controller');
// TODO: include the properties and paths here
router.put('/update-password' ,  accountCtlr.updatePassword);



// Export module
module.exports = router;