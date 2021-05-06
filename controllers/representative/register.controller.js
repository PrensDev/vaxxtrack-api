const db = require("../../models");

// Register a representative including its establishment
exports.register = (req, res) => {
    db.Users
        .create(req.body, {
            include: [
                {
                    model: db.User_Accounts,
                    as: 'user_accounts'
                }, {
                    model: db.Roles,
                    as: 'role_as_representative',
                    include: [{
                        model: db.Establishments,
                        as: 'establishment',
                        include: [{
                            model: db.Addresses,
                            as: 'address',
                        }]
                    }]
                }
            ]
        })
        .then((data) => {
            db.Users
                .findByPk(data.representative_ID, {
                    include: [
                        {
                            model: db.User_Accounts,
                            as: 'user_account'
                        }, {
                            model: db.Roles,
                            as: 'role_to_establishment',
                            include: [{
                                model: db.Establishments,
                                as: 'establishment',
                                include: [{
                                    model: db.Addresses,
                                    as: 'address',
                                }]
                            }]
                        }
                    ]
                })
                .then((result) => {
                    res.send({
                        err     : false,
                        data    : result,
                        msg     : `\n==> A new Representative has been registered\n`
                    })
                })
                .catch((err) => {
                    console.log(`\n===============>>>\nOpps! Error Caught!\n${ err }\n===============>>>\n`);
                })
        })
        .catch((err) => {
            console.log(`\n===============>>>\nOpps! Error Caught!\n${ err }\n===============>>>\n`);
        });
}