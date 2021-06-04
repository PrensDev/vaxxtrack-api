var router = require('express').Router();


/* Super Admin Controller */


// Admin Controller
var adminCtlr = require('../controllers/super_admin/admin.controller');
router.get('/users'                            , adminCtlr.getAllUsers);
router.get('/users/:user_ID'                   , adminCtlr.getOneUser);
router.get('/establishments'                   , adminCtlr.getAllEstablishments);
router.get('/establishments/:establishment_ID' , adminCtlr.getAllEstablishments);


// Vaccine Controller
var vaccineCtlr = require('../controllers/super_admin/vaccine.controller');
router.get('/vaccines'                   , vaccineCtlr.getAllVaccines);
router.get('/vaccines/:vaccine_ID'       , vaccineCtlr.getOneVaccine);
router.put('/update-vaccine/:vaccine_ID' , vaccineCtlr.updateVaccine);


// User Information Controller
var infoController = require('../controllers/super_admin/info.controller');
// TODO: include the properties and paths here


// Account Controller
var accountCtlr = require('../controllers/super_admin/account.controller');
router.put('/update-password' ,  accountCtlr.updatePassword);


// Export module
module.exports = router;