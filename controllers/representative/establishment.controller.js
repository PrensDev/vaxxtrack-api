/**
 * ESTABLISHMENT CONTROLLER
 * 
 * This controller is for establishment management of representatives
 */

const db = require("../../models");


// Find all establishments
exports.findAll = (req, res, next) => {
    
    // Check if user logged in was representative
    if(req.user.user_type !== 'Representative') {
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
                        attributes : {
                            exclude: [
                                'sex',
                                'birth_date',
                                'civil_status',
                                'address_ID',
                                'user_type',
                                'password',
                                'added_by',
                                'created_datetime',
                                'updated_datetime'
                            ]
                        },
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
                    message : ['[establishments] record retrieves successfully'],
                });
            })
            .catch((err) => {
                res.status(500).send({
                    error   : false,
                    message : ['Oops! Error caught!', `${ err }`],
                });
            });
    }
}


// Find an establishment
exports.find = (req, res, next) => {
    
    // Check if user logged in is a representative
    if(req.user.user_type !== 'Representative') {
        res.sendStatus(403);
    } else {
        const establishment_ID = req.params.establishment_ID;
        
        // Check parameter 'establishment_ID' if null 
        if (establishment_ID == null) {
            res.status(500).send({
                error: true,
                message: 'Parameter [establishment_ID] is required'
            })
        } else {

            // Find establishment by its ID
            db.Establishments
                .findOne({
                    where: {
                        establishment_ID: establishment_ID,
                    },
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
                            attributes: {
                                exclude: [
                                    'sex',
                                    'birth_date',
                                    'civil_status',
                                    'address_ID',
                                    'user_type',
                                    'password',
                                    'added_by',
                                    'created_datetime',
                                    'updated_datetime'
                                ]
                            },
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
                        res.status(404).send({
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
}


// Update an establishment
exports.update = (req, res, next) => {
    if(req.user.user_type !== 'Representative') {
        res.sendStatus(403);
    } else {
        const establishment_ID = req.params.establishment_ID;
        if(establishment_ID == null) {
            res.status(500).send({
                error   : true,
                message : 'Parameter [establishment_ID] is required',
            });
        } else {
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
        }
    }
}