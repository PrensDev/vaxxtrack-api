/**
 * VISITING LOG CONTROLLER
 * 
 * This controller is for visiting log activity of citizen
 */
const db = require("../../models");

//Create Visiting Logs
exports.create = async (req, res) => {
    if(req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {
        db.Visiting_Logs
            .create(
                {
                    citizen_ID: req.user.user_ID,
                    establishment_ID: req.body.establishment_ID,
                    temperature: req.body.temperature,
                    health_status_log_ID: req.body.health_status_log_ID,
                    purpose: req.body.purpose
                }
            ).then((data) => {
                db.Establishments.findByPk(data.id, { include: ["visiting_logs"] }).then((data) => {
                    res.send({
                        error   : false,
                        data    : data,
                        message : ['[Visiting Logs] record successfully'],
                    });
                })
            })
            .catch((err) => {
                res.status(500).send({
                    error   : true,
                    message : err.errors.map((e) => e.message),
                });
            });
    }

};

//View All
exports.findAll = (req, res, next) => {
    if(req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {
        db.Visiting_Logs
            .findAll({
                include: [
                    {
                        model: db.Users,
                        as: 'establishments_with_vlogs',
                    },
                ],
            })
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

//View One
exports.findOne = (req, res, next) => {
    if(req.user.user_type !== 'Citizen') {
        res.sendStatus(403);
    } else {
        db.Visiting_Logs
            .findOne({
                where: {
                    visiting_log_ID: req.params.id,
                },
                include: [
                    {
                        model: db.Users,
                        as: 'establishments_with_vlogs',
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