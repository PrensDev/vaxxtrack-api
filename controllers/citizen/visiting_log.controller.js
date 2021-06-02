/**
 * VISITING LOG CONTROLLER
 * 
 * This controller is for visiting log activity of citizen
 */
const db = require("../../models");

// Create New Visiting Log
exports.createVisitingLog = (req, res) => {
    if (req.user == null || req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {
        db.Visiting_Logs
            .create({
                citizen_ID: req.user.user_ID,
                establishment_ID: req.body.establishment_ID,
                temperature: req.body.temperature,
                health_status_log_ID: req.body.health_status_log_ID,
                purpose: req.body.purpose
            })
            .then((data) => {
                db.Visiting_Logs
                    .findByPk(data.visiting_log_ID, {
                        include : [{
                            model: db.Establishments,
                            as : "visiting_log_for",
                            include : [{
                                model : db.Addresses,
                                as : "address"
                            }]
                        }, {
                            model: db.Health_Status_Logs,
                            as : "health_status_log"
                        }]
                    })
                    .then((result) => { 
                        res.send({
                            err     : false,
                            data    : result,
                            msg     : 'A new Visiting Logs has been created!'
                        })
                    })
                    .catch((err) => {
                        res.status(500).send({
                            error   : true,
                            data    : [],
                            message : ['Opps! Error caught!', `${ err }`],
                        });
                    });
            })
            .catch((err) => {
                res.status(500).send({
                    error: true,
                    message: `${ err }`
                });
            });
    }

};

// Find All Visiting Logs
exports.getAllVisitingLogs = (req, res, next) => {
    if (req.user == null || req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {
        db.Visiting_Logs
            .findAll(
                {
                    where: {
                        citizen_ID: req.user.user_ID
                    },
                    include: [{
                        model: db.Users,
                        as: 'visiting_log_by',
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
                        }
                    }],
                }
            )
            .then((data) => {
                res.send({
                    error   : false,
                    data    : data,
                    message : ['[Visiting Logs] record retrieves successfully'],
                });
            })
            .catch((err) => {
                res.status(500).send({
                    error   : true,
                    message : ['Oops! Error caught!', `${ err }`],
                });
            });
    }
};

// Get One Visiting Log
exports.getOneVisitingLog = (req, res, next) => {
    if(req.user == null || req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {
        db.Visiting_Logs
            .findByPk(
                req.params.visiting_log_ID, {
                    include : [
                        {
                            model: db.Users,
                            as: 'visiting_log_by',
                            where: {
                                user_ID : req.user.user_ID
                            },
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
                        },
                    ],
                }
            )
            // .findOne({
            //     where: {
            //         visiting_log_ID: req.params.visiting_log_ID,
            //     },
            //     include: [
            //         {
            //             model: db.Users,
            //             as: 'visiting_log_by',
            //             attributes: {
            //                 exclude: [
            //                     'sex',
            //                     'birth_date',
            //                     'civil_status',
            //                     'address_ID',
            //                     'user_type',
            //                     'password',
            //                     'added_by',
            //                     'created_datetime',
            //                     'updated_datetime'
            //                 ]
            //             },
            //         },
            //     ],
            // })
            .then((data) => {
                if(data) {
                    res.send({
                        error   : false,
                        data    : data,
                        message : ['An Visiting Logs is identified'],
                    });
                } else {
                    res.status(404).send({
                        error   : true,
                        message : 'Visiting Logs not found',
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
};