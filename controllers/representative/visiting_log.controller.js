/**
 * VISITING LOG CONTROLLER
 * 
 * This controller is for visiting log activity of citizen (Representative)
 */

const db = require("../../models");
const helper = require("../../helpers/controller.helper");

// db.Visiting Logs options
const dbVisitingLogOp = (req) => {
    return {
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
}

// Create New Visiting Log
exports.createVisitingLog = (req, res) => {

    // Check authorization 
    helper.checkAuthorization(req, res, 'Representative');

    // Create Visiting Log record
    db.Visiting_Logs
            .create(req.body)
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
                        msg     : 'A new visiting log has been created.'
                    })
                })
                .catch((err) => helper.errResponse(res, err));
        })
        .catch((err) => helper.errResponse(res, err));
                
        
}    
// Find All Visiting Logs
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