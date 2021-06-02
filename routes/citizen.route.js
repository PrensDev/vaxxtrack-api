var router = require('express').Router();


/* Citizen Controller */


// Index Controller
var indexCtlr = require('../controllers/citizen/index.controller');
router.get('/', indexCtlr.render);


// Health Status Log Controller
var healthStatusLogCtlr = require('../controllers/citizen/health_status_log.controller');
router.get ("/health-status-logs"                       , healthStatusLogCtlr.findAll);
router.get ("/health-status-logs/:health_status_log_ID" , healthStatusLogCtlr.findOne);
router.put ("/update-health-status-log"                 , healthStatusLogCtlr.update);
router.post("/add-health-status-log"                    , healthStatusLogCtlr.create);


// Visiting Log Controller
var visitingLogCtlr = require('../controllers/citizen/visiting_log.controller');
router.get ("/visiting-logs"                  , visitingLogCtlr.getAllVisitingLogs);
router.get ("/visiting-logs/:visiting_log_ID" , visitingLogCtlr.getOneVisitingLog);
router.post("/add-visiting-log"               , visitingLogCtlr.createVisitingLog);



// User Information Controller
var infoCtlr = require('../controllers/citizen/info.controller');



// Account Controller
var accountCtlr = require('../controllers/citizen/account.controller');
router.put('/update_password/:id'  ,  accountCtlr.update);


// Export module
module.exports = router; 