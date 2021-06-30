/**
 * =====================================================================
 * * VACCINATION CONTROLLER
 * ---------------------------------------------------------------------
 * This controller is for managing vaccination records and appointment 
 * of citizen
 * =====================================================================
 */

// Import models and bcrypt for this controller
const db = require("../../models");
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require('../../helpers/controller.helper');
const { Op } = require('sequelize');

// db.Vaccination_Records Options
const dbVaccinationRecordsOp = (req) => {
    return {
        include: [
            {
                model: db.Vaccines,
                as: 'vaccine_used',
                attributes: [
                    'product_name',
                    'vaccine_name',
                    'type',
                    'manufacturer',
                    'shots_details',
                    'description'
                ]
            }
        ],
        order: [['created_datetime','DESC']]
    }
}

const dbVaccinationRecOp = (req) => {
    return {
        where: {
            user_ID: req.user.user_ID
        },
        include: {
            model: db.Vaccination_Records,
            as: 'vaccination_records',
            include: {
                model: db.Vaccines,
                as: 'vaccine_used'
            }
        },
        order: [['created_datetime','DESC']]
    }
}


// Get All Vaccination Records of a citizen
exports.getOneUserAndAllVaccRecord = (req, res) => {

    // Check authorization 
    checkAuthorization(req, res, 'Citizen');

    // Find all vaccination record of citizens
    db.Users
        .findByPk(req.user.user_ID, dbVaccinationRecOp(req))
        .then((data) => dataResponse(res, data, 'Vaccination Records retrieved successfully', 'No Vaccination Record has been identified'))
        .catch((err) => errResponse(res, err));
}


// Get One Vaccination Record
exports.getOneVaccRecord = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Citizen');

    // Find one visiting log in an establishment establishments
    db.Vaccination_Records
        .findByPk(req.params.vaccination_record_ID, dbVaccinationRecordsOp(req))
        .then((data) => dataResponse(res, data, 'A Vaccination Record has been identified', 'No Vaccination Record has been identified'))
        .catch((err) => errResponse(res, err));
}


// Get all Vaccination Appointments
exports.getAllVaccAppointments = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Citizen');

    db.Vaccination_Appointments
        .findAll({
            include: [{
                model: db.Users,    
                as: 'appointed_by',
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
            }],
        })
        .then((data) => dataResponse(res, data, '[Vaccine Appointments] retrieved successfully', 'No [Vaccine Appointments] has been retrieved'))
        .catch((err) => errResponse(res, err)); 

};


// Cancel Vaccine Appointments
exports.cancelVaccAppointment = (req, res) => {

    // CHeck authorization first
    checkAuthorization(req, res, 'Citizen');

    // Get vaccination_appointment_ID from req.params
    const vaccination_appointment_ID = req.params.vaccination_appointment_ID;

    // Return internal server error (500) if vaccination_appointment_ID is null
    if(vaccination_appointment_ID == null) return res.status(500).send({
        error   : true,
        message : 'Parameter [vaccination_appointment_ID] is required',
    });

    // Check if vaccination record ID exists in database
    db.Vaccination_Appointments
        .findByPk(vaccination_appointment_ID)
        .then((result) => {

            // Return empty response if no result
            if(result == null) return emptyDataResponse(res, 'No vaccination_appointment_ID has been identified');

            //Delete Vaccine Appointments
            db.Vaccination_Appointments
                .destroy({
                    where: {
                        vaccination_appointment_ID: vaccination_appointment_ID,
                        status_approval: 'Pending'
                    }
                })
                .then((result) => {
                    if(result == 1) {
                        res.send({
                            error : false,
                            data: result,
                            message : '[Vaccine Appointments] has been Successfully Deleted'
                        })
                    } else {
                        res.send({
                            error : true,
                            message: '[Vaccine Appointments] cannot been Deleted'
                        })
                    }
                })
                .catch((err) => errResponse(res, err));
        })
        .catch((err) => errResponse(res, err));
};
