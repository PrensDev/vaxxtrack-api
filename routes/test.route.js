var router = require('express').Router();

// Test Controller
var testController = require('../controllers/test.controller');
router.get('/', testController.test);
router.get('/populate', testController.populate);
router.get('/generate-vaccine-data', testController.generateVaccineData);

// Export module
module.exports = router;