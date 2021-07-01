/**
 * =====================================================================
 * * REPRESENTATIVE ROUTES
 * =====================================================================
 */

// Import Router from express
var router = require('express').Router();


// Index Controller (for testing purpose yet)
var indexCtlr = require('../controllers/representative/index.controller');
router.get('/', indexCtlr.render);


// Establishment Controller
var establishmentCtlr = require('../controllers/representative/establishment.controller');
router.get('/establishments'                   , establishmentCtlr.getAllEstablishments);
router.get('/establishments/:establishment_ID' , establishmentCtlr.getOneEstablishment);
router.put('/establishments/:establishment_ID' , establishmentCtlr.updateEstablishment);


// Visiting Log Controller
var visitingLogCtlr = require('../controllers/representative/visiting_log.controller');
router.get ("/visiting-logs/:establishment_ID"                  , visitingLogCtlr.getAllVisitingLogs);
router.get ("/visiting-logs/:establishment_ID/:visiting_log_ID" , visitingLogCtlr.getOneVisitingLog);
router.post("/add-visiting-log"                                 , visitingLogCtlr.createVisitingLog);


// User Information Controller
var infoController = require('../controllers/representative/info.controller');
router.get('/info' , infoController.getInfo);
router.put('/info' , infoController.updateInfo);                                   


// Account Controller
var accountCtlr = require('../controllers/representative/account.controller');
router.put ('/password' , accountCtlr.updatePassword);
router.get ('/accounts' , accountCtlr.getAllAccounts);
router.post('/add-account', accountCtlr.createAccount);
router.put ('/verify-account/:user_account_ID', accountCtlr.verifyAccount);


// Export module
module.exports = router;