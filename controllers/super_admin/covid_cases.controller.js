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

// Get Heatmap Coordinates
exports.getCasesCoordinates = (req, res) => {
    checkAuthorization(req, res, 'Super Admin')

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

// Get One Case
exports.getOneCovidCase = (req, res) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Super Admin');

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
