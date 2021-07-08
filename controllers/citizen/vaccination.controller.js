/**
 * =====================================================================
 * * VACCINATION CONTROLLER
 * ---------------------------------------------------------------------
 * This controller is for managing vaccination records and appointment
 *  
 * of citizen
 * =====================================================================
 */

// Import models and bcrypt for this controller
const db = require("../../models");
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require('../../helpers/controller.helper');


/**
 * ==================================================================
 * * VACCINATION RECORDS
 * ==================================================================
 */

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


/**
 * ==================================================================
 * * VACCINATION APPOINTMENTS
 * ==================================================================
 */

// Create Vaccintaion Appointments
exports.createVaccAppointments = (req, res) => {

    checkAuthorization(req, res, 'Citizen');

    db.Vaccination_Appointments
        .create({
            preferred_vaccine: req.body.preferred_vaccine,
            preferred_date: req.body.preferred_date,
            citizen_ID: req.user.user_ID
        })
        .then((data) => {
            db.Vaccination_Appointments
                .findByPk(data.vaccination_appointment_ID, {
                    attributes: {
                        exclude: [
                            "created_datetime",
                            "updated_datetime"
                        ]
                    },
                })
                .then((result) => dataResponse(res, result, 'New vaccination appointment has been successfully created', 'Failed to create a vaccination appointments'))
                .catch((err) => errResponse(res, err));
        })
        .catch((err) => errResponse(res, err));
}


// Vaccination Appointments Options
dbVaccAppointmentOp = (user_ID) => {
    return {
        attributes: {
            exclude: [
                "preferred_vaccine",
                "updated_datetime",
            ]
        },
        include: [{
            model: db.Vaccines,    
            as: 'vaccine_preferrence',
            attributes: {
                exclude: [
                    "updated_datetime"
                ]
            }
        },{
            model: db.Users,
            as: 'approved_person'
        }],
        where: {
            citizen_ID: user_ID
        },
        order: [
            ['created_datetime', 'desc'],
            ['preferred_date', 'desc'],
        ]
    }
}


// Get all Vaccination Appointments
exports.getAllVaccAppointments = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Citizen');

    db.Vaccination_Appointments
        .findAll(dbVaccAppointmentOp(req.user.user_ID))
        .then((data) => dataResponse(res, data, '[Vaccine Appointments] retrieved successfully', 'No [Vaccine Appointments] has been retrieved'))
        .catch((err) => errResponse(res, err)); 

};


// Get one vaccination appointments
exports.getOneVaccinationAppointment = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Citizen');

    db.Vaccination_Appointments
        .findByPk(req.params.vaccination_appointment_ID, dbVaccAppointmentOp(req.user.user_ID))
        .then((data) => dataResponse(res, data, 'A Visiting Log has been identified', 'A Visiting Log cannot identified'))
        .catch((err) => errResponse(res, err)); 
}


// Update vaccination appointment
exports.updateVaccAppointment = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Citizen');

    const vaccination_appointment_ID = req.params.vaccination_appointment_ID;
    
    db.Vaccination_Appointments
        .update(req.body, {
            where: {
                vaccination_appointment_ID: vaccination_appointment_ID,
                citizen_ID: req.user.user_ID,
                status_approval: 'Pending',
            },
            attributes: {
                exclude: [
                    'vaccination_appointment_ID',
                    'citizen_ID',
                    'status_approval',
                    'created_datetime'
                ]
            }
        })
        .then((data) => {
            if(data) {
                db.Vaccination_Appointments
                    .findByPk(vaccination_appointment_ID, {
                        attributes: {
                            exclude: [
                                "created_datetime",
                                "updated_datetime"
                            ]
                        },
                    })
                    .then((result) => dataResponse(res, result, 'New vaccination appointment has been successfully created', 'Failed to create a vaccination appointments'))
                    .catch((err) => errResponse(res, err));
            }
        })
        .catch((err) => errResponse(res, err));
}


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
