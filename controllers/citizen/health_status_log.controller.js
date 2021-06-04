/**
 * HEALTH STATUS LOG CONTROLLER
 * 
 * This controller is for health status log activities of citizens
 */


// Import models
const db = require("../../models");
const helper = require("../../helpers/controller.helper");


// Create New Health Status Log
exports.createHealthStatusLog = (req, res) => {
    

    helper.checkAuthorization(req, res, 'Citizen');

        db.Health_Status_Logs
            .create(req.body)
            .then((data) => helper.dataResponse(res, data, 'Health status Logs record has been created successfully', 'Health status Logs record cannot created'))
            .catch((err) => helper.errResponse(res, err)); 
};


// Get All Health Status Logs
exports.getAllHealthStatusLogs = (req, res) => {
    
    helper.checkAuthorization(req, res, 'Citizen');

        db.Health_Status_Logs
            .findAll({
                
               include:{
                    model: db.Users,
                    as: "citizen",
                    where: {
                    user_ID: req.user.user_ID
                    },
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
            })

            .then((data) => helper.dataResponse(res, data, '[Health status Logs] record retrieve successfully', '[Health status Logs] cannot retrieve records'))
            .catch((err) => helper.errResponse(res, err)); 
};

// Get One Health Status Log
exports.getOneHealthStatusLog = (req, res) => {
    
    helper.checkAuthorization(req, res, 'Citizen');

        db.Health_Status_Logs
            .findByPk(
                req.params.health_status_log_ID,{
                    include: [{
                        model: db.Users,
                        as: 'citizen',
                        where: {
                            user_ID: req.user.user_ID
                        },
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
                    },
                ],
            }
        )
            .then((data) => helper.dataResponse(res, data, 'A health status log has been identified', 'A health status log has been not identified'))
            .catch((err) => helper.errResponse(res, err));
        };


exports.updateHealthStatusLog = (req, res) => {
    
    //Check Authorization first
    helper.checkAuthorization(req, res, 'Citizen');

    //Check first if health status log ID is existed in database
    db.Health_Status_Logs
        .findByPk(req.params.health_status_log_ID)

        .then((result) =>{

            //if no result return empty response
            if(result == null) helper.emptyDataResponse(res, 'No Citizen has been identified');

            //Update a Health status info
            db.Health_Status_Logs
                .update(req.body, {
                    where: {
                        health_status_log_ID: req.params.health_status_log_ID
                    }
                })
                .then(() =>{

                    //get health status log info after update
                    db.Health_Status_Logs
                    .findByPk(req.params.health_status_log_ID)
                    .then((data) => helper.dataResponse(res, data, 'A health status has been successfully updated', 'No citizen has been identified'))
                    .catch((err) => helper.errResponse(res, err));
                })
                .catch((err) => helper.errResponse(res, err));
        })
        .catch((err) => helper.errResponse(res, err));
};
