/**
 * VACCINATION CONTROLLER
 * 
 * This controller is for properties related to vaccination
 */


// Import models
const db = require('../../models');
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require("../../helpers/controller.helper");


// Get Cases
exports.getAllCovidCases = (req, res) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Health Official');

    db.Case_Information
        .findAll({
            include: [{
                model: db.Users,
                as: 'patient',
                include: [{
                    model: db.Addresses,
                    as: 'address'
                }]
            }]
        })
        .then(data => dataResponse(res, data, 'COVID-19 cases records are retrieved successfully', 'No record of COVID-19 Cases has been retrieved'))
        .catch(err => errResponse(res, err))
}

// Get Cases
exports.getOneCovidCase = (req, res) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Health Official');

    db.Case_Information
        .findByPk(req.params.case_ID, {
            include: [{
                model: db.Users,
                as: 'patient',
                include: [{
                    model: db.Addresses,
                    as: 'address'
                }]
            }]
        })
        .then(data => dataResponse(res, data, 'COVID-19 cases records are retrieved successfully', 'No record of COVID-19 Cases has been retrieved'))
        .catch(err => errResponse(res, err))
}