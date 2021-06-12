/**
 * VACCINATION CONTROLLER
 * 
 * This controller is for properties related to vaccination
 */


// Import models
const db = require('../../models');


// Get All Users including their vaccination records
exports.getAllUsersAndVaccRecords = (req, res, next) => {

    // Check if user logged in or logged in but not Health Official
    if(req.user == null || req.user.user_type !== 'Health Official') {
        res.sendStatus(403);
    } else {

        // Get all records
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
                where: {
                    user_type: 'Citizen'
                },
                include: {
                    model: db.Vaccination_Records,
                    as: 'vaccination_records',
                    include: {
                        model: db.Vaccines,
                        as: 'vaccines'
                    }
                }
            })
            .then((data) => {
                if(data) {
                    res.send({
                        error: false,
                        data: data,
                        message: 'Vaccinated users have been successfully retrieved'
                    })
                } else {
                    res.send({
                        error: false,
                        message: 'No users are recorded as vaccinated'
                    })
                }
            })
            .catch((err) => {
                res.status(500).send({
                    error: true,
                    message: ['Oops! Error occured.', `${err}`]
                })
            })
    }
} 