var router = require('express').Router();


/* Citizen Controller */


// Index Controller
var indexController = require('../controllers/citizen/index.controller');
router.get('/', indexController.render);


// Health Status Log Controller
var healthStatusLogController = require('../controllers/citizen/health_status_log.controller');
// Todo: include the properties and paths here


// Visiting Log Controller
var visitingLogController = require('../controllers/citizen/visiting_log.controller');
router.get  ("/visiting-logs"                   , visitingLogController.findAll);
router.get  ("/visiting-logs/:visiting_log_ID"  , visitingLogController.findOne);
router.post ("/visiting-logs/add"               , visitingLogController.create);


// User Information Controller
var infoController = require('../controllers/citizen/info.controller');
// Todo: include the properties and paths here
router.get ('/info', infoController.get_info);
router.put ("/edit_info", infoController.update);

// Account Controller
var accountController = require('../controllers/citizen/account.controller');
// Todo: include the properties and paths here
router.put('/update_password/:id'  ,  accountController.update);

// Export module
module.exports = router; 