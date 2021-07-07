/**
 * =====================================================================
 * * REGISTER CONTROLLER
 * =====================================================================
 * This controller is for user registration
 * =====================================================================
 */


// Import models
const db     = require("../../models");
const { dataResponse, errResponse, emptyDataResponse } = require('../../helpers/controller.helper');
const nodemailer = require('nodemailer');


// For One-Time Pin
var otp;
const generateOTP = () => {
    do { otp = parseInt(1 + (Math.random() * 1000000)) } while(otp > 1000000 && otp < 9999999);
}


// Check Account
exports.checkAccount = (req, res) => {
    db.User_Accounts
        .findAll({ where: { details: req.body.details }})
        .then(data => dataResponse(res, data, 'This account is already used', 'This account is available'))
        .catch(err => errResponse(res, err));
}


// Send One-Time Pin
exports.sendVerification = async (req, res) => {
    const { email, password } = req.body;

    generateOTP();

    data = {
        email: email,
        password: password,
        otp: otp
    }

    console.log(data);

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: email, // generated ethereal user
            pass: password, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"C19CTAVMS" <noreply@c19ctavms.com>`, // sender address
        to: email, // list of receivers
        subject: "One-Time Pin for Verification", // Subject line
        text: `Your OTP is ${ otp }`, // plain text body
    });

    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    dataResponse(res, { otp: otp }, 'Otp is created', 'No otp is created');
}

// Verify One-Time Pin
exports.verifyOTP = (req, res) => {
    const { user_otp } = req.body;

    if(parseInt(user_otp) === otp) {
        res.send({ matched: true });
    } else {
        res.send({ matched: false });
    }
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
                .then(data => dataResponse(res, data, 'A new representative has been registered', 'Representative was not registered'))
                .catch(err => errResponse(res, err));
        })
        .catch(err => errResponse(res, err));
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
                .then(data => dataResponse(res, data, 'A new citizen has been registered', 'Citizen was not registered'))
                .catch(err => errResponse(res, err));
        })
        .catch(err => errResponse(res, err));
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
                .then(data => dataResponse(res, data, 'A new Super Admin has been registered', 'Super Admin was not registered'))
                .catch(err => errResponse(res, err));
        })
        .catch(err => errResponse(res, err));
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
                .then(data => dataResponse(res, data, 'A new Health Official has been registered', 'Health Official was not registered'))
                .catch(err => errResponse(res, err));
        })
        .catch(err => errResponse(res, err));
}