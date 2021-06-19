/**
 * =====================================================================
 * * CITIZEN ROUTES
 * =====================================================================
 */

// Import Router from express
var router = require('express').Router();


// Index Controller (for testing purpose yet)
var indexCtlr = require('../controllers/citizen/index.controller');
router.get('/', indexCtlr.render);


// Health Status Log Controller
var healthStatusLogCtlr = require('../controllers/citizen/health_status_log.controller');
router.get ("/health-status-logs"                               , healthStatusLogCtlr.getAllHealthStatusLogs);
router.get ("/health-status-logs/:health_status_log_ID"         , healthStatusLogCtlr.getOneHealthStatusLog);
router.put ("/update-health-status-log/:health_status_log_ID"   , healthStatusLogCtlr.updateHealthStatusLog);
router.post("/add-health-status-log"                            , healthStatusLogCtlr.createHealthStatusLog);


// Visiting Log Controller
var visitingLogCtlr = require('../controllers/citizen/visiting_log.controller');
router.get ("/visiting-logs"                  , visitingLogCtlr.getAllVisitingLogs);
router.get ("/visiting-logs/:visiting_log_ID" , visitingLogCtlr.getOneVisitingLog);
router.post("/add-visiting-log"               , visitingLogCtlr.createVisitingLog);


// Vaccination Controller
var vaccCtlr = require('../controllers/citizen/vaccination.controller');
router.get ("/vaccination-records"                          , vaccCtlr.getAllVaccRecord);
router.get ("/vaccination-records/:vaccination_record_ID"  , vaccCtlr.getOneVaccRecord);
router.get ("/vaccination-appointments"                     , vaccCtlr.getAllVaccAppointments);
router.delete("/cancel-vaccination-appointment/:vaccination_appointment_ID", vaccCtlr.cancelVaccAppointment);



// User Information Controller
var infoController = require('../controllers/citizen/info.controller');
router.get ('/info' , infoController.getInfo);
router.put ('/edit_info' , infoController.updateInfo);


// Account Controller
var accountCtlr = require('../controllers/citizen/account.controller');
router.put ('/update-password'                 , accountCtlr.updatePassword);
router.get ('/accounts'                        , accountCtlr.getAllAccounts);
router.post('/add-account'                     , accountCtlr.createAccount);
router.put ('/verify-account/:user_account_ID' , accountCtlr.verifyAccount);

// Export module
module.exports = router; 