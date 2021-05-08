var router = require('express').Router();


/* Representative Controller */


// Index Controller
var indexController = require('../controllers/representative/index.controller');
router.get('/', indexController.render);


// Establishment Controller
var establishmentController = require('../controllers/representative/establishment.controller');
router.get('/establishment'     , establishmentController.findAll);
router.get('/establishment/:id' , establishmentController.find);


// Export module
module.exports = router;