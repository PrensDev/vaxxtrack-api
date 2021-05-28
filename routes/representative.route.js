var router = require('express').Router();


/* Representative Controller */


// Index Controller
var indexController = require('../controllers/representative/index.controller');
router.get('/', indexController.render);


// Establishment Controller
var establishmentController = require('../controllers/representative/establishment.controller');
router.get('/establishment'             , establishmentController.findAll);
router.get('/establishment/:id'         , establishmentController.find);
router.put('/update-establishment/:id'  , establishmentController.update);


// Visiting Log Controller
var visitingLogController = require('../controllers/representative/visiting_log.controller');
// Todo: include the properties and paths here


// Use Information Controller
var infoController = require('../controllers/representative/info.controller');
// Todo: include the properties and paths here
router.get('/info', infoController.get_info);
router.put("/:id", infoController.update_info);                                   


// Account Controller
var accountController = require('../controllers/representative/account.controller');
// Todo: include the properties and paths here
router.put('/update_password/:id'  ,  accountController.update);



// Export module
module.exports = router;