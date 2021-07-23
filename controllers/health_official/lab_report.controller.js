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
    checkAuthorization(req, res, 'Health Official');

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


// Attach Lab Report
exports.attachLabReport = (req, res) => {
    checkAuthorization(req, res, 'Health Official');

    db.Lab_Reports
        .create(req.body)
        .then(result => {
            db.Case_Information
                .update({ lab_report_ID: result.lab_report_ID }, {
                    where: {
                        case_ID: req.params.case_ID
                    }
                })
                .then(data => dataResponse(res, data, 'A lab report has been attached', 'No lab report has been attached'))
                .catch(err => errResponse(res, err));
        })
        .catch(err => errResponse(res, err))
}