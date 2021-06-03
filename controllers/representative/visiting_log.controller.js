/**
 * VISITING LOG CONTROLLER
 * 
 * This controller is for visiting log activity of citizen (Representative)
 */


// Import required packages
const db     = require("../../models");
const helper = require("../../helpers/controller.helper");


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
                attributes: [
                    'first_name',
                    'middle_name',
                    'last_name',
                    'suffix_name'
                ]
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

    // Create Visiting Log record
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