/**
 * ESTABLISHMENT CONTROLLER
 * 
 * This controller is for establishment management of representatives
 */


// Import required packages
const db     = require("../../models");
const helper = require("../../helpers/controller.helper");


// db.Establishment options
const dbEstablishmentsOp = (req) => {
    return {
        include: [{
            model: db.Addresses,
            as: 'address',
            attributes: {
                exclude: [
                    'created_datetime'
                ]
            }
        }, {
            model: db.Users,
            as: 'role_by',
            attributes: ['user_ID'],
            where: {
                user_ID: req.user.user_ID
            }
        }]
    }
}


// Find all establishments
exports.getAllEstablishments = (req, res) => {
    
    // Check authorization first
    helper.checkAuthorization(req, res, 'Representative');

    // Find all representative establishments
    db.Establishments
        .findAll(dbEstablishmentsOp(req))
        .then((data) => helper.dataResponse(res, data, 'Establishments and its information retrieved successfully', 'No establishment has been identified'))
        .catch((err) => helper.errResponse(res, err));
}


// Find an establishment
exports.getOneEstablishment = (req, res) => {
    
    // Check authorization first
    helper.checkAuthorization(req, res, 'Representative');

    // Find establishment by its establishment_ID parameter
    db.Establishments
        .findByPk(req.params.establishment_ID, dbEstablishmentsOp(req))
        .then((data) => helper.dataResponse(res, data, 'An establishments and its information has been identified', 'No establishment has been identified'))
        .catch((err) => helper.errResponse(res, err));
}


// Update an establishment
exports.updateEstablishment = (req, res) => {
    
    // Check authorization first
    helper.checkAuthorization(req, res, 'Representative');

    // Get establishment_ID from parameter
    const establishment_ID = req.params.establishment_ID;

    // If establishment_ID is null then return error response
    if(establishment_ID == null) return res.status(500).send({
        error   : true,
        message : 'Parameter [establishment_ID] is required',
    });

    // Check if establishment was existed and roled by logged in representative
    db.Establishments
        .findByPk(establishment_ID, {
            include: {
                model: db.Users,
                as: 'role_by',
                where: {
                    user_ID: req.user.user_ID
                }
            }
        })
        .then((result) => {

            // If no result then return empty response
            if(result == null) helper.emptyDataResponse(res, 'That establishment cannot found');
            
            // Else update establishment information
            db.Establishments
                .update(req.body, {
                    where: {
                        establishment_ID: establishment_ID
                    },
                    include: [{
                        model: db.Addresses,
                        as: 'address'
                    }]
                })
                .then((result) => {

                    // If no result then return empty response
                    if(result == null) helper.emptyDataResponse(res, 'That establishment cannot found');
                    
                    db.Establishments
                        .findByPk(establishment_ID, {
                            include: {
                                model   : db.Addresses,
                                as      : 'address'
                            }
                        })
                        .then((data) => helper.dataResponse(res, data, 'An establishment has been successfully updated', 'No establishment was updated'))
                        .catch((err) => helper.errResponse(res, err));
                })
                .catch((err) => helper.errResponse(res, err));
        })
        .catch((err) => helper.errResponse(res, err));
}