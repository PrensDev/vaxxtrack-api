/**
 * INFORMATION CONTROLLER
 * 
 * This controller is for properties related to user information
 */

const db = require("../../models");
const User = db.Users;

// Get One Citizen Record
exports.getInfo = (req, res, next) => {
    if(req.user == null || req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {
        db.Users
            .findByPk(req.user.user_ID)
            .then((data) => {
                if(data) {
                    res.send({
                        error: false,
                        data: data,
                        message: 'A citizen has been identified'
                    });
                } else {
                    res.send({
                        error: true,
                        message: 'No citizen has been identified'
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

// Update a Citizen
exports.updateInfo = (req, res, next) => {
    if(req.user == null || req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {

        // Check first if user ID is existed in database
        db.Users
            .findByPk(req.user.user_ID)
            .then((result) => {
                if (result) {

                    // Update a citizen's record
                    db.Users
                        .update(req.body, {
                            where: {
                                user_ID: req.user.user_ID
                            }
                        })
                        .then(() => {

                            // Get citizen's record
                            db.Users
                                .findByPk(req.user.user_ID)
                                .then((data) => {
                                    res.send({
                                        error: false,
                                        data: data,
                                        message: 'Citizen record has been successfully updated'
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
                        message: 'No citizen has been identified'
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
}