/**
 * VISITING LOG CONTROLLER
 * 
 * This controller is for visiting log activity of citizen (Representative)
 */

 const db = require("../../models");

// Create New Visiting Log
exports.create = (req, res) => {
    if (req.user.user_type !== 'Representative') {
        res.sendStatus(403);
    } else {
        db.Visiting_Logs
            .create({
                citizen_ID: req.body.citizen_ID,
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
                            as : "visiting_log_for"
                        }, {
                            model: db.Users,
                            as : "visiting_log_by",
                            include : [{
                                model : db.Addresses,
                                as : "address"
                            }]
                        }, {
                            model : db.Health_Status_Logs,
                            as : "health_status_log"
                        }]
                    })
                    .then((result) => {
                    res.send({
                            err     : false,
                            data    : result,
                            msg     : 'New Visiting Log created.'
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
exports.findAll = (req, res, next) => {
    if (req.user.user_type !== 'Representative') {
        res.sendStatus(403);
    } else {
        db.Visiting_Logs
            .findAll(
                {
                    where: {
                        establishment_ID: req.params.establishment_ID,
                    },
                    include: [{
                        model: db.Users,
                        as: 'visiting_log_by',
                        attributes: {
                            exclude: [
                                'user_ID',
                                'sex',
                                'birth_date',
                                'civil_status',
                                'address_ID',
                                'added_by',
                                'user_type',
                                'password',
                                'created_datetime',
                                'updated_datetime'
                            ]
                        }
                    }, {
                        model: db.Health_Status_Logs,
                        as: "health_status_log",
                        attributes: {
                            exclude: [
                                'user_ID',
                                'sex',
                                'birth_date',
                                'civil_status',
                                'address_ID',
                                'added_by',
                                'user_type',
                                'password',
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
exports.findOne = (req, res, next) => {
    if(req.user.user_type !== 'Representative') {
        res.sendStatus(403);
    } else {
        db.Visiting_Logs
            .findOne({
                where: {
                    establishment_ID: req.params.establishment_ID,
                    visiting_log_ID: req.params.visiting_log_ID,
                },
                include: [
                    {
                        model: db.Users,
                        as: 'visiting_log_by',
                        attributes: {
                            exclude: [
                                'user_ID',
                                'sex',
                                'birth_date',
                                'civil_status',
                                'address_ID',
                                'added_by',
                                'user_type',
                                'password',
                                'created_datetime',
                                'updated_datetime'
                            ]
                        }
                    },
                ],
            })
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