var router = require('express').Router();

// Test Controller
var testController = require('../controllers/test.controller');
router.get('/', testController.test);

// Export module
module.exports = router;