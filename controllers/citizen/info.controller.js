/**
 * INFORMATION CONTROLLER
 * 
 * This controller is for properties related to user information
 */

const db = require("../../models");
const User = db.Users;


// Get All Citizens
exports.getAllCitizens = (req, res, next) => {
    if(req.user == null || req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {
        db.Users.findAll()
            .then((data) => {
                res.send({
                    error: false,
                    data: data,
                    message: 'Citizens record had been successfully retrieved'
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

// Get One Citizen Record
exports.getOneCitizen = (req, res, next) => {
    if(req.user == null || req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {
        db.Users
            .findByPk(req.user.users_ID)
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
exports.updateCitizen = (req, res, next) => {
    if(req.user == null || req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {

        // Check first if user ID is existed in database
        db.Vaccines
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