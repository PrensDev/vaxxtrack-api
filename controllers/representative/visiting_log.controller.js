/**
 * =====================================================================
 * * VISITING LOG CONTROLLER
 * ---------------------------------------------------------------------
 * This controller is for managing visiting log activity of citizens 
 * (Representative)
 * =====================================================================
 */


// Import required packages
const db     = require('../../models');
const helper = require('../../helpers/controller.helper');
const { Op } = require('sequelize')


// db.Visiting_Logs Options
const dbVisitingLogOp = (req) => {
    return {
        where: {
            establishment_ID: req.params.establishment_ID,
        },
        include: [
            {
                model: db.Users,
                as: 'visiting_log_by',
                attributes: {
                    exclude: [
                        'password',
                        'user_type',
                        'added_by',
                        'created_datetime',
                        'updated_datetime'
                    ]
                }
            }, {
                model: db.Health_Status_Logs,
                as: "health_status_log",
            }
        ],
        order: [['created_datetime','DESC']]
    }
}


// Create New Visiting Log
exports.createVisitingLog = (req, res) => {

    // Check authorization 
    helper.checkAuthorization(req, res, 'Representative');

    const citizen_ID = req.body.citizen_ID;

    db.Users
        .findByPk(citizen_ID)
        .then(result => {
            if(result) {
                db.Health_Status_Logs
                    .findOne({
                        where: {
                            citizen_ID: citizen_ID,
                            created_datetime: {
                                [Op.gt]: new Date().setHours(0, 0, 0, 0),
                                [Op.lt]: new Date()
                            }
                        }
                    })
                    .then(data => {
                        if(data) {
                            health_status_data = {
                                health_status_log_ID: data.health_status_log_ID,
                                temperature: data.temperature
                            }
                            createVisitingLog(health_status_data);
                        } else {
                            health_status_data = {
                                health_status_log_ID: null,
                                temperature: null
                            }
                            createVisitingLog(health_status_data);
                        }
                    });
            } else {
                helper.errResponse(res, 'User cannot identified');
            } 
        
        })
        .catch(err => helper.errResponse(res, err));

    // Create Visiting Log record
    const createVisitingLog = (health_status_data) => {

        req.body.health_status_log_ID = health_status_data.health_status_log_ID;
        req.body.temperature = health_status_data.temperature;

        db.Visiting_Logs
            .create(req.body)
            .then((result) => {
                db.Visiting_Logs
                    .findByPk(result.visiting_log_ID, {
                        include : [
                            {
                                model: db.Establishments,
                                as : "visiting_log_for"
                            }, {
                                model: db.Users,
                                as : "visiting_log_by",
                                attributes: [
                                    'first_name',
                                    'middle_name',
                                    'last_name',
                                    'suffix_name'
                                ], 
                                include : [{
                                    model : db.Addresses,
                                    as : "address"
                                }]
                            }, {
                                model : db.Health_Status_Logs,
                                as : "health_status_log"
                            }],
                    })
                    .then((data) => helper.dataResponse(res, data, 'A new visiting log has been created','Error occured in creating a visiting log'))
                    .catch((err) => helper.errResponse(res, err));
            })
            .catch((err) => helper.errResponse(res, err));      
    }
} 


// Get All Visiting Logs
exports.getAllVisitingLogs = (req, res) => {

    // Check authorization 
    helper.checkAuthorization(req, res, 'Representative');

    // Find all visiting logs in an establishment establishments
    db.Visiting_Logs
        .findAll(dbVisitingLogOp(req))
        .then((data) => helper.dataResponse(res, data, 'Visiting Log Records retrieved successfully', 'No Visiting Log Record has been identified'))
        .catch((err) => helper.errResponse(res, err));
}


// Get One Visiting Log
exports.getOneVisitingLog = (req, res) => {

    // Check authorization 
    helper.checkAuthorization(req, res, 'Representative');

    // Find one visiting log in an establishment establishments
    db.Visiting_Logs
        .findByPk(req.params.visiting_log_ID, dbVisitingLogOp(req))
        .then((data) => helper.dataResponse(res, data, 'A Visiting Log has been identified', 'No Visiting Log has been identified'))
        .catch((err) => helper.errResponse(res, err));
}