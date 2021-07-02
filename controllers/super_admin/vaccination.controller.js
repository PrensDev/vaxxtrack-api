/**
 * =====================================================================
 * * VACCINATION CONTROLLER
 * ---------------------------------------------------------------------
 * This controller is for administration
 * =====================================================================
 */


// Import necessary packages
const db     = require('../../models');
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require('../../helpers/controller.helper');


/**
 * ============================================================================ 
 * * VACCINES
 * ============================================================================
 */

// Add Vaccine
exports.addVaccine = (req, res) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Super Admin')

    db.Vaccines
        .create(req.body)
        .then(data => dataResponse(res, data, 'A vaccine record is successfully added', 'There was an error in adding a vaccine record'))
        .catch(err => errResponse(res, err))
}

// Update Vaccine
exports.updateVaccine = (req, res) => {

    // Check Authorization First
    checkAuthorization(req, res, 'Super Admin')

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
    checkAuthorization(req, res, 'Super Admin');

    db.Vaccines
        .destroy({
            where: {
                vaccine_ID: req.params.vaccine_ID
            }
        })
        .then(data => dataResponse(res, data, 'A vaccine has been updated', 'No vaccine has been updated'))
        .catch(err => errResponse(res, err))
}


/**
 * ============================================================================ 
 * * VACCINATION RECORDS
 * ============================================================================
 */

// Get All Vaccination Records
exports.getAllVaccRecords = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Super Admin');

    db.Vaccination_Records
        .findAll({
            include: [{
                model: db.Users,
                as: 'vaccinated_citizen'
            }, {
                model: db.Vaccines,
                as: 'vaccine_used'
            }]
        })
        .then(data => dataResponse(res, data, 'Vaccination Records are retrieved successfully', 'No vaccination records are retrieved'))
        .catch(err => errResponse(res, err))
}

/**
 * ============================================================================ 
 * * VACCINATION APPOINTMENTS MANAGEMENT
 * ============================================================================
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
        }
    ],
}


// Get All Vaccination Appointments
exports.getAllVaccAppointments = (req, res) => {

    // Check Authorization first
    checkAuthorization(req, res, 'Super Admin');

    // Find all vaccination appointments
    db.Vaccination_Appointments
        .findAll(vaccAppointmentsOp)
        .then((data) => dataResponse(res, data, 'Vaccination Appointments retrieved successfully', 'No Vaccination Appointment has been recorded as vaccinated'))
        .catch((err) => errResponse(res, err));
}


// Get One Vaccination Appointment
exports.getOneVaccAppointment = (req, res) => {

    // Check Authorization first
    checkAuthorization(req, res, 'Super Admin');

    // Find all vaccination appointments
    db.Vaccination_Appointments
        .findByPk(req.params.vaccination_appointment_ID, vaccAppointmentsOp)
        .then((data) => dataResponse(res, data, 'Vaccination Appointments retrieved successfully', 'No Vaccination Appointment has been recorded as vaccinated'))
        .catch((err) => errResponse(res, err));
}