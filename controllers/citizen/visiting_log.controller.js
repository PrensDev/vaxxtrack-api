/**
 * VISITING LOG CONTROLLER
 * 
 * This controller is for visiting log activity of citizen
 */
const db = require("../../models");

// Create New Visiting Log
exports.create = (req, res) => {
    if (req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {
        db.Visiting_Logs
            .create({
                citizen_ID: req.user.user_ID,
                establishment_ID: req.body.establishment_ID,
                temperature: 36.1,
                health_status_log_ID: req.body.health_status_log_ID,
                purpose: 'Employee'
            })
            .then((data) => {
                res.send({
                    error: false,
                    data: data,
                    message: 'A visiting log has been successfuly recorded'
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
    if (req.user.user_type !== 'Citizen') {
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
exports.findOne = (req, res, next) => {
    if(req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {
        db.Visiting_Logs
            .findOne({
                where: {
                    visiting_log_ID: req.params.visiting_log_ID,
                },
                include: [
                    {
                        model: db.Users,
                        as: 'visiting_log_by',
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