/**
 * INFORMATION CONTROLLER
 * 
 * This controller is for properties related to user information
 */

const db = require("../../models");
<<<<<<< Updated upstream
const User = db.Users;
const bcrypt = require("bcrypt");
=======
const User = db.User;
>>>>>>> Stashed changes


// Return the information of the citizen
exports.getInfo = (req, res, next) => {
    if(req.user.user_type === 'Citizen') {
<<<<<<< Updated upstream
            const id = req.user.user_ID;
            console.log(id)
          
            User.findByPk(id)
              .then((data) => {
                res.send({
                  error: false,
                  data: data,
                  message: ['[citizen] record retrieves successfully'],
=======
        const user_ID = req.user.user_ID;
        
        User.findByPk(user_ID)
            .then((data) => {
                res.send({
                    error: false,
                    data: data,
                    message: [process.env.SUCCESS_RETRIEVED],
>>>>>>> Stashed changes
                });
            })
                .catch((err) => {
                res.status(500).send({
<<<<<<< Updated upstream
                  error: true,
                  data: [],
                  message:
                    err.errors.map((e) => e.message),
=======
                    error: true,
                    data: [],
                    message:
                    err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
>>>>>>> Stashed changes
                });
            });
    } else {
        res.sendStatus(403);
    }
}

<<<<<<< Updated upstream
// update the information of the citizen
exports.update = (req, res) => {
    const id = req.params.id;
    req.body.full_name = "";

    User.update(req.body, {
=======
exports.updateInfo = (req, res) => {
    const id = req.params.id;
    req.body.full_name = "";

// update the information of the citizen
    User.update_info(req.body, {
>>>>>>> Stashed changes
        where : { id : id }
    }).then((result) => {
        console.log(result);
        if (result){
            // success
            User.findByPk(id).then((data) => {
                res.send({
                    error : false,
                    data : data,
                    message : 'Citizen record has been updated',
                });
            });
        } else {
            // error in updating
            res.status(500).send({
                error: true,
                data: [],
                message: ["Error in updating a record"],
            });
        }
    })
}