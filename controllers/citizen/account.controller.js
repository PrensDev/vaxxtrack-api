/**
 * ACCOUNT CONTROLLER
 * 
 * This controller is for managing account settings of citizens
 */

const db = require("../../models");
const User = db.User;
const bcrypt = require("bcrypt");


exports.get_password = (req, res, next) => {
    if(req.user.user_password === 'password') {
        res.send({ token_data: req.user });
    } else {
        res.sendStatus(403);
    }
}

exports.update_password = async (req, res) => {
    const id = req.params.id;
    req.body.full_name = "";

    if (req.body.password) {
        req.body.password = await bcrypt.hash(
            req.body.password,
            parseInt(process.env.SALT_ROUND)
        ); 
    }

    User.update_password(req.body, {
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
                message: ["Error in updating your password"],
            });
        }
    })
}