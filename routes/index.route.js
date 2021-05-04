/* Citizen Controller */

// Import required modules/packages]
var express = require('express');
var router = express.Router();


// Index Controller
var indexController = require('../controllers/main/index.controller');
router.get('/', indexController.render);


// Export module
module.exports = router;