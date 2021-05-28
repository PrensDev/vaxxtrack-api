/**
 * INFORMATION CONTROLLER
 * 
 * This controller is for properties related to user information
 */

// Todo: include the properties here
const db = require("../../models");
const User = db.User;
const bcrypt = require("bcrypt");

// return the information of the representative
exports.getInfo = (req, res, next) => {
    if(req.user.user_type === 'Representative') {
        const user_ID = req.user.user_ID;
        
        User.findByPk(user_ID)
            .then((data) => {
                res.send({
<<<<<<< Updated upstream
                  error: false,
                  data: data,
                  message: ["Successfully retrieved the data"],
=======
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
                  message: ["Error in retrieving the data"],
=======
                    error: true,
                    data: [],
                    message: err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
>>>>>>> Stashed changes
                });
        });
    } else {
        res.sendStatus(403);
    }
}

<<<<<<< Updated upstream
exports.update_info = async (req, res) => {
    const id = req.user.user_ID;
=======
exports.updateInfo = async (req, res) => {
    const id = req.params.id;
>>>>>>> Stashed changes
    req.body.full_name = "";

    if (req.body.password) {
        req.body.password = await bcrypt.hash(
            req.body.password,
            parseInt(process.env.SALT_ROUND)
        ); 
    }
// update the information of the representative
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
                    message : ["Successfully updated"],
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