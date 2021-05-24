var router = require('express').Router();


/* Citizen Controller */


// Index Controller
var indexController = require('../controllers/citizen/index.controller');
router.get('/', indexController.render);


// Export module
module.exports = router;