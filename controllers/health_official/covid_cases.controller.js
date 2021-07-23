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
exports.addCovidCase = (req, res) => {

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

// Update Case
exports.updateCovidCase = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Health Official');

    db.Case_Information
        .update(req.body, { where: { case_ID: req.params.case_ID }})
        .then(data => dataResponse(res, data, 'A Case Record has been updated', 'No case record has been updated'))
        .catch(err => errResponse(res, err));
}

// Remove Case
exports.deleteCovidCase = (req, res) => {
    checkAuthorization(req, res, 'Health Official')

    db.Case_Information
        .destroy({ where: { case_ID: req.params.case_ID }})
        .then(() => emptyDataResponse(res, 'A Case Record has been deleted'))
        .catch(err => errResponse(res, err))
}

// Get Heatmap Coordinates
exports.getCasesCoordinates = (req, res) => {
    checkAuthorization(req, res, 'Health Official')

    db.Case_Information
        .findAll({
            include: [
                {
                    model: db.Users,
                    as: 'patient',
                    attributes: ['address_ID'],
                    include: [
                        {
                            model: db.Addresses,
                            as: 'address',
                            attributes: ['latitude', 'longitude']
                        }
                    ]
                }
            ]
        })
        .then(data => {
            var heatmapCoordinates = [];
            data.forEach(d => {
                const a = d.patient.address;
                const latlng = { lat: a.latitude, lng: a.longitude, count: 1 }
                heatmapCoordinates.push(latlng)
            });
            dataResponse(res, heatmapCoordinates, 'COVID-19 Cases Coordinates retrieved successfully')
        })
        .catch(err => errResponse(res, err));
}