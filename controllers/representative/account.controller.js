/**
 * ACCOUNT CONTROLLER
 * 
 * This controller is for managing account settings of representatives
 */

// Todo: include the properties here

const db = require("../../models");
const Users = db.Users;
const bcrypt = require("bcrypt");


exports.update = async (req, res) => 
{
    const id = req.params.id;
    req.body.full_name = "";

    if (req.body.password) 
    {
        req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS));
    }

    Users.update(req.body,
        {
            where: {user_ID: id},
        })
        .then((result) => 
        {
            if(result)
            {
                console.log(result);
                //success
                Users.findByPk(id).then((data) =>
                {
                    res.send(
                        {
                            error: false,
                            data: data,
                            message: [process.env.SUCCESS_UPDATE],
                        })
                })
            }
            else
            {
                // error in updating
                res.status(500).send(
                    {
                        error: true,
                        data: [],
                        message: ["Error in updating a record."],
                    });
            }
        })
        .catch((err) =>
        {
            console.log(err);
            res.status(500).send(
                {
                    error: true,
                    data: [],
                    message: err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
                });
        });
};