/**
 * =====================================================================
 * * ACCOUNT CONTROLLER
 * ---------------------------------------------------------------------
 * This controller is for managing account settings of citizens
 * =====================================================================
 */


// Import models and bcrypt for this controller
const db     = require("../../models");
const helper = require("../../helpers/controller.helper");
const bcrypt = require('bcrypt');


// Update Password
exports.updatePassword = (req, res) =>  {

    // Check authorization first
    helper.checkAuthorization(req, res, 'Citizen');

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


//get All Accounts

exports.getAllAccounts = (req, res) => {

    //check authorization
    helper.checkAuthorization(req, res, 'Citizen');

    //findAll Accnts of representatives
    db.User_Accounts
    .findAll()
    .then((data) => helper.dataResponse(res, data, 'Accounts successfully retrieved', 'No Account has been retrieved'))
    .catch((err) => helper.errResponse(res, err));
}

//add accnt
exports.createAccount = (req, res) => {

    //check authentication
    helper.checkAuthorization(req, res, 'Citizen');

    //add accnt
    db.User_Accounts
    
    .create({
        user_ID: req.user.user_ID,
        details: req.body.details,
        type: req.body.type, 
    })
    .then((result) => {
        db.Users
            .findByPk(result.user_ID, {
                include: [
                    {
                        model: db.User_Accounts,
                        as: 'user_accounts',
                        attributes: {
                            exclude: [
                                'user_account_ID',
                                'user_ID',
                                'verified',
                                'created_datetime',
                                'updated_datetime'
                            ]
                        }
                    }
                ],
            })
            .then((data) => helper.dataResponse(res, data, 'Account successfully created', 'No Account has been created'))
            .catch((err) => helper.errResponse(res, err));
    })
    .catch((err) => helper.errResponse(res, err));
}


//verify
exports.verifyAccount = (req, res) =>{
    
    
    //check
    helper.checkAuthorization(req, res, 'Citizen');


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

