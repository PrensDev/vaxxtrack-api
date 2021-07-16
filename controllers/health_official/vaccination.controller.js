/**
 * ==================================================================
 * * VACCINATION CONTROLLER
 * ------------------------------------------------------------------
 * This controller is for properties related to vaccination
 * ==================================================================
 */


// Import models
const db = require('../../models');
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require("../../helpers/controller.helper");
const { Op } = require('sequelize');


/**
 * ==================================================================
 * * VACCINES
 * ==================================================================
 */

// Add Vaccine
exports.addVaccine = (req, res) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Health Official')

    db.Vaccines
        .create(req.body)
        .then(data => dataResponse(res, data, 'A vaccine record is successfully added', 'There was an error in adding a vaccine record'))
        .catch(err => errResponse(res, err))
}


// Update Vaccine
exports.updateVaccine = (req, res) => {

    // Check Authorization First
    checkAuthorization(req, res, 'Health Official')

    db.Vaccines
        .update(req.body, {
            where: {
                vaccine_ID: req.params.vaccine_ID
            }
        })
        .then(data => dataResponse(res, data, 'A vaccine has been updated', 'No vaccine has been updated'))
        .catch(err => errResponse(res, err))
}


// Delete Vaccine
exports.deleteVaccine = (req, res) => {

    // Check Authorization First
    checkAuthorization(req, res, 'Health Official');

    db.Vaccines
        .destroy({ where: { vaccine_ID: req.params.vaccine_ID }})
        .then(data => dataResponse(res, data, 'A vaccine has been updated', 'No vaccine has been updated'))
        .catch(err => errResponse(res, err))
}


/**
 * ==================================================================
 * * VACCINATED USERS AND THEIR RECORDS
 * ==================================================================
 */


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


// Get All Users including their vaccination records
exports.getOneUserAndVaccRecords = (req, res) => {

    // Check Authorization first
    checkAuthorization(req, res, 'Health Official');

    db.Users
        .findByPk(req.params.user_ID, {
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
                },
                order: [['vaccination_date', 'asc']]
            }
        })
        .then((data) => dataResponse(res, data, 'Vaccinated users retrieved successfully', 'No user have been recorded as vaccinated'))
        .catch((err) => errResponse(res, err));
}


/**
 * ==================================================================
 * * VACCINATION RECORDS
 * ==================================================================
 */


// Create new vaccination record of a Citizen.
exports.createVaccRecord = (req, res) => {
    
    // Check Authorization first
    checkAuthorization(req, res, 'Health Official');

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


// Vaccination Record Options
const dbVaccRecordOp = {
    include: [
        {
            model: db.Users,
            as: 'vaccinated_citizen',
            attributes: {
                exclude: [
                    'password',
                    'added_by',
                    'created_datetime',
                    'updated_datetime'
                ]
            },
            include: [{
                model: db.Addresses,
                as: 'address',
                attributes: {
                    exclude: [
                        'created_datetime',
                        'updated_datetime'
                    ]
                }
            }]
        }, {
            model: db.Vaccines,
            as: 'vaccine_used',
            attributes: {
                exclude: [
                    'created_datetime',
                    'updated_datetime'
                ]
            }
        }]
}


// Get All Vaccination Records
exports.getAllVaccRecords = (req, res, next) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Health Official');

    db.Vaccination_Records
        .findAll(dbVaccRecordOp)
        .then((data) => dataResponse(res, data, 'Vaccination Records are retrieved successfully', 'No vaccination records have been retrieved'))
        .catch((err) => errResponse(res, err))
}


// Get One Vaccination Record
exports.getOneVaccRecord = (req, res, next) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Health Official');

    db.Vaccination_Records
        .findByPk(req.params.vaccination_record_ID, dbVaccRecordOp)
        .then((data) => dataResponse(res, data, 'Vaccination Records are retrieved successfully', 'No vaccination records have been retrieved'))
        .catch((err) => errResponse(res, err))
}


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


