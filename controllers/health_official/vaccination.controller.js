/**
 * VACCINATION CONTROLLER
 * 
 * This controller is for properties related to vaccination
 */
 
 
// Import models
const { checkAuthorization, errResponse, dataResponse } = require('../../helpers/controller.helper');
const db = require('../../models');
const Op = require('sequelize').Op;
const helper = require("../../helpers/controller.helper");
 
const dbVaccinationAppointmentsOp = (req) => {
    return {
        include: [
            {
                model: db.Users,
                as: 'appointed_by',
                attributes: [
                    'first_name',
                    'middle_name',
                    'last_name',
                    'suffix_name',
                    'sex',
                    'birth_date',
                    'civil_status'
                ]
            }
        ],
        order: [['created_datetime','DESC']]
    }
}
 

// Get All Users including their vaccination records
exports.getAllUsersAndVaccRecords = (req, res) => {
 
    // Check Authorization first
    checkAuthorization(req, res, 'Health Official');
 
    db.Vaccination_Records
        .findAll({
            attributes: {
                exclude: [
                    'added_by',
                    'password',
                    'created_datetime',
                    'updated_datetime'
                ]
            },
            where: { 
                user_type: 'Citizen',
            },
            include: {
                model: db.Users,
                as: 'citizens',
                where: {
                    where: { user_ID: req.user.user_ID }
                },
                include: {
                    model: db.Vaccines,
                    as: 'vaccines'
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
            db.Visiting_Records
                .findByPk(data.vaccination_record_ID, {
                    include : [
                        {
                            model: db.Users,
                            as : "user",
                            include : [{
                                model : db.Addresses,
                                as : "address"
                            }]
                        }, {
                            model: db.Vaccines,
                            as : "vaccine"
                        }
                    ]
                })
        .then((data) => helper.dataResponse(res, data, 'New vaccination record has been successfully created', 'Failed to create a vaccination record'))
        .catch((err) => helper.errResponse(res, err)); 
         })
    .catch((err) => helper.errResponse(res, err)); 
};

 
// Update vaccination record of a citizen.
exports.updateVaccRecord = (req, res) => {
 
    // Check authorization first
    helper.checkAuthorization(req, res, 'Health Official');
 
    // Check first if vaccination record ID existed in database
    db.Vaccination_Records
        .findByPk(req.params.vaccination_record_ID)
        .then((result) => {
 
            // If no result return empty response
            if(result == null) helper.emptyDataResponse(res, 'No vaccination record has been identified');
 
            // Update vaccination record
            db.Vaccination_Records
                .update(req.body, {
                    where: {
                        vaccination_record_ID: req.params.vaccination_record_ID
                    }
                })
                .then(() => {
 
                    // Get vaccination record after update
                    db.Vaccination_Records
                        .findByPk(req.params.vaccination_record_ID)
                        .then((data) => helper.dataResponse(res, data, 'A vaccination record has been successfully updated', 'No vaccination record has been identified'))
                        .catch((err) => helper.errResponse(res, err));
                })
                .catch((err) => helper.errResponse(res, err));
        })
        .catch((err) => helper.errResponse(res, err));
}
 
 
// Get All Vaccination Appointments
exports.getAllVaccAppointments = (req, res) => {
 
    // Check Authorization first
    helper.checkAuthorization(req, res, 'Health Official');
 
    db.Vaccination_Appointments
        .findAll(dbVaccinationAppointmentsOp(req))
        .then((data) => helper.dataResponse(res, data, 'Vaccination Appointments retrieved successfully', 'No Vaccination Appointment has been recorded as vaccinated'))
        .catch((err) => helper.errResponse(res, err));
}
