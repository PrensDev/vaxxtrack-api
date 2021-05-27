/**
 * INFORMATION CONTROLLER
 * 
 * This controller is for properties related to user information
 */

// Todo: include the properties here
const db = require("../../models");
const User = db.User;
const bcrypt = require("bcrypt");


exports.get_info = (req, res, next) => {
    if(req.user.user_type === 'Citizen') {
        res.send({ token_data: req.user });
    } else {
        res.sendStatus(403);
    }
}

exports.update_info = async (req, res) => {
    const id = req.params.id;
    req.body.full_name = "";

    if (req.body.password) {
        req.body.password = await bcrypt.hash(
            req.body.password,
            parseInt(process.env.SALT_ROUND)
        ); 
    }

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
                    message : process.env.SUCCESS_UPDATE,
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