var router = require('express').Router();


/* Health Official Route */


// Vaccination Controller
var vaccCtlr = require('../controllers/health_official/vaccination.controller');
router.get('/vaccinated-citizens', vaccCtlr.getAllUsersAndVaccRecords);


// User Information Controller
var infoController = require('../controllers/health_official/info.controller');
router.get ('/info'        , infoController.getInfo);
router.put ('/update-info' , infoController.updateInfo);


// Account Controller
var accountCtlr = require('../controllers/health_official/account.controller');
router.put('/update-password' ,  accountCtlr.updatePassword);
router.get('/accounts'        , accountCtlr.getAllAccounts);
router.post('/add-account'        , accountCtlr.createAccount);



// Export module
module.exports = router;