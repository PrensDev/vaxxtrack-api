/**
 * LOGIN CONTROLLER
 * 
 * This controller is for user login
 */


// Import Required Modules/Packages
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const db        = require("../../models");


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
        res.status(500).send({
            error   : true,
            data    : [],
            message : ["Fields cannot be empty"],
        });
    } else {
        db.User_Accounts
            .findOne({
                where: { 
                    details     : req.body.authDetails,
                    verified    : 1,
                },
                include: {
                    model   : db.Users,
                    as      : 'user',
                },              
            })
            .then((data) => {
                if (data) {
                    bcrypt.compare(req.body.password, data.user.password, (err, result) => {
                        if (result) {
                            res.send({
                                error   : false,
                                data    : data,
                                token   : generateToken({ 
                                    user_account_ID : data.user_account_ID,
                                    user_ID         : data.user.user_ID, 
                                    user_type       : data.user.user_type, 
                                    account_details : data.details
                                }),
                                message : ["A user is successfully identified"],
                            });
                        } else {
                            res.status(500).send({
                                error   : true,
                                data    : [],
                                message : ["Invalid details or password"],
                            });
                        }
                    })
                } else {
                    res.status(500).send({
                        error   : true,
                        data    : [],
                        message : ["User does not exists"],
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    error   : true,
                    data    : [],
                    message : ['Opps! Error caught!', `${ err }`],
                })
            });
    }
}
