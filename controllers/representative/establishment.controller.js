const db = require("../../models");


// Find all establishment
exports.findAll = (req, res, next) => {
    if(req.user.user_type !== 'Representative') {
        res.sendStatus(403);
    } else {
        db.Establishments
            .findAll({
                include: [
                    {
                        model   : db.Addresses,
                        as      : 'address',
                    }, {
                        model   : db.Users,
                        as      : 'representatives_and_roles'
                    }
                ],
            })
            .then((data) => {
                res.send({
                    error   : false,
                    data    : data,
                    message : ['[establishments] record retrieves successfully'],
                });
            })
            .catch((err) => {
                res.status(500).send({
                    error   : false,
                    data    : data,
                    message : ['Oops! Error caught!', `${ err }`],
                });
            });
    }
}


// Find an establishment
exports.find = (req, res, next) => {
    db.Establishments
        .findOne({
            where: {
                establishment_ID: req.params.id,
            },
            include: {
                model   : db.Addresses,
                as      : 'address'
            }
        })
        .then((data) => {
            res.send({
                error   : false,
                data    : data,
                message : ['An establishment is identified'],
            });
        })
        .catch((err) => {
            res.status(500).send({
                error   : false,
                data    : data,
                message : ['Oops! Error caught!', `${ err }`],
            });
        })
}


// Update an establishment
