/**
 * =====================================================================
 * * HEALTH STATUS LOG CONTROLLER
 * ---------------------------------------------------------------------
 * This controller is for health status log activities of citizens
 * =====================================================================
 */


// Import models
const db = require("../../models");
const { dataResponse, errResponse, checkAuthorization, emptyDataResponse } = require("../../helpers/controller.helper");
const { Op } = require('sequelize');


// Check todays Health Status Log
exports.checkTodaysHealthStatus = (req, res) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Citizen');

    db.Health_Status_Logs
        .findAll({
            where: {
                citizen_ID: req.user.user_ID,
                created_datetime: {
                    [Op.gt]: new Date().setHours(0, 0, 0, 0),
                    [Op.lt]: new Date()
                }
            }
        })
        .then(data => dataResponse(res, data, 'Health Status Log for today is Retrieved', 'No health status log for today is retrieved'))
        .catch(err => errResponse(res, err));
}


// Create New Health Status Log
exports.createHealthStatusLog = (req, res) => {
    
    // Check Authorization first
    checkAuthorization(req, res, 'Citizen');

    req.body.citizen_ID = req.user.user_ID;

    // If temperature is 37.5 above, fever is always set true
    // Regardless if user unchecked the fever
    if(req.body.temperature >= 37.5) req.body.fever = true

    db.Health_Status_Logs
        .create(req.body)
        .then((data) => dataResponse(res, data, 'Health Status has been logged successfully', 'Failed to logged a health status'))
        .catch((err) => errResponse(res, err)); 
};

// Get Health Status Log Today
exports.getHealthStatusLogToday = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Citizen');

    db.Health_Status_Logs
        .findOne({
            where: {
                citizen_ID: req.user.user_ID,
                created_datetime: {
                    [Op.gt]: new Date().setHours(0, 0, 0, 0),
                    [Op.lt]: new Date()
                }
            }
        })
        .then(data => dataResponse(res, data, 'Health Status Log for today is identified', 'No health status log for today is identified'))
        .catch(err => errResponse(res, err));
}

// Create Current Health Status Log
exports.updateHealthStatusLogForToday = (req, res) => {
    
    // Check Authorization first
    checkAuthorization(req, res, 'Citizen');

    req.body.citizen_ID = req.user.user_ID;

    // If temperature is 37.5 above, fever is always set true
    // Regardless if user unchecked the fever
    if(req.body.temperature >= 37.5) req.body.fever = true

    db.Health_Status_Logs
        .update(req.body, {
            where: {
                health_status_log_ID: req.body.health_status_log_ID
            }
        })
        .then(data => dataResponse(res, data, 'Health Status has been logged successfully', 'Failed to logged a health status'))
        .catch(err => errResponse(res, err)); 
};


// Health Status Log Options
const healthStatusLogOp = (req) => {
    return {
        include: {
            model: db.Users,
            as: "citizen",
            where: { user_ID: req.user.user_ID },
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
        }
    }
}


// Get All Health Status Logs
exports.getAllHealthStatusLogs = (req, res) => {
    
    // Check Authorization first
    checkAuthorization(req, res, 'Citizen');

    db.Health_Status_Logs
        .findAll(healthStatusLogOp(req))
        .then(data => dataResponse(res, data, 'Health Status Logs retrieved successfully', 'No Health Status Logs have been retrieved'))
        .catch(err => errResponse(res, err)); 
};


// Get One Health Status Log
exports.getOneHealthStatusLog = (req, res) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Citizen');

    db.Health_Status_Logs
        .findByPk(req.params.health_status_log_ID, healthStatusLogOp(req))
        .then(data => dataResponse(res, data, 'A health status log has been identified', 'A health status log has been not identified'))
        .catch(err => errResponse(res, err));
};