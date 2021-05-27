/**
 * INFORMATION CONTROLLER
 * 
 * This controller is for properties related to user information
 */

// Todo: include the properties here
const db = require("../../models");

exports.get_info = (req, res, next) => {
    if(req.user.user_type === 'Citizen') {
        res.send({ token_data: req.user });
    } else {
        res.sendStatus(403);
    }
}