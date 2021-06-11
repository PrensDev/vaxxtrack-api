/**
 * VACCINATION CONTROLLER
 * 
 * This controller is for managing vaccination records and apoointment of citizen
 */

// Import models and bcrypt for this controller
const db     = require("../../models");
const helper = require("../../helpers/controller.helper");


// db.Vaccination_Records Options
const dbVaccinationRecordsOp = (req) => {
    return {
        include: [
            {
                model: db.Vaccines,
                as: 'vaccine_used',
                attributes: [
                    'product_name',
                    'vaccine_name',
                    'type',
                    'manufacturer',
                    'shots_details',
                    'description'
                ]
            }
        ],
        order: [['created_datetime','DESC']]
    }
}

// Get All Vaccination Records
exports.getAllVaccRecord = (req, res) => {

    // Check authorization 
    helper.checkAuthorization(req, res, 'Citizen');

    // Find all vaccination record of citizens
    db.Vaccination_Records
        .findAll(dbVaccinationRecordsOp(req))
        .then((data) => helper.dataResponse(res, data, 'Vaccination Records retrieved successfully', 'No Vaccination Record has been identified'))
        .catch((err) => helper.errResponse(res, err));
}

// Get One Vaccination Record
exports.getOneVaccRecord = (req, res) => {

    // Check authorization 
    helper.checkAuthorization(req, res, 'Citizen');

    // Find one visiting log in an establishment establishments
    db.Vaccination_Records
        .findByPk(req.params.vaccination_record_ID, dbVaccinationRecordsOp(req))
        .then((data) => helper.dataResponse(res, data, 'A Vaccination Record has been identified', 'No Vaccination Record has been identified'))
        .catch((err) => helper.errResponse(res, err));
}
