/**
 * ==================================================================
 * * LAB REPORT CONTROLLER
 * ------------------------------------------------------------------
 * This controller is for managing lab reports
 * ==================================================================
 */

// Import required packages
const db = require('../../models');
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require('../../helpers/controller.helper');

// Get one lab report
exports.getLabReport = (req, res) => {
    checkAuthorization(req, res, 'Super Admin');

    db.Lab_Reports
        .findByPk(req.params.lab_report_ID, {
            include: {
                model: db.Case_Information,
                as: 'case_information'
            }
        })
        .then(data => dataResponse(res, data, 'A lab report retrieved successfully', 'No lab report has been retrieved'))
        .catch(err => errResponse(res, err));
}