/**
 * INFORMATION CONTROLLER
 * 
 * This controller is for properties related to user information
 */

// Todo: include the properties here
const db = require("../../models");
const User = db.Users;
const bcrypt = require("bcrypt");


// return the information of the citizen
exports.get_info = (req, res, next) => {
    if(req.user.user_type === 'Citizen') {
            const id = req.user.user_ID;
            console.log(id)
          
            User.findByPk(id)
              .then((data) => {
                res.send({
                  error: false,
                  data: data,
                  message: ['[citizen] record retrieves successfully'],
                });
              })
              .catch((err) => {
                res.status(500).send({
                  error: true,
                  data: [],
                  message:
                    err.errors.map((e) => e.message),
                });
              });
    } else {
        res.sendStatus(403);
    }
}

// update the information of the citizen
exports.update = (req, res) => {
    const id = req.params.id;
    req.body.full_name = "";

    User.update(req.body, {
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