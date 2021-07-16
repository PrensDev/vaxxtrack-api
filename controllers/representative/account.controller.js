/**
 * ==================================================================
 * * ACCOUNT CONTROLLER
 * ------------------------------------------------------------------
 * This controller is for managing user accounts
 * ==================================================================
 */


// Import required packages
const db = require('../../models');
const { dataResponse, emptyDataResponse, checkAuthorization } = require('../../helpers/controller.helper');
const bcrypt = require('bcrypt');


// Update Password
exports.updatePassword = (req, res) =>  {

    // Check authorization first
    checkAuthorization(req, res, 'Representative');

    // Get password from req.body
    const new_password = bcrypt.hashSync(req.body.new_password, 10) ;

    // Find user and check password
    db.Users
        .findByPk(req.user.user_ID, { attributes: ['user_ID', 'password'] })
        .then(result => {
            console.log(req.body);
            if(result) {
                bcrypt.compare(req.body.current_password, result.password, (err, hasResult) => {

                    // Display error if exists
                    if(err) console.log(err);
                    
                    // If no result then send empty reponse
                    if(!hasResult) return emptyDataResponse(res, 'Invalid details or password');
                    
                    // Else update user password
                    db.Users
                        .update({ password: new_password }, { where: { user_ID: req.user.user_ID }})
                        .then(data => dataResponse(res, data, 'Password has been changed successfully', 'Password has been changed successfully'))
                        .catch(err => errResponse(res, err));
                });
            }
        })
        .catch(err => errResponse(res, err));
};

// Get all accounts
exports.getAllAccounts = (req, res, next) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Representative')

    db.User_Accounts
        .findAll({ where: { user_ID: req.user.user_ID }})
        .then(data => dataResponse(res, data, 'User accounts are retrieved successfully', 'No user account has been retrieved'))
        .catch(err => errResponse(res, err));
}

// Create new account
exports.createAccount = (req, res) => {
    
    // Check Authorization first
    checkAuthorization(req, res, 'Representative');

    db.User_Accounts
        .findOne({ where: { details: req.body.details }})
        .then(result => {
            if(result) emptyDataResponse(res, 'Account already exist')
            else {
                
                // Set user ID
                req.body.user_ID = req.user.user_ID
                
                // Create Account
                db.User_Accounts
                    .create(req.body)
                    .then((data) => dataResponse(res, data, 'New account has been created', 'Failed to create account'))
                    .catch((err) => errResponse(res, err)); 
            }
        })
        .catch(err => errResponse(res, err));
};

//verify
exports.verifyAccount = (req, res) =>{
        
    // 
    helper.checkAuthorization(req, res, 'Representative');

    const user_account_ID = req.params.user_account_ID;

        if(user_account_ID == null) return res.status(500).send({
            error   : true,
            message : 'Parameter [user_account_ID] is required',
        });

        db.User_Accounts
        .findByPk(user_account_ID)
        .then((result) =>{
            // If no result return empty response
            if(result == null) helper.emptyDataResponse(res, 'No user_account_ID has been identified');

            //update
            db.User_Accounts
                .update(req.body, {
                    where: {
                        user_account_ID: user_account_ID,
                        verified: 0,
                        user_ID: req.user.user_ID
                    }
                })
                .then((data) => { 
                    if(data == 1) {
                        res.send({
                            error : false,
                            data: data,
                            message : 'Account successfuly verified'
                    })
        
                    } else {
                        res.send({
                            error : true,
                            message: 'Account already verified'
                            })
                        }
                    })
                .catch((err) => helper.errResponse(res, err));
        } )
        .catch((err) => helper.errResponse(res, err));

}
