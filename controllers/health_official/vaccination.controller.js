/**
 * VACCINATION CONTROLLER
 * 
 * This controller is for properties related to vaccination
 */


// Import models
const { checkAuthorization, errResponse, dataResponse } = require('../../helpers/controller.helper');
const db = require('../../models');
const Op = require('sequelize').Op;


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
            where: { 
                user_type: 'Citizen',
            },
            include: {
                model: db.Vaccination_Records,
                as: 'vaccination_records',
                where: {
                    vaccination_record_ID: { [Op.not]: null }
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