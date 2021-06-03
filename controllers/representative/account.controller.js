/**
 * ACCOUNT CONTROLLER
 * 
 * This controller is for managing account settings of representatives
 */


// Import models and bcrypt for this controller
const db     = require("../../models");
const helper = require("../../helpers/controller.helper");
const bcrypt = require('bcrypt');


// Update Password
exports.updatePassword = (req, res) =>  {

    // Check authorization first
    helper.checkAuthorization(req, res, 'Representative');

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

