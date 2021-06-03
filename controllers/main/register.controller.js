/**
 * REGISTER CONTROLLER
 * 
 * This controller is for user registration
 */


// Import models
const db     = require("../../models");
const helper = require('../../helpers/controller.helper');


// Register a representative including its establishment
exports.representative = (req, res) => {
    db.Users
        .create(req.body, {
            include: [{
                model: db.User_Accounts,
                as: 'user_accounts'
            }, {
                model: db.Establishments,
                as: 'establishments_with_roles',
                include: [{
                    model: db.Addresses,
                    as: 'address'
                }]
            }]
        })
        .then((data) => {
            db.Users
                .findByPk(data.user_ID, {
                    include: [{
                        model: db.User_Accounts,
                        as: 'user_accounts'
                    }, {
                        model: db.Establishments,
                        as: 'establishments_with_roles',
                        include: [{
                            model: db.Addresses,
                            as: 'address'
                        }]
                    }]
                })
                .then((result) => {
                    res.send({
                        err     : false,
                        data    : result,
                        msg     : 'A new Representative has been registered!'
                    })
                })
                .catch((err) => helper.errResponse(res, err));
        })
        .catch((err) => helper.errResponse(res, err));
}

// Register a citizen
exports.citizen = (req, res) => {
    db.Users
        .create(req.body, {
            include: [{
                model: db.User_Accounts,
                as: 'user_accounts'
            }, {
                model: db.Addresses,
                as: 'address'
            }]
        })
        .then((data) => {
            db.Users
                .findByPk(data.user_ID, {
                    include: [{
                        model: db.User_Accounts,
                        as: 'user_accounts'
                    }, {
                        model: db.Addresses,
                        as: 'address'
                    }]    
                })
                .then((result) => {
                    res.send({
                        err     : false,
                        data    : result,
                        msg     : 'A new Citizen has been registered!'
                    })
                })
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
        .then((data) => {
            db.Users
                .findByPk(data.user_ID, {
                    include: [{
                        model: db.User_Accounts,
                        as: 'user_accounts'
                    }]
                })
                .then((result) => {
                    res.send({
                        err     : false,
                        data    : result,
                        msg     : 'A new Super Admin has been registered!'
                    })
                })
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
        .then((data) => {
            db.Users
                .findByPk(data.user_ID, {
                    include: [{
                        model: db.User_Accounts,
                        as: 'user_accounts'
                    }]
                })
                .then((result) => {
                    res.send({
                        err     : false,
                        data    : result,
                        msg     : 'A new Health Official has been registered!'
                    })
                })
                .catch((err) => helper.errResponse(res, err));
        })
        .catch((err) => helper.errResponse(res, err));
}