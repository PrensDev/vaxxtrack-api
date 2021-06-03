// Import necessary packages
const db     = require('../../models');
const helper = require('../../helpers/controller.helper');


// Get All Vaccines
exports.getAllVaccines = (req, res) => {

    // Check authorization first
    helper.checkAuthorization(req, res, 'Super Admin');

    db.Vaccines
        .findAll()
        .then((data) => helper.dataResponse(res, data, 'Vaccines have been successfully retrieved!', 'No vaccine has been identified'))
        .catch((err) => helper.errResponse(res, err));
}


// Get One Vaccine
exports.getOneVaccine = (req, res) => {

    // Check authorization first
    helper.checkAuthorization(req, res, 'Super Admin');

    db.Vaccines
        .findByPk(req.params.vaccine_ID)
        .then((data) => helper.dataResponse(res, data, 'A vaccine has been identified', 'No vaccine has been identified'))
        .catch((err) => helper.errResponse(res, err));
}


// Update a Vaccine
exports.updateVaccine = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Super Admin');

    // Check first if vaccine ID is existed in database
    db.Vaccines
        .findByPk(req.params.vaccine_ID)
        .then((result) => {

            // If no result return empty response
            if(result == null) helper.emptyDataResponse(res, 'No vaccine has been identified');

            // Update a vaccine info
            db.Vaccines
                .update(req.body, {
                    where: {
                        vaccine_ID: req.params.vaccine_ID
                    }
                })
                .then(() => {

                    // Get vaccine info after update
                    db.Vaccines
                        .findByPk(req.params.vaccine_ID)
                        .then((data) => helper.dataResponse(res, data, 'A vaccine has been successfully updated', 'No vaccine has been identified'))
                        .catch((err) => helper.errResponse(res, err));
                })
                .catch((err) => helper.errResponse(res, err));
        })
        .catch((err) => helper.errResponse(res, err));
}