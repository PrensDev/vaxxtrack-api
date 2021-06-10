var router = require('express').Router();


/* Citizen Controller */


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
// TODO: include the method and paths here


// User Information Controller
var infoController = require('../controllers/citizen/info.controller');
router.get ('/info'        , infoController.getInfo);
router.put ('/update-info' , infoController.updateInfo);


// Account Controller
var accountCtlr = require('../controllers/citizen/account.controller');
router.put('/update-password' ,  accountCtlr.updatePassword);


// Export module
module.exports = router; 