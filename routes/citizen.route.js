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
// Todo: include the properties and paths here
router.post("/add_visiting_log", visitingLogController.create);
router.get("/all_visiting_logs", visitingLogController.findAll);
router.get("/one_visiting_log/:id", visitingLogController.findOne);


// User Information Controller
var infoController = require('../controllers/citizen/info.controller');
// Todo: include the properties and paths here
router.get('/info', infoController.get_info);
router.put("/:id", infoController.update_info);

// Account Controller
var accountController = require('../controllers/citizen/account.controller');
// Todo: include the properties and paths here
router.put('/update-password/:id'  ,  accountController.update_password);

// Export module
module.exports = router; 