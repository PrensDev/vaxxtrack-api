/**
 * ACCOUNT CONTROLLER
 * 
 * This controller is for managing account settings of representatives
 */

const Users  = require("../../models").Users;
const bcrypt = require('bcrypt');


// Update Password
exports.updatePassword = (req, res) =>  {

    // Check if user is not logged in or not representative
    if (req.user == null || req.user.user_type !== 'Representative') {
        
        // Send Forbidden response
        res.sendStatus(403);

    } else {

        // Get password from req.body
        var password = req.body.password;

        // Check if password is null
        if (password == null || password == '') {
            res.status(500).send({
                error: false,
                message: 'Password is required'
            });
        } else { 
            
            // Encrypt password before update
            password = bcrypt.hashSync(password, 10);

            // Update user password
            Users
                .update({
                    password: password
                }, {
                    where: {
                        user_ID: req.user.user_ID
                    }
                })
                .then(() => {
                    res.send({
                        error: false,
                        message: 'Password has been successfully changed',
                    });
                })
                .catch((err) => {
                    res.status(500).send({
                        error: true,
                        message: `${ err }`,
                    });
                });
        }
    }
};