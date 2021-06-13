/**
 * ACCOUNT CONTROLLER
 * 
 * This controller is for managing account settings of super admin
 */


// Import required packages
const db     = require('../../models');
const helper = require('../../helpers/controller.helper');
const bcrypt = require('bcrypt');


// Update Password
exports.updatePassword = (req, res) =>  {

    // Check authorization first
    helper.checkAuthorization(req, res, 'Super Admin');

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
        .then(() => helper.emptyDataResponse(res, 'Password has been changed successfully'))
        .catch((err) => helper.errResponse(res, err));
};

// Get all accounts
exports.getAllAccounts = (req, res, next) => {

        // Check authorization 
        helper.checkAuthorization(req, res, 'Super Admin');
    
        // Find all records of Super Admin
        db.User_Accounts
            .findAll()
            .then((data) => helper.dataResponse(res, data, 'A Record has been retrieved successfully', 'No Record has been identified'))
            .catch((err) => helper.errResponse(res, err));
    }

// Create new account
exports.createAccount = (req, res) => {
    
    // Check Authorization first
    helper.checkAuthorization(req, res, 'Super Admin');

    req.body.user_ID = req.user.user_ID
    db.User_Accounts
        .create(req.body)
        .then((data) => helper.dataResponse(res, data, 'New account has been created', 'Failed to create account'))
        .catch((err) => helper.errResponse(res, err)); 
};
