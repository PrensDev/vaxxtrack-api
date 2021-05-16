const db = require('../models');

exports.test = (req, res, next) => {
    db.Users
        .findAll()
        .then((data) => {
            res.send({
                data: data
            })
        })
}