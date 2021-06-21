/**
 * =====================================================================
 * * HEALTH OFFICIAL ROUTES
 * =====================================================================
 */

// Import Router from express
var router = require('express').Router();


// Vaccination Controller
var vaccCtlr = require('../controllers/health_official/vaccination.controller');
router.get ('/vaccinated-citizens'                                 , vaccCtlr.getAllUsersAndVaccRecords);
router.get ('/vaccination-appointments'                            , vaccCtlr.getAllVaccAppointments);
router.post('/add-vaccination-record'                              , vaccCtlr.createVaccRecord);
router.put ('/vaccination-records/:vaccination_record_ID'          , vaccCtlr.updateVaccRecord);
router.put ('/vaccination-appointments/:vaccination_appointment_ID', vaccCtlr.updateVaccAppointmentStatusApproval);


// User Information Controller
var infoController = require('../controllers/health_official/info.controller');
router.get('/info' , infoController.getInfo);
router.put('/info' , infoController.updateInfo);


// Account Controller
var accountCtlr = require('../controllers/health_official/account.controller');
router.put ('/password'     , accountCtlr.updatePassword);
router.get ('/accounts'     , accountCtlr.getAllAccounts);
router.post('/add-account'  , accountCtlr.createAccount);



// Export module
module.exports = router;