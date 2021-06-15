/**
 * INFORMATION CONTROLLER
 * 
 * This controller is for properties related to user information
 */


// Import required packages
const db     = require('../../models');



// Get Health official Info
exports.getInfo = (req, res, next) => {
    if(req.user == null || req.user.user_type !== 'Health Official') {
        res.sendStatus(403);
    } else {
        db.Users
            .findByPk(req.user.user_ID,{
                attributes: [
                    'first_name',
                    'middle_name',
                    'last_name',
                    'suffix_name',
                    'user_type'
                ]
            })
            .then((data) => {
                if(data) {
                    res.send({
                        error: false,
                        data: data,
                        message: 'A health official has been identified'
                    });
                } else {
                    res.send({
                        error: true,
                        message: 'No health official has been identified'
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

// Update Citizen Info
exports.updateInfo = (req, res, next) => {

    // Check if user logged in or logged in but not Health official
    if(req.user == null || req.user.user_type !== 'Health Official') {
        res.sendStatus(403);
    } else {

        // Check first if user ID is existed in database
        db.Users
            .findByPk(req.user.user_ID)
            .then((result) => {
                if (result) {

                    // Update a health official's record
                    db.Users
                        .update(req.body, {
                            where: {
                                user_ID: req.user.user_ID
                            }
                        })
                        .then(() => {

                            // Get health official's record
                            db.Users
                                .findByPk(req.user.user_ID)
                                .then((data) => {
                                    res.send({
                                        error: false,
                                        data: data,
                                        message: 'Health official record has been successfully updated'
                                    })
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    
                } else {
                    res.send({
                        error: true,
                        message: 'No health official has been identified'
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
}