/**
 * VACCINATION CONTROLLER
 * 
 * This controller is for managing vaccination records and apoointment of citizen
 */

// Import models and bcrypt for this controller
const db     = require("../../models");
const helper = require("../../helpers/controller.helper");


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

// Get All Vaccination Records
exports.getAllVaccRecord = (req, res) => {

    // Check authorization 
    helper.checkAuthorization(req, res, 'Citizen');

    // Find all vaccination record of citizens
    db.Vaccination_Records
        .findAll(dbVaccinationRecordsOp(req))
        .then((data) => helper.dataResponse(res, data, 'Vaccination Records retrieved successfully', 'No Vaccination Record has been identified'))
        .catch((err) => helper.errResponse(res, err));
}

// Get One Vaccination Record
exports.getOneVaccRecord = (req, res) => {

    // Check authorization 
    helper.checkAuthorization(req, res, 'Citizen');

    // Find one visiting log in an establishment establishments
    db.Vaccination_Records
        .findByPk(req.params.vaccination_record_ID, dbVaccinationRecordsOp(req))
        .then((data) => helper.dataResponse(res, data, 'A Vaccination Record has been identified', 'No Vaccination Record has been identified'))
        .catch((err) => helper.errResponse(res, err));
}

//Get All Vaccination Appoitments

exports.getAllVaccAppointments = (req, res) => {

    helper.checkAuthorization(req, res, 'Citizen');

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
        .then((data) => helper.dataResponse(res, data, '[Vaccine Appointments] retrieved successfully', 'No [Vaccine Appointments] has been retrieved'))
        .catch((err) => helper.errResponse(res, err)); 

};

// Cancel Vaccine Appointments

exports.cancelVaccAppointment = (req, res) => {

    helper.checkAuthorization(req, res, 'Citizen');

    db.Vaccination_Appointments
        .destroy({
            where: {
                vaccination_appointment_ID: req.params.vaccination_appointment_ID,
                status_approval: 'Pending'
            }
        })
        .then((data) => {
            if(data == 1) {
                res.send({
                    error: false,
                    data: data,
                    message: '[Vaccine Appointments] has been Successfully Deleted'
                })
            } else {
                res.send({
                    error: true,
                    message: '[Vaccine Appointments] cannot been Deleted'
                })
            }
        })
        .catch((err) => helper.errResponse(res, err)); 

};