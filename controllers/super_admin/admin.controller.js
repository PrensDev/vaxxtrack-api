const db = require('../../models');

// Get All Users
exports.getAllUsers = (req, res, next) => {
    
    // Check if user was not logged in or logged in but not Super Admin
    if(req.user == null || req.user.user_type !== 'Super Admin') {
        res.sendStatus(403);
    } else {

        // Find all users
        db.Users
            .findAll({
                attributes: {
                    exclude: ['password']
                },
                include: {
                    model: db.User_Accounts,
                    as: 'user_accounts'
                }
            })
            .then((data) => {
                res.send({
                    error: false,
                    data: data,
                    message: 'Users retrived successfully'
                })
            })
            .catch((err) => {
                res.send({
                    error: true,
                    message: ['Oops! Error occured.', `${err}`]
                })
            })
    }
};

exports.getOneUser = (req, res, next) => {

    // Check if user was not logged in or logged in but not Super Admin
    if(req.user == null || req.user.user_type !== 'Super Admin') {
        res.sendStatus(403);
    } else {

        // Find one users
        db.Users
            .findByPk(req.params.user_ID, {
                attributes: {
                    exclude: ['password']
                },
                include: {
                    model: db.User_Accounts,
                    as: 'user_accounts'
                }
            })
            .then((data) => {
                if(data) {
                    res.send({
                        error: false,
                        data: data,
                        message: 'A user has been identified'
                    });
                } else {
                    res.send({
                        error: false,
                        message: 'User does not found'
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    error: true,
                    message: ['Oops! Error occured.', `${err}`]
                })
            })
    }
}

// Get All Establishments
exports.getAllEstablishments = (req, res, next) => {

    // Check if user was not logged in or logged in but not Super Admin
    if(req.user == null || req.user !== 'Super Admin') {
        res.sendStatus(403);
    } else {

        // Find all establishments
        db.Establishments
            .findAll({
                include: [
                    {
                        model: db.Addresses,
                        as: 'address'
                    }, {
                        model: db.Users,
                        as: 'roled_by'
                    }
                ]
            })
            .then((data) => {
                if(data) {
                    res.send({
                        error: false,
                        data: data,
                        message: 'Establishments has been successfully retrieved'
                    })
                } else {
                    res.send({
                        error: false,
                        message: 'No establishment has been retrieved'
                    })
                }
            })
            .catch((err) => {
                res.status(500).send({
                    error: false,
                    message: ['Oops! Error occured.', `${err}`]
                })
            })
    }
}