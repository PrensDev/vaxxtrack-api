/**
 * =====================================================================
 * * INFORMATION CONTROLLER
 * ---------------------------------------------------------------------
 * This controller is for properties related to user information
 * =====================================================================
 */


// Import models
const db = require("../../models");
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require("../../helpers/controller.helper");


// Return the information of the representative
exports.getInfo = (req, res, next) => {

    // Check if user logged in or logged in but not Representative
    checkAuthorization(req, res, 'Representative');

    db.Users
        .findByPk(req.user.user_ID)
        .then((data) => dataResponse(res, data, 'A Record has been identified', 'No Record has been identified'))
        .catch((err) => errResponse(res, err));
}


// Update Representative Information
exports.updateInfo = (req, res, next) => {

    // Check if user logged in or logged in but not Representative
    checkAuthorization(req, res, 'Representative');

    // Check if user ID is existed in database
    db.Users
        .findByPk(req.user.user_ID)
        .then((result) => {

            // If no result return empty response
            if(result == null) return emptyDataResponse(res, 'No Record has been identified');

            // Update a representative info
            db.Users
                .update(req.body, { where: { user_ID: req.user.user_ID }})
                .then(() => {

                    // Get representative info
                    db.Users
                        .findByPk(req.user.user_ID)
                        .then((data) => dataResponse(res, data, 'A Record has been successfully updated', 'No changes in the record'))
                        .catch((err) => errResponse(res, err));
                })
                .catch((err) => errResponse(res, err));
    })
    .catch((err) => errResponse(res, err));
}

