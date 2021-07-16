/**
 * =====================================================================
 * * VISITING LOG CONTROLLER
 * ---------------------------------------------------------------------
 * This controller is for visiting log activity of citizen
 * =====================================================================
 */

// Import Required Packages
const db = require("../../models");
const { checkAuthorization, dataResponse, errResponse } = require("../../helpers/controller.helper");


// Create New Visiting Log
exports.createVisitingLog = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Citizen');

    const establishmentID = req.body.establishment_ID;

    db.Establishments
        .findByPk(establishmentID)
        .then(result => {
            if(result == null) return errResponse(res, err);
            
            db.Visiting_Logs
                .create({
                    citizen_ID: req.user.user_ID,
                    establishment_ID: establishmentID,
                    temperature: req.body.temperature,
                    health_status_log_ID: req.body.health_status_log_ID,
                    purpose: req.body.purpose
                })
                .then((data) => {
                    db.Visiting_Logs
                        .findByPk(data.visiting_log_ID, {
                            include : [
                                {
                                    model: db.Establishments,
                                    as : "visiting_log_for",
                                    include : [{
                                        model : db.Addresses,
                                        as : "address"
                                    }]
                                }, {
                                    model: db.Health_Status_Logs,
                                    as : "health_status_log"
                                }
                            ]
                        })
                        .then((result) => dataResponse(res, result, 'A new Visiting Logs has been created!', 'Error occured when creating a visiting log'))
                        .catch((err) => errResponse(res, err));
                })
                .catch((err) => errResponse(res, err));  
        })
        .catch(err => errResponse(res, err));

};


// Visiting Logs Options
const dbVisitingLogsOp = (user_ID) => {
    return {
        include: [
            {
                model: db.Users,    
                as: 'visiting_log_by',
                where: { user_ID: user_ID },
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
                include: [{
                    model: db.Health_Status_Logs,
                    as: 'health_status_logs'
                }]
            }, {
                model: db.Establishments,
                as: 'visiting_log_for',
                include: [{
                    model: db.Addresses,
                    as: 'address'
                }]
            }
        ],
    }
}


// Find All Visiting Logs
exports.getAllVisitingLogs = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Citizen');

    db.Visiting_Logs
        .findAll(dbVisitingLogsOp(req.user.user_ID))
        .then(data => dataResponse(res, data, 'Visiting Logs retrieved successfully', 'No visiting logs has been retrieved'))
        .catch(err => errResponse(res, err)); 
};


// Get One Visiting Log
exports.getOneVisitingLog = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Citizen');

    db.Visiting_Logs
        .findByPk(req.params.visiting_log_ID, dbVisitingLogsOp(req.user.user_ID))
        .then(data => dataResponse(res, data, 'A Visiting Log has been identified', 'A Visiting Log cannot identified'))
        .catch(err => errResponse(res, err)); 
};