/**
 * =====================================================================
 * * LOGIN CONTROLLER
 * =====================================================================
 * This controller is for user login
 * =====================================================================
 */


// Import Required Modules/Packages
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const db     = require("../../models");
const { errResponse, emptyDataResponse } = require('../../helpers/controller.helper');


// Dotenv Configuration
require('dotenv').config();


// Generate token
const generateToken = (data) => { 
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '12h' }); 
}


// Login Controller
exports.login = (req, res) => {
    
    // Check if authDetails and password field is empty
    if (String(req.body.authDetails) === '' || String(req.body.password) === '') {
        return res.status(500).send({
            error   : true,
            message : "Details and Password cannot be empty",
        });
    } 
    
    db.User_Accounts
        .findOne({
            where: { 
                details  : req.body.auth_details,
                verified : 1,
            },
            attributes: [],
            include: {
                model      : db.Users,
                as         : 'user',
                attributes : ['user_ID', 'user_type', 'password']
            },              
        })
        .then((data) => {

            // If no data then send empty response
            if (data == null) return emptyDataResponse(res, 'That user does not exist');

            // Else validate password
            bcrypt.compare(req.body.password, data.user.password, (err, hasResult) => {

                // Display error if exists
                if(err) console.log(err);
                
                // If no result then send empty reponse
                if(!hasResult) return emptyDataResponse(res, 'Invalid details or password');
                
                // Else send reponse with data
                const user_ID = data.user.user_ID;
                const user_type = data.user.user_type;
                
                res.send({
                    error: false,
                    data: {
                        user_ID: user_ID,
                        user_type: user_type,
                        token: generateToken({ 
                            user_ID   : user_ID, 
                            user_type : user_type, 
                        }),
                    },
                    message: "A user has been successfully identified",
                });
            })
        })
        .catch((err) => errResponse(res, err));
}
