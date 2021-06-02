/**
 * HEALTH STATUS LOG CONTROLLER
 * 
 * This controller is for health status log activities of citizens
 */


// Import models
const db = require("../../models");


// Create New Health Status Log
exports.createHealthStatusLog = (req, res) => {
    if (req.user = null || req.user.user_type !== 'Citizen') {
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


// Get All Health Status Logs
exports.getAllHealthStatusLogs = (req, res) => {
    if (req.user = null || req.user.user_type !== 'Citizen') {
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

// Get One Health Status Log
exports.getOneHealthStatusLog = (req, res) => {
    if (req.user == null || req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {
        db.Health_Status_Logs
            .findOne({
                where: {
                    health_status_log_ID: req.params.health_status_log_ID
                },
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


exports.updateHealthStatusLog = (req, res) => {
    // TODO: Please insert methods here
};
