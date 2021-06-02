var router = require('express').Router();

/**
 * TEST CONTROLLER
 * 
 * This will be removed before production
*/

// Test Controller
var testCtlr = require('../controllers/test.controller');
router.get('/'                      , testCtlr.test);
router.get('/populate'              , testCtlr.populate);
router.get('/populate2'             , testCtlr.populate2);
router.get('/generate-vaccine-data' , testCtlr.generateVaccineData);


// Export module
module.exports = router;