/**
 * =====================================================================
 * * REGISTER CONTROLLER
 * =====================================================================
 * This controller is for user registration
 * =====================================================================
 */


// Import models
const db     = require("../../models");
const helper = require('../../helpers/controller.helper');


// Check Account
exports.checkAccount = (req, res) => {
    db.User_Accounts
        .findAll({ where: { details: req.body.details }})
        .then(data => helper.dataResponse(res, data, 'This account is already used', 'This account is available'))
        .catch(err => helper.errResponse(res, err));
}


// Register a representative including its establishment
exports.representative = (req, res) => {

    // Register Representative db.User Option
    const regRepDbOp = {
        include: [
            {
                model: db.User_Accounts,
                as: 'user_accounts'
            }, {
                model: db.Establishments,
                as: 'establishments_with_roles',
                include: [{
                    model: db.Addresses,
                    as: 'address'
                }]
            }
        ]
    }

    // Set req.body.user_type to Representative
    // So no need to include in req.body
    req.body.user_type = 'Representative'

    // Create Record of new representative including other information
    db.Users
        .create(req.body, regRepDbOp)
        .then((result) => {
            db.Users
                .findByPk(result.user_ID, regRepDbOp)
                .then((data) => helper.dataResponse(res, data, 'A new representative has been registered', 'Representative was not registered'))
                .catch((err) => helper.errResponse(res, err));
        })
        .catch((err) => helper.errResponse(res, err));
}


// Register a citizen
exports.citizen = (req, res) => {

    // Register Citizen db.User Option
    const regCtzDbOp = {
        include: [
            {
                model: db.User_Accounts,
                as: 'user_accounts'
            }, {
                model: db.Addresses,
                as: 'address'
            }
        ]
    }

    // Set req.body.user_type to Citizen
    // So no need to include in req.body
    req.body.user_type = 'Citizen'

    // Create Record of new citizen including other information
    db.Users
        .create(req.body, regCtzDbOp)
        .then((result) => {
            db.Users
                .findByPk(result.user_ID, regCtzDbOp)
                .then((data) => helper.dataResponse(res, data, 'A new citizen has been registered', 'Citizen was not registered'))
                .catch((err) => helper.errResponse(res, err));
        })
        .catch((err) => helper.errResponse(res, err));
}


// Register a super admin
exports.super_admin = (req, res) => {
    db.Users
        .create(req.body, {
            include: [{
                model: db.User_Accounts,
                as: 'user_accounts'
            }]
        })
        .then((result) => {
            db.Users
                .findByPk(result.user_ID, {
                    include: [{
                        model: db.User_Accounts,
                        as: 'user_accounts'
                    }]
                })
                .then((data) => helper.dataResponse(res, data, 'A new Super Admin has been registered', 'Super Admin was not registered'))
                .catch((err) => helper.errResponse(res, err));
        })
        .catch((err) => helper.errResponse(res, err));
}


// Register a health official
exports.health_official = (req, res) => {
    db.Users
        .create(req.body, {
            include: [{
                model: db.User_Accounts,
                as: 'user_accounts'
            }]
        })
        .then((result) => {
            db.Users
                .findByPk(result.user_ID, {
                    include: [{
                        model: db.User_Accounts,
                        as: 'user_accounts'
                    }]
                })
                .then((data) => helper.dataResponse(res, data, 'A new Health Official has been registered', 'Health Official was not registered'))
                .catch((err) => helper.errResponse(res, err));
        })
        .catch((err) => helper.errResponse(res, err));
}