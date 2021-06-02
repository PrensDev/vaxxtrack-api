/**
 * INFORMATION CONTROLLER
 * 
 * This controller is for properties related to user information
 */


// Import models
const db = require("../../models");


// Return the information of the representative
exports.getInfo = (req, res, next) => {

    // Check if user logged in or logged in but not Representative
    if(req.user == null || req.user.user_type !== 'Representative') {
        res.sendStatus(403);
    } else {
        db.Users
            .findByPk(req.user.user_ID)
            .then((data) => {
                if(data) {
                    res.send({
                        error: false,
                        data: data,
                        message: 'Representative record retrieves successfully'
                    });
                } else {
                    res.send({
                        error: true,
                        message: 'There is no representative record retrieved'
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}


// Update Representative Information
exports.updateInfo = (req, res, next) => {

    // Check if user logged in or logged in but not Representative
    if(req.user == null || req.user.user_type !== 'Representative') {
        res.sendStatus(403);
    } else {

        // Check if user ID is existed in database
        db.Users
            .findByPk(req.user.user_ID)
            .then((result) => {
                if (result) {

                    // Update a representative info
                    db.Users
                        .update(req.body, {
                            where: {
                                user_ID: req.user.user_ID
                            }
                        })
                        .then(() => {

                            // Get representative info
                            db.Users
                                .findByPk(req.user.user_ID)
                                .then((data) => {
                                    res.send({
                                        error: false,
                                        data: data,
                                        message: 'A record has been successfully updated'
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
                        message: 'No representative records has been identified'
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
}