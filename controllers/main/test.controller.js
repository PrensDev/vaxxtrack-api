const db = require("../../models");

/* THIS IS FOR TESTING PURPOSES ONLY */

// Find All Users
exports.findAllUsers = (req, res, next) => {
    db.Users
        .findAll()
        .then((data) => {
            res.send({
                err: false,
                data: data,
                msg: '[users] records have been loaded'
            })
        })
}

// Find One User
exports.findOneUser = (req, res, next) => {
    db.Users
        .findOne(req.body.id)
        .then((data) => {
            res.send({
                err: false,
                data: data,
                msg: '[users] records are loaded'
            })
        });
}

// Find All Representatives
exports.findAllRepresentatives = (req, res, next) => {
    db.Users
        .findAll({
            where: {
                user_type: 'Representative'
            }
        })
        .then((data) => {
            res.send({
                err: false,
                data: data,
                msg: '[representative] records are loaded'
            })
        });
}