/**
 * =====================================================================
 * * HEALTH OFFICIAL ROUTES
 * =====================================================================
 */

// Import Router from express
var router = require('express').Router();


// COVID-19 Cases Controller
var casesCtlr = require('../controllers/health_official/covid_cases.controller');
router.post  ('/add-covid19-case'           , casesCtlr.addCovidCase);
router.get   ('/covid19-cases'              , casesCtlr.getAllCovidCases);
router.get   ('/covid19-cases/heatmap-data' , casesCtlr.getCasesCoordinates);
router.get   ('/covid19-cases/:case_ID'     , casesCtlr.getOneCovidCase);
router.put   ('/covid19-cases/:case_ID'     , casesCtlr.updateCovidCase);
router.delete('/covid19-cases/:case_ID'     , casesCtlr.deleteCovidCase);


// Lab Report Controller
var labReportCtlr = require('../controllers/health_official/lab_report.controller');
router.get ('/lab-reports/:lab_report_ID' , labReportCtlr.getLabReport);
router.post('/attach-lab-report/:case_ID' , labReportCtlr.attachLabReport);


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
router.get   ('/vaccines/'            , vaccCtlr.getAllVaccines);
router.get   ('/vaccines/:vaccine_ID' , vaccCtlr.getOneVaccine);
router.put   ('/vaccines/:vaccine_ID' , vaccCtlr.updateVaccine);
router.delete('/vaccines/:vaccine_ID' , vaccCtlr.deleteVaccine);

// Patient
router.get('/probable-patients'          , vaccCtlr.getAllProbablePatients);
router.get('/probable-patients/:user_ID' , vaccCtlr.getOneProbablePatient);



// Contacts
var probCtrl = require('../controllers/health_official/contacts.controller');
router.get ('/probable-contacts'    , probCtrl.getAllProbableContacts);
router.post('/add-contact'          , probCtrl.addContact);
router.get ('/contacts'             , probCtrl.getAllContacts);
router.get ('/contacts/:contact_ID' , probCtrl.getContactInfo);



// User Information Controller
var infoController = require('../controllers/health_official/info.controller');
router.get('/info'        , infoController.getInfo);
router.put('/update-info' , infoController.updateInfo);


// Account Controller
var accountCtlr = require('../controllers/health_official/account.controller');
router.post  ('/add-account'               , accountCtlr.createAccount);
router.get   ('/accounts'                  , accountCtlr.getAllAccounts);
router.delete('/accounts/:user_account_ID' , accountCtlr.deleteAccount);
router.put   ('/change-password'           , accountCtlr.updatePassword);



// Export module
module.exports = router;