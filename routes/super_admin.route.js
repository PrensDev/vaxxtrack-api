/**
 * =====================================================================
 * * SUPER ADMIN ROUTES
 * =====================================================================
 */

// Import Router from express
var router = require('express').Router();


// Administration Controller
var adminCtlr = require('../controllers/super_admin/admin.controller');
router.get('/users'                            , adminCtlr.getAllUsers);
// router.get('/users/:user_ID'                   , adminCtlr.getOneUser);
router.get('/establishments'                   , adminCtlr.getAllEstablishments);
router.get('/establishments/:establishment_ID' , adminCtlr.getAllEstablishments);


// COVID-19 Cases Controller
var casesCtlr = require('../controllers/super_admin/covid_cases.controller');
router.get('/covid19-cases', casesCtlr.getAllCovidCases);


// Vaccination Controller
var vaccCtlr = require('../controllers/super_admin/vaccination.controller');

// Vaccines
router.post  ('/add-vaccine'          , vaccCtlr.addVaccine);
router.put   ('/vaccines/:vaccine_ID' , vaccCtlr.updateVaccine);
router.delete('/vaccines/:vaccine_ID' , vaccCtlr.deleteVaccine);

// Vaccination Records Management
router.get('/vaccination-records', vaccCtlr.getAllVaccRecords);
router.get('/vaccination-records/:vaccination_record_ID', vaccCtlr.getOneVaccRecord);

// Vaccination Appointments
router.get ('/vaccination-appointments'                             , vaccCtlr.getAllVaccAppointments);
router.get ('/vaccination-appointments/:vaccination_appointment_ID' , vaccCtlr.getOneVaccAppointment);


// User Information Controller
var infoController = require('../controllers/super_admin/info.controller');
router.get('/info' , infoController.getInfo);
router.put('/info' , infoController.updateInfo);


// Account Controller
var accountCtlr = require('../controllers/super_admin/account.controller');
router.post('/add-account'     , accountCtlr.createAccount);
router.get ('/accounts'        , accountCtlr.getAllAccounts);
router.put ('/change-password' , accountCtlr.updatePassword);


// User Management Controller
var userCtlr = require('../controllers/super_admin/users.controller');
router.get('/users-count'                                , userCtlr.getUsersCount);
router.get('/users/citizens'                             , userCtlr.getAllCitizens);
router.get('/users/citizens/:citizen_ID'                 , userCtlr.getOneCitizen);
router.get('/users/representatives'                      , userCtlr.getAllRepresentatives);
router.get('/users/representatives/:representative_ID'   , userCtlr.getOneRepresentative);
router.get('/users/health-officials/'                    , userCtlr.getAllHealthOfficials);
router.get('/users/health-officials/:health_official_ID' , userCtlr.getOneHealthOfficial);
router.get('/users/super-admins/'                        , userCtlr.getAllSuperAdmins);
router.get('/users/super-admins/:super_admin_ID'         , userCtlr.getOneSuperAdmin);


// Export module
module.exports = router;