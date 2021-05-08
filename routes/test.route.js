var router = require('express').Router();

// Test Controller
var testController = require('../controllers/main/test.controller');

// Find All Users
router.get('/users', testController.findAllUsers);

// Find One User
router.get('/users/:id', testController.findOneUser);

// Find All Representatives
router.get('/representatives', testController.findAllRepresentatives);

// Export module
module.exports = router;