/**
 * =====================================================================
 * * CITIZEN ROUTES
 * =====================================================================
 */

// Import Router from express
var router = require('express').Router();


// Health Status Log Controller
var healthStatusLogCtlr = require('../controllers/citizen/health_status_log.controller');
router.post("/add-health-status-log"                    , healthStatusLogCtlr.createHealthStatusLog);
router.get ("/health-status-logs"                       , healthStatusLogCtlr.getAllHealthStatusLogs);
router.get ("/health-status-logs/check-today"           , healthStatusLogCtlr.checkTodaysHealthStatus);
router.get ("/health-status-logs/today"                 , healthStatusLogCtlr.getHealthStatusLogToday);
router.put ("/health-status-logs/today"                 , healthStatusLogCtlr.updateHealthStatusLogForToday);
router.get ("/health-status-logs/:health_status_log_ID" , healthStatusLogCtlr.getOneHealthStatusLog);


// Visiting Log Controller
var visitingLogCtlr = require('../controllers/citizen/visiting_log.controller');
router.post("/add-visiting-log"               , visitingLogCtlr.createVisitingLog);
router.get ("/visiting-logs"                  , visitingLogCtlr.getAllVisitingLogs);
router.get ("/visiting-logs/:visiting_log_ID" , visitingLogCtlr.getOneVisitingLog);


// Vaccination Controller
var vaccCtlr = require('../controllers/citizen/vaccination.controller');
router.get   ("/vaccination-records/:user_ID"                         , vaccCtlr.getOneUserAndAllVaccRecord);
router.get   ("/vaccination-records/:vaccination_record_ID"           , vaccCtlr.getOneVaccRecord);

// Vaccination Appointmets
router.post  ("/add-vaccination-appointments"                         , vaccCtlr.createVaccAppointments);
router.get   ("/vaccination-appointments"                             , vaccCtlr.getAllVaccAppointments);
router.get   ("/vaccination-appointments/count"                       , vaccCtlr.vaccAppointmentCount);
router.get   ("/vaccination-appointments/:vaccination_appointment_ID" , vaccCtlr.getOneVaccinationAppointment);
router.put   ("/vaccination-appointments/:vaccination_appointment_ID" , vaccCtlr.updateVaccAppointment);
router.delete("/vaccination-appointments/:vaccination_appointment_ID" , vaccCtlr.cancelVaccAppointment);



// User Information Controller
var infoController = require('../controllers/citizen/info.controller');
router.get ('/info' , infoController.getInfo);
router.put ('/info' , infoController.updateInfo);


// Account Controller
var accountCtlr = require('../controllers/citizen/account.controller');
router.post  ('/add-account'                     , accountCtlr.createAccount);
router.get   ('/accounts'                        , accountCtlr.getAllAccounts);
router.delete('/accounts/:user_account_ID'       , accountCtlr.deleteAccount);
router.put   ('/change-password'                 , accountCtlr.updatePassword);
router.put   ('/verify-account/:user_account_ID' , accountCtlr.verifyAccount);


// Export module
module.exports = router; 