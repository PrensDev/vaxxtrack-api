/**
 * INFORMATION CONTROLLER
 * 
 * This controller is for properties related to user information
 */


// Import required packages
const db     = require('../../models');
const helper = require('../../helpers/controller.helper');


// Return the information of the health official
exports.getInfo = (req, res, next) => {

        // Check if user logged in or logged in but not health official
        helper.checkAuthorization(req, res, 'Health Official');

        db.Users
            .findByPk(req.user.user_ID, {
                attributes: [
                    'first_name',
                    'middle_name',
                    'last_name',
                    'suffix_name',
                    'user_type'
                ]
            })   
            .then((data) => helper.dataResponse(res, data, 'A Record has been identified', 'No Record has been identified'))
            .catch((err) => helper.errResponse(res, err));
}

// Update health official information
exports.updateInfo = (req, res, next) => {

    // Check if user logged in or logged in but not health official
    helper.checkAuthorization(req, res, 'Health Official');

        // Check if user ID is existed in database
        db.Users
            .findByPk(req.user.user_ID)
            .then((result) => {

                // If no result return empty response
                if(result == null) helper.emptyDataResponse(res, 'No Record has been identified');

                // Update a health official info
                db.Users
                .update(req.body, {
                    where: {
                        user_ID: req.user.user_ID
                    }
                })
                .then(() => {

                    // Get health official info
                    db.Users
                        .findByPk(req.user.user_ID)
                        .then((data) => helper.dataResponse(res, data, 'A Record has been successfully updated', 'No changes in the record'))
                        .catch((err) => helper.errResponse(res, err));
                })
                .catch((err) => helper.errResponse(res, err));
        })
        .catch((err) => helper.errResponse(res, err));
}
