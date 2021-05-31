/**
 * HEALTH STATUS LOG CONTROLLER
 * 
 * This controller is for health status log activities of citizens
 */

// Todo: include the properties here

const db = require("../../models");

// Create New Health Status Log
exports.create = (req, res) => {
    if (req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {
        db.Health_Status_Logs
            .create(req.body)
            .then((data) => {
                res.send(data);
            })

            .catch((err) => {
                res.status(500).send({
                    error: true,
                    message: `${ err }`
                });
            });

    }
    };

exports.findAll = (req, res) => {
    if (req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {
        db.Health_Status_Logs
            .findAll({
                where: {
                    citizen_ID: req.user.user_ID
                },

               include:{
                   model: db.Users,
                   as: "citizen",
                   attributes: {
                    exclude: [
                        'password',
                        'added_by',
                        'created_datetime',
                        'updated_datetime'
                    ]
                }
               }
            })

            .then((data) => {
                res.send({
                    error   : false,
                    data    : data,
                    message : ['[Health Status Logs] record retrieves successfully'],
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

exports.findOne = (req, res) => {
    if (req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {
        db.Health_Status_Logs
            .findOne({
                where: {
                    health_status_log_ID: req.params.health_status_log_ID
                },

               include:{
                   model: db.Users,
                   as: "citizen",
                   attributes: {
                    exclude: [
                        'password',
                        'added_by',
                        'created_datetime',
                        'updated_datetime'
                    ]
                }
               }
            })

            .then((data) => {
                res.send({
                    error   : false,
                    data    : data,
                    message : ['[Health Status Logs] record retrieves successfully'],
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


exports.update = (req, res) => {

};
