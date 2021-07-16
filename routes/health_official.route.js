/**
 * =====================================================================
 * * HEALTH OFFICIAL ROUTES
 * =====================================================================
 */

// Import Router from express
var router = require('express').Router();


// COVID-19 Cases Controller
var casesCtlr = require('../controllers/health_official/covid_cases.controller');
router.get('/covid19-cases'          , casesCtlr.getAllCovidCases);
router.get('/covid19-cases/:case_ID' , casesCtlr.getOneCovidCase);


// Vaccination Controller
var vaccCtlr = require('../controllers/health_official/vaccination.controller');

// Vaccinated Citizens 
router.get ('/vaccinated-citizens'          , vaccCtlr.getAllUsersAndVaccRecords);
router.get ('/vaccinated-citizens/:user_ID' , vaccCtlr.getOneUserAndVaccRecords);

// Vaccination Records
router.post  ('/add-vaccination-record'                     , vaccCtlr.createVaccRecord);
router.get   ('/vaccination-records'                        , vaccCtlr.getAllVaccRecords);
router.get   ('/vaccination-records/:vaccination_record_ID' , vaccCtlr.getOneVaccRecord);
router.put   ('/vaccination-records/:vaccination_record_ID' , vaccCtlr.updateVaccRecord);
router.delete('/vaccination-records/:vaccination_record_ID' , vaccCtlr.deleteVaccRecord);

// Vaccination Appointments
router.get ('/vaccination-appointments'                             , vaccCtlr.getAllVaccAppointments);
router.get ('/vaccination-appointments/:vaccination_appointment_ID' , vaccCtlr.getOneVaccAppointment);
router.put ('/vaccination-appointments/:vaccination_appointment_ID' , vaccCtlr.updateVaccAppointment);

// Vaccines
router.post  ('/add-vaccine'          , vaccCtlr.addVaccine);
router.put   ('/vaccines/:vaccine_ID' , vaccCtlr.updateVaccine);
router.delete('/vaccines/:vaccine_ID' , vaccCtlr.deleteVaccine);

// Patient
router.get('/probable-patients'          , vaccCtlr.getAllProbablePatients);
router.get('/probable-patients/:user_ID' , vaccCtlr.getOneProbablePatient);


// User Information Controller
var infoController = require('../controllers/health_official/info.controller');
router.get('/info'        , infoController.getInfo);
router.put('/update-info' , infoController.updateInfo);


// Account Controller
var accountCtlr = require('../controllers/health_official/account.controller');
router.post('/add-account'     , accountCtlr.createAccount);
router.get ('/accounts'        , accountCtlr.getAllAccounts);
router.put ('/change-password' , accountCtlr.updatePassword);



// Export module
module.exports = router;