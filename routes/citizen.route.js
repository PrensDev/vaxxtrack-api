var router = require('express').Router();


/* Citizen Controller */


// Index Controller
var indexController = require('../controllers/citizen/index.controller');
router.get('/', indexController.render);


// Health Status Log Controller
var healthStatusLogController = require('../controllers/citizen/health_status_log.controller');
// Todo: include the properties and paths here
router.post ("/add_health_status_log", healthStatusLogController.create);
router.get ("/health_status_logs",  healthStatusLogController.findAll);
router.get ("/health_status_logs/:health_status_log_ID", healthStatusLogController.findOne);
router.put ("/update_health_status_log", healthStatusLogController.update);


// Visiting Log Controller
var visitingLogController = require('../controllers/citizen/visiting_log.controller');
router.get  ("/visiting-logs"                  , visitingLogController.all_visiting_logs);
router.get  ("/visiting-logs/:visiting_log_ID" , visitingLogController.one_visiting_log);
router.post ("/visiting-logs/add"              , visitingLogController.create);


// User Information Controller
var infoController = require('../controllers/citizen/info.controller');
router.get ('/citizens',        infoController.getInfo);
router.put ('/update-citizen',  infoController.updateInfo);



// Account Controller
var accountController = require('../controllers/citizen/account.controller');
router.put('/update_password/:id'  ,  accountController.update);


// Export module
module.exports = router; 