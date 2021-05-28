/**
 * INFORMATION CONTROLLER
 * 
 * This controller is for properties related to user information
 */

const db = require("../../models");
const User = db.User;


// Return the information of the citizen
exports.getInfo = (req, res, next) => {
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

exports.updateInfo = (req, res) => {
    const id = req.params.id;

// update the information of the citizen
    User.update_info(req.body, {
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