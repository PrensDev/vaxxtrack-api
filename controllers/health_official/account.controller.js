/**
 * ACCOUNT CONTROLLER
 * 
 * This controller is for managing account settings of health officials
 */


// Import required packages
const db     = require('../../models');
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require('../../helpers/controller.helper');
const bcrypt = require('bcrypt');
const helper = require('../../helpers/controller.helper');


// Update Password
exports.updatePassword = (req, res) =>  {

    // Check authorization first
    checkAuthorization(req, res, 'Health Official');

    // Get password from req.body
    const password = req.body.password;

    // Check if password is null
    if (password == null || password == '') return res.status(500).send({
        error: true,
        message: 'Password is required'
    });
        
    // Update user password
    db.Users
        .update({ password: bcrypt.hashSync(password, 10) }, {
            where: { user_ID: req.user.user_ID }
        })
        .then(() => emptyDataResponse(res, 'Password has been changed successfully'))
        .catch((err) => errResponse(res, err));
};


// Get all accounts
exports.getAllAccounts = (req, res, next) => {
    if(req.user == null || req.user.user_type !== 'Health Official') {
        res.sendStatus(403);
    } else {
        db.User_Accounts
            .findAll()
            .then((data) => {
                if(data) {
                    res.send({
                        error: false,
                        data: data,
                        message: 'A user has been identified'
                    });
                } else {
                    res.send({
                        error: true,
                        message: 'No user has been identified'
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}


// Create new account
exports.createAccount = (req, res) => {
    
    // Check Authorization first
    checkAuthorization(req, res, 'Health Official');
    
    req.body.user_ID = req.user.user_ID
    db.User_Accounts
        .create(req.body)
        .then((data) => dataResponse(res, data, 'New account has been created', 'Failed to create account'))
        .catch((err) => errResponse(res, err)); 
};