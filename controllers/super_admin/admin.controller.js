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
                        as: 'roled_by',
                        attributes: {
                            exclude: ['password']
                        }
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


// Get One Establishment
exports.getOneEstablishment = (req, res, next) => {

    // Check if user was not logged in or logged in but not Super Admin
    if(req.user == null || req.user !== 'Super Admin') {
        res.sendStatus(403);
    } else {
        db.Establishments
            .findByPk(req.params.establishment_ID, {
                include: [
                    {
                        model: db.Addresses,
                        as: 'address'
                    }, {
                        model: db.Users,
                        as: 'role_by',
                        attributes: {
                            exclude: ['password']
                        }
                    }
                ]
            })
            .then((data) => {
                if(data) {
                    res.send({
                        err: false,
                        data: data,
                        message: 'An establishment has been successfully identified'
                    });
                } else {
                    res.status(500).send({
                        error: true,
                        message: 'Establishment is not found'
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    error: true,
                    message: ['Oops! Error occured', `${err}`]
                })
            })
    }
}


// Get All Cases
exports.getAllCases = (req, res, next) => {
    
    // Check if user was not logged in or logged in but not Super Admin
    if(req.user == null || req.user !== 'Super Admin') {
        res.sendStatus(403);
    } else {

        // Retreive all case records
        db.Case_Information
            .findAll({
                include: {
                    model: db.Contacts,
                    as: 'contacts'
                }
            })
    }
}