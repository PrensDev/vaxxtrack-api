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

// Get One Case
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


// Add Case
exports.addCase = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Health Official');

    db.Case_Information
        .create(req.body)
        .then(caseInfo => {

            // Find the patients information
            const citizen_ID = caseInfo.citizen_ID;
            db.Users
                .findByPk(citizen_ID, {
                    include: [
                        // Get the address of patient for contact tracing
                        {
                            model: db.Addresses,
                            as: 'address'
                        },
                    ]
                })
                .then(patientInfo => {

                    // Return patient details
                    const patientDetails = {
                        caseInfo: caseInfo,
                        patientInfo: patientInfo
                    }
                    dataResponse(res, patientDetails, 'A new case has been added', 'No case has been added')
                })
                .catch(err => errResponse(res, err))
        })
        .catch(err => errResponse(res, err));
}