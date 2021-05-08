const db = require("../../models");

// Register a representative including its establishment
exports.representative = (req, res) => {
    db.Users
        .create(req.body, {
            include: [{
                model: db.User_Accounts,
                as: 'user_accounts'
            }, {
                model: db.Establishments,
                as: 'establishments_with_roles',
                include: [{
                    model: db.Addresses,
                    as: 'address'
                }]
            }]
        })
        .then((data) => {
            db.Users
                .findByPk(data.user_ID, {
                    include: [{
                        model: db.User_Accounts,
                        as: 'user_accounts'
                    }, {
                        model: db.Establishments,
                        as: 'establishments_with_roles',
                        include: [{
                            model: db.Addresses,
                            as: 'address'
                        }]
                    }]
                })
                .then((result) => {
                    res.send({
                        err     : false,
                        data    : result,
                        msg     : 'A new Representative has been registered!'
                    })
                })
                .catch((err) => {
                    res.status(500).send({
                        error   : true,
                        data    : [],
                        message : ['Opps! Error caught!', `${ err }`],
                    });
                });
        })
        .catch((err) => {
            res.status(500).send({
                error   : true,
                data    : [],
                message : ['Opps! Error caught!', `${ err }`],
            });
        });
}