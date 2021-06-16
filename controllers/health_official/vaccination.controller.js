/**
 * VACCINATION CONTROLLER
 * 
 * This controller is for properties related to vaccination
 */
 
 
// Import models
const db = require('../../models');
const Op = require('sequelize').Op;
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require("../../helpers/controller.helper");


// Vaccination Appointments Options
const dbVaccinationAppointmentsOp = () => {
    return {
        attributes: {
            exclude: [
                'citizen_ID',
                'created_datetime',
                'updated_datetime'
            ]
        },
        include: [{
            model: db.Users,
            as: 'appointed_by',
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
        order: [['created_datetime','DESC']]
    }
}
 

// Get All Users including their vaccination records
exports.getAllUsersAndVaccRecords = (req, res) => {
 
    // Check Authorization first
    checkAuthorization(req, res, 'Health Official');
 
    db.Users
        .findAll({
            attributes: {
                exclude: [
                    'added_by',
                    'password',
                    'created_datetime',
                    'updated_datetime'
                ]
            },
            where: { user_type: 'Citizen' },
            include: {
                model: db.Vaccination_Records,
                as: 'vaccination_records',
                where: {
                    vaccination_record_ID: { [Op.not]: null }
                },
                include: {
                    model: db.Vaccines,
                    as: 'vaccine_used'
                }
            }
        })
        .then((data) => dataResponse(res, data, 'Vaccinated users retrieved successfully', 'No user have been recorded as vaccinated'))
        .catch((err) => errResponse(res, err));
} 
 
// Create new vaccination record of a Citizen.
exports.createVaccRecord = (req, res) => {
    
    // Check Authorization first
    helper.checkAuthorization(req, res, 'Health Official');

    db.Vaccination_Records
        .create(req.body)
        .then((data) => {
            db.Users
                .findByPk(data.citizen_ID, {
                    attributes: {
                        exclude: [
                            'user_ID',
                            'added_by',
                            'user_type',
                            'address_ID',
                            'created_datetime',
                            'updated_datetime'
                        ]
                    },
                    include: [
                        {
                            model: db.Addresses,
                            as : "address",
                            attributes: {
                                exclude: [
                                    'address_ID',
                                    'created_datetime',                                
                                    'updated_datetime'
                                ]}
                        }, {
                            model: db.Vaccination_Records,
                            as : "vaccination_records",
                            attributes: {
                                exclude: [                                    
                                    'citizen_ID',
                                    'vaccine_ID',                                
                                    'created_datetime',
                                    'updated_datetime'
                                ]
                            },
                            include : [{
                                model : db.Vaccines,
                                as : "vaccine_used",                                
                                attributes: {
                                    exclude: [
                                        'vaccine_ID',
                                        'shots_details',
                                        'description',
                                        'created_datetime',
                                        'updated_datetime'
                                    ]                                
                                }
                            }]
                        }
                    ]
                })
        .then((data) => dataResponse(res, data, 'New vaccination record has been successfully created', 'Failed to create a vaccination record'))
        .catch((err) => errResponse(res, err)); 
    })
    .catch((err) => errResponse(res, err)); 
};



// Update vaccination record of a citizen.
exports.updateVaccRecord = (req, res, next) => {
 
    // Check authorization first
    checkAuthorization(req, res, 'Health Official');

    // Get vaccination_record_ID from req.params
    const vaccination_record_ID = req.params.vaccination_record_ID;

    // Return internal server error (500) if vaccination_record_ID is null
    if(vaccination_record_ID == null) return res.status(500).send({
        error   : true,
        message : 'Parameter [vaccination_record_ID] is required',
    });
 
    // Check if vaccination record ID exists in database
    db.Vaccination_Records
        .findByPk(vaccination_record_ID)
        .then((result) => {
 
            // If no result return empty response
            if(result == null) return emptyDataResponse(res, 'No vaccination record has been identified');
            
            // Else update vaccination record
            db.Vaccination_Records
                .update(req.body, {
                    where: { vaccination_record_ID: vaccination_record_ID }
                })
                .then(() => {
 
                    // Get vaccination record after update
                    db.Vaccination_Records
                        .findByPk(vaccination_record_ID, {
                            attributes: {
                            exclude: [
                                'citizen_ID',
                                'vaccine_ID',
                                'created_datetime',
                                'updated_datetime'
                            ]
                        },
                        include : [{
                            model : db.Vaccines,
                            as : "vaccine_used",
                            attributes: {
                                exclude: [
                                    'vaccine_ID',
                                    'shots_details',
                                    'description',
                                    'created_datetime',
                                    'updated_datetime'
                                ]
                            }
                        },
                        {
                        model: db.Users,
                        as : "vaccinated_citizen",
                        attributes: {
                            exclude: [
                                'user_ID',
                                'added_by',
                                'user_type',
                                'address_ID',
                                'password',
                                'created_datetime',
                                'updated_datetime'
                            ]
                        },
                        include : [{
                            model: db.Addresses,
                            as : "address",
                            attributes: {
                                exclude: [
                                    'address_ID',
                                    'created_datetime',
                                    'updated_datetime'
                                ]}
                            }]
                        }]    
                    })
                    .then((data) => dataResponse(res, data, 'A vaccination record has been successfully updated', 'No vaccination record has been identified'))
                    .catch((err) => errResponse(res, err));
            })
            .catch((err) => errResponse(res, err));
    })
    .catch((err) => errResponse(res, err));
}
 

// Get All Vaccination Appointments
exports.getAllVaccAppointments = (req, res) => {
 
    // Check Authorization first
    checkAuthorization(req, res, 'Health Official');
 
    // Find all vaccination appointments
    db.Vaccination_Appointments
        .findAll(dbVaccinationAppointmentsOp)
        .then((data) => helper.dataResponse(res, data, 'Vaccination Appointments retrieved successfully', 'No Vaccination Appointment has been recorded as vaccinated'))
        .catch((err) => helper.errResponse(res, err));
}


//Update Vaccination Appointments
exports.updateVaccAppointmentStatusApproval = (req, res) => {

    // Check Authorization first
    checkAuthorization(req, res, 'Health Official');

    // Get the vaccination_appointment_ID from req.params
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

            // If no result return empty response
            if(result == null) return emptyDataResponse(res, 'No vaccination_appointment_ID has been identified');

            // Update vaccination record
            db.Vaccination_Appointments
                .update(req.body, {
                    where: { vaccination_appointment_ID: vaccination_appointment_ID }
                })
                .then(() => {

                    //Get Vaccination Appointments after update
                    db.Vaccination_Appointments
                        .findByPk( vaccination_appointment_ID, {
                            attributes: {
                                exclude: [
                                    'vaccination_appointment_ID',
                                    'preferred_vaccine',
                                    'preferred_date',
                                    'citizen_ID',
                                    'created_datetime',
                                    'updated_datetime'
                                ]
                            }
                        })
                        .then((data) => dataResponse(res, data, 'A [Vaccination Appointments] has been successfully updated', 'No [Vaccination Appointments] has been identified'))
                        .catch((err) => errResponse(res, err));
                })
                .catch((err) => errResponse(res, err));
        })
        .catch((err) => errResponse(res, err));
};