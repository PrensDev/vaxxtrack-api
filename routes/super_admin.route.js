/**
 * =====================================================================
 * * SUPER ADMIN ROUTES
 * =====================================================================
 */

// Import Router from express
var router = require('express').Router();


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
router.get ('/info'        , infoController.getInfo);
router.put ('/update-info' , infoController.updateInfo);


// Account Controller
var accountCtlr = require('../controllers/super_admin/account.controller');
router.put('/update-password' ,  accountCtlr.updatePassword);
router.get('/accounts'        , accountCtlr.getAllAccounts);
router.post('/add-account'    , accountCtlr.createAccount);


// Export module
module.exports = router;