/**
 * LOGIN CONTROLLER
 * 
 * This controller is for user login
 */


// Import Required Modules/Packages
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const db        = require("../../models");
const { errResponse, emptyDataResponse } = require('../../helpers/controller.helper');


// Dotenv Configuration
require('dotenv').config();


// Generate token
const generateToken = (data) => { 
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '4800s' }); 
}


// Login Controller
exports.login = (req, res) => {
    
    // Check if authDetails and password field is empty
    if (String(req.body.authDetails) === '' || String(req.body.password) === '') {
        return res.status(500).send({
            error   : true,
            message : "Fields cannot be empty",
        });
    } 
    
    db.User_Accounts
        .findOne({
            where: { 
                details  : req.body.authDetails,
                verified : 1,
            },
            include: {
                model : db.Users,
                as    : 'user',
            },              
        })
        .then((data) => {

            // If no data then send empty response
            if (data == null) emptyDataResponse(res, 'That user does not exist');

            // Else validate password
            bcrypt.compare(req.body.password, data.user.password, (err, result) => {
                if (result) {
                    res.send({
                        error   : false,
                        data    : data,
                        token   : generateToken({ 
                            user_ID   : data.user.user_ID, 
                            user_type : data.user.user_type, 
                        }),
                        message : "A user has been successfully identified",
                    });
                } else {
                    res.send({
                        error   : true,
                        message : "Invalid details or password",
                    });
                }
            })
        })
        .catch((err) => errResponse(res, err));
}
