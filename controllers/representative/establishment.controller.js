/**
 * ESTABLISHMENT CONTROLLER
 * 
 * This controller is for establishment management of representatives
 */

const db = require("../../models");


// Find all establishments
exports.getAllEstablishments = (req, res, next) => {
    
    // Check if user logged in or logged in but not representative
    if(req.user == null || req.user.user_type !== 'Representative') {

        // Send Forbidden response
        res.sendStatus(403);

    } else {

        // Find all representative establishments
        db.Establishments
            .findAll({
                include: [
                    {
                        model: db.Addresses,
                        as: 'address',
                        attributes: {
                            exclude: [
                                'created_datetime'
                            ]
                        }
                    }, {
                        model: db.Users,
                        as: 'role_by',
                        attributes: ['user_ID'],
                        where: {
                            user_ID: req.user.user_ID
                        }
                    }
                ],
            })
            .then((data) => {
                res.send({
                    error   : false,
                    data    : data,
                    message : 'Establisjements retrieves successfully',
                });
            })
            .catch((err) => {
                res.status(500).send({
                    error   : true,
                    message : ['Oops! Error caught!', `${ err }`],
                });
            });
    }
}


// Find an establishment
exports.getOneEstablishment = (req, res, next) => {
    
    // Check if user logged or logged in but not representative
    if(req.user == null || req.user.user_type !== 'Representative') {
        res.sendStatus(403);
    } else {

        // Find establishment by its establishment_ID parameter
        db.Establishments
            .findByPk(req.params.establishment_ID, {
                include: [
                    {
                        model: db.Addresses,
                        as: 'address',
                        attributes: {
                            exclude: [
                                'created_datetime'
                            ]
                        }
                    }, {
                        model: db.Users,
                        as: 'role_by',
                        attributes: ['user_ID'],
                        where: {
                            user_ID: req.user.user_ID
                        }
                    }
                ]
            })
            .then((data) => {
                if(data) {
                    res.send({
                        error   : false,
                        data    : data,
                        message : 'An establishment has been identified',
                    });
                } else {
                    res.status(500).send({
                        error   : true,
                        message : 'Establishment not found',
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    error   : true,
                    message : ['Oops! Error caught!', `${ err }`],
                });
            })
    }
}


// Update an establishment
exports.updateEstablishment = (req, res, next) => {
    if(req.user == null || req.user.user_type !== 'Representative') {
        res.sendStatus(403);
    } else {
        const establishment_ID = req.params.establishment_ID;

        if(establishment_ID == null) {
            res.status(500).send({
                error   : true,
                message : 'Parameter [establishment_ID] is required',
            });
        } else {

            // Check if establishment was existed and roled by logged in representative
            db.Establishments
                .findByPk(establishment_ID, {
                    include: {
                        model: db.Users,
                        as: 'role_by',
                        where: {
                            user_ID: req.user.user_ID
                        }
                    }
                })
                .then((result) => {

                    // If has result then update
                    if(result) {
                        db.Establishments
                            .update(req.body, {
                                where: {
                                    establishment_ID: establishment_ID
                                },
                                include: [{
                                    model: db.Addresses,
                                    as: 'address'
                                }]
                            })
                            .then((result) => {

                                // If successfully updated
                                if(result) {
                                    db.Establishments
                                        .findByPk(establishment_ID, {
                                            include: {
                                                model   : db.Addresses,
                                                as      : 'address'
                                            }
                                        })
                                        .then((data) => {
                                            res.send({
                                                error   : false,
                                                data    : data,
                                                message : 'An establishment has been updated'
                                            })
                                        })
                                        .catch((err) => {
                                            res.status(500).send({
                                                error   : true,
                                                message : ['Oops! Error caught!', `${ err }`],
                                            });
                                        });
                                } else {

                                    // If not successfully updated
                                    res.status(500).send({
                                        error   : true,
                                        message : 'There was an error in updating an establishment',
                                    });
                                }
                            })
                            .catch((err) => {
                                res.status(500).send({
                                    error   : true,
                                    message : ['Oops! Error caught!', `${ err }`],
                                });
                            });
                    } else {
                        
                        // If no result, return error response
                        res.status(500).send({
                            error: true,
                            message: 'Establishment was not found'
                        })
                    }
                })
        }
    }
}