// Delete Vaccination Record
exports.deleteVaccRecord = (req, res, next) => {

    // Check authorization first
    checkAuthorization(req, res, 'Health Official');

    // Delete a Vaccination Record by ID
    db.Vaccination_Records
        .destroy({ where: { vaccination_record_ID: req.params.vaccination_record_ID }})
        .then(data => dataResponse(res, data, 'A vaccination record is successfully deleted', 'No vaccination record has been deleted'))
        .catch(err => errResponse(res, err));
}


/**
 * ==================================================================
 * * VACCINATION APPOINTMENTS
 * ==================================================================
 */

// Vaccination Appontments Model Options
const vaccAppointmentsOp = {
    include: [
        {
            model: db.Users,    
            as: 'appointed_by',
            attributes: {
                exclude: [
                    'user_type',
                    'password',
                    'added_by',
                    'created_datetime',
                    'updated_datetime'
                ]
            }, 
            include: [{
                model: db.Addresses,
                as: 'address'
            }]
        }, {
            model: db.Vaccines,
            as: 'vaccine_preferrence'
        }, {
            model: db.Users,
            as: 'approved_person'
        }
    ],
}


// Get All Vaccination Appointments
exports.getAllVaccAppointments = (req, res) => {

    // Check Authorization first
    checkAuthorization(req, res, 'Health Official');

    // Find all vaccination appointments
    db.Vaccination_Appointments
        .findAll(vaccAppointmentsOp)
        .then((data) => dataResponse(res, data, 'Vaccination Appointments retrieved successfully', 'No Vaccination Appointment has been recorded as vaccinated'))
        .catch((err) => errResponse(res, err));
}


// Get One Vaccination Appointment
exports.getOneVaccAppointment = (req, res) => {

    // Check Authorization first
    checkAuthorization(req, res, 'Health Official');

    // Find all vaccination appointments
    db.Vaccination_Appointments
        .findByPk(req.params.vaccination_appointment_ID, vaccAppointmentsOp)
        .then((data) => dataResponse(res, data, 'Vaccination Appointments retrieved successfully', 'No Vaccination Appointment has been recorded as vaccinated'))
        .catch((err) => errResponse(res, err));
}


// Update Vaccination Appointments
exports.updateVaccAppointment = (req, res) => {

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
            
            // Attach the ID of Health Official
            req.body.approved_by = req.user.user_ID;

            // If status is Pending, reset approved_by and approved_datetime
            if(req.body.status_approval === 'Pending') {
                req.body.approved_by = null;
                req.body.approved_datetime = null;
            }

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


/**
 * ==================================================================
 * * PATIENT CONTROLLERS (For vaccination record & case record)
 * ==================================================================
 */

// Get all citizens (or probable patients)
exports.getAllProbablePatients = (req, res) => {

    // Check Authorization first
    checkAuthorization(req, res, 'Health Official');

    db.Users
        .findAll({
            where: { user_type: 'Citizen' },
            attributes: {
                exclude: ['added_by']
            },
            include: [
                {
                    model: db.Addresses,
                    as: 'address'
                }
            ]
        })
        .then(data => dataResponse(res, data, 'Citizens are retrieved sucessfully', 'No citizen has been retrieved'))
        .catch(err => errResponse(res, err));
}

// Get one citizen (or probable patient)
exports.getOneProbablePatient = (req, res) => {

    // Check Authorization first
    checkAuthorization(req, res, 'Health Official');

    db.Users
        .findOne({
            where: { 
                user_ID: req.params.user_ID,
                user_type: 'Citizen' 
            },
            attributes: {
                exclude: ['added_by']
            },
            include: [
                {
                    model: db.Addresses,
                    as: 'address'
                }
            ]
        })
        .then(data => dataResponse(res, data, 'Citizens are retrieved sucessfully', 'No citizen has been retrieved'))
        .catch(err => errResponse(res, err));
}