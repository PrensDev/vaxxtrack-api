// Render Controller
exports.render = (req, res, next) => {
    res.send('This is a index page');
}

const db = require('../../models');

// Sample Controller
exports.sample = (req, res, next) => {
    db.Users
        .findAll()
        .then((data) => {
            res.send({
                data: data
            })
        })
        .catch((err) => {
            res.send({
                error: err
            })
        })
}