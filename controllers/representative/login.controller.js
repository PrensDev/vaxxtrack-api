const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const db        = require("../../models");


// Secret token (for testing purposes)
secret_token = "f4b00bca46123d5ec0ab4e8221b8a403d6e2e46a4710821b7290abd931376aa92a148dec25109c627379414a1d257bd45ef8d66e76b3637368b0859415a5b0a4"


// Generate token
const generateToken = (data) => {
    return jwt.sign(data, secret_token, {
        expiresIn: '4800s'
    });
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
                    as      : 'representative'
                },
            })
            .then((data) => {
                if (data) {
                    bcrypt.compare(req.body.password, data.representative.password, (err, result) => {
                        if (result) {
                            res.send({
                                error   : false,
                                data    : data,
                                token   : generateToken({ 
                                    user_account_ID : data.user_account_ID,
                                    user_ID         : data.user_ID, 
                                    account_details : data.accountDetails
                                }),
                                message : ["A representative is successfully identified"],
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