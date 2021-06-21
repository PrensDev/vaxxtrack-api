const { errResponse } = require("../../helpers/controller.helper");
const db = require("../../models");


// Get Vaccination Records Status
exports.getVaccRecordsStatus = (req, res) => {
    db.Vaccination_Records
        .count()
        .then(result => res.send({ vaccination_record_status: result}))
        .catch(err => errResponse(res, err))
}


// Get Vaccination Appointments Status
exports.getVaccAppointmentsStatus = (req, res) => {
    db.Vaccination_Appointments
        .count({
            col: 'status_approval',
            group: ['status_approval']
        })
        .then(result => {

            // Vacciantion Appointment Status Object
            vaccAppointmentsStatus = {
                all: 0,
                pending: 0,
                approved: 0,
                rejected: 0
            }

            // Get each element in result
            result.forEach(el => {
                
                // Get total records count of appointments
                vaccAppointmentsStatus.all += el.count;
                
                // Get each count per status_approval
                if(el.status_approval === 'Pending') vaccAppointmentsStatus.pending = el.count;
                if(el.status_approval === 'Approved') vaccAppointmentsStatus.approved = el.count;
                if(el.status_approval === 'Rejected') vaccAppointmentsStatus.rejected = el.count;

            });
            
            // Respond the vaccAppointmentsStatus object
            res.send({ vaccination_appointments_status: vaccAppointmentsStatus })
        })
        .catch(err => errResponse(res, err))
}