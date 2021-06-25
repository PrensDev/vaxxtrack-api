/**
 * =====================================================================
 * * HEALTH OFFICIAL ROUTES
 * =====================================================================
 */

// Import Router from express
var router = require('express').Router();


// COVID-19 Cases Controller
var casesCtlr = require('../controllers/health_official/covid_cases.controller');
router.get('/covid19-cases' , casesCtlr.getAllCovidCases);


// Vaccination Controller
var vaccCtlr = require('../controllers/health_official/vaccination.controller');
// Vaccinated Citizens 
router.get ('/vaccinated-citizens' , vaccCtlr.getAllUsersAndVaccRecords);
// Vaccination Records
router.get ('/vaccination-records'                        , vaccCtlr.getVaccRecords);
router.put ('/vaccination-records/:vaccination_record_ID' , vaccCtlr.updateVaccRecord);
router.post('/add-vaccination-record'                     , vaccCtlr.createVaccRecord);
// Vaccination Appointments
router.get ('/vaccination-appointments'                             , vaccCtlr.getAllVaccAppointments);
router.put ('/vaccination-appointments/:vaccination_appointment_ID' , vaccCtlr.updateVaccAppointmentStatusApproval);


// User Information Controller
var infoController = require('../controllers/health_official/info.controller');
router.get('/info' , infoController.getInfo);
router.put('/info' , infoController.updateInfo);


// Account Controller
var accountCtlr = require('../controllers/health_official/account.controller');
router.put ('/password'    , accountCtlr.updatePassword);
router.get ('/accounts'    , accountCtlr.getAllAccounts);
router.post('/add-account' , accountCtlr.createAccount);



// Export module
module.exports = router;