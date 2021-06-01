var router = require('express').Router();


/* Super Admin Controller */
var vaccineController = require('../controllers/super_admin/vaccine.controller');
router.get('/vaccines', vaccineController.getAllVaccines);
router.get('/vaccines/:vaccine_ID', vaccineController.getOneVaccine);
router.put('/update-vaccine/:vaccine_ID', vaccineController.updateVaccine);


// Export module
module.exports = router;