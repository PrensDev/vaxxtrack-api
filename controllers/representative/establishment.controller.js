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
                        as      : 'representatives_and_roles',
                        where   : {
                            user_ID:  req.user.user_ID
                        }
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
                    message : ['Oops! Error caught!', `${ err }`],
                });
            });
    }
}


// Find an establishment
exports.find = (req, res, next) => {
    if(req.user.user_type !== 'Representative') {
        res.sendStatus(403);
    } else {
        db.Establishments
            .findOne({
                where: {
                    establishment_ID: req.params.id,
                },
                include: [
                    {
                        model   : db.Addresses,
                        as      : 'address',
                    }, {
                        model   : db.Users,
                        as      : 'representatives_and_roles',
                        where   : {
                            user_ID: req.user.user_ID
                        }
                    }
                ]
            })
            .then((data) => {
                if(data) {
                    res.send({
                        error   : false,
                        data    : data,
                        message : ['An establishment is identified'],
                    });
                } else {
                    res.status(404).send({
                        error   : true,
                        message : 'Establishment not found',
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    error   : true,
                    message : ['Oops! Error caught!', `${ err }`],
                });
            })
    }
}


// Update an establishment
exports.update = (req, res, next) => {
    if(req.user.user_type !== 'Representative') {
        res.sendStatus(403);
    } else {
        if(req.params.id == null) {
            res.status(500).send({
                error   : true,
                message : 'Parameter id is required',
            });
        } else {
            db.Establishments
                .update(req.body, {
                    where: {
                        establishment_ID: req.params.id
                    }
                })
                .then((result) => {
                    if(result) {
                        db.Establishments
                            .findByPk(req.params.id, {
                                include: {
                                    model   : db.Addresses,
                                    as      : 'address'
                                }
                            })
                            .then((data) => {
                                res.send({
                                    error   : false,
                                    data    : data,
                                    message : 'An establishment has been updated'
                                })
                            })
                            .catch((err) => {
                                res.status(500).send({
                                    error   : true,
                                    message : ['Oops! Error caught!', `${ err }`],
                                });
                            });
                    } else {
                        res.status(500).send({
                            error   : true,
                            message : 'There was an error in updating an establishment',
                        });
                    }
                })
                .catch((err) => {
                    res.status(500).send({
                        error   : true,
                        message : ['Oops! Error caught!', `${ err }`],
                    });
                });
        }
    }
}