/**
 * =====================================================================
 * * COVID-19 CASES CONTROLLER
 * ---------------------------------------------------------------------
 * This controller is for managing account settings of super admin
 * =====================================================================
 */

// Import required packages/libraries
const { errResponse, checkAuthorization, dataResponse } = require('../../helpers/controller.helper');
const db = require('../../models');


// Get All COVID-19 Cases
exports.getAllCovidCases = (req, res) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Super Admin');

    db.Case_Information
        .findAll()
        .then(data => dataResponse(res, data, 'COVID-19 cases records are retrieved successfully', 'No record of COVID-19 cases has been retrieved'))
        .catch(err => errResponse(res, err))
}
