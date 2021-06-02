var router = require('express').Router();


/* Representative Controller */


// Index Controller
var indexController = require('../controllers/representative/index.controller');
router.get('/', indexController.render);


// Establishment Controller
var establishmentController = require('../controllers/representative/establishment.controller');
router.get('/establishment'                          , establishmentController.findAll);
router.get('/establishment/:establishment_ID'        , establishmentController.find);
router.put('/update-establishment/:establishment_ID' , establishmentController.update);


// Visiting Log Controller
var visitingLogController = require('../controllers/representative/visiting_log.controller');
router.get  ("/visiting-logs/:establishment_ID"                  , visitingLogController.findAll);
router.get  ("/visiting-logs/:establishment_ID/:visiting_log_ID" , visitingLogController.findOne);
router.post ("/add-visiting-log"                                 , visitingLogController.create);


// User Information Controller
var infoController = require('../controllers/representative/info.controller');
router.get('/info'        , infoController.Info);
router.put('/update-info' , infoController.updateInfo);                                   


// Account Controller
var accountController = require('../controllers/representative/account.controller');
router.put('/update-password'  ,  accountController.updatePassword);



// Export module
module.exports = router;