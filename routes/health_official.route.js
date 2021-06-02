var router = require('express').Router();


/* Health Official Route */


// Vaccination Controller
var vaccCtlr = require('../controllers/health_officials/vaccination.controller');
router.get('/vaccinated-citizens', vaccCtlr.getAllUsersAndVaccRecords);


// Export module
module.exports = router;