/**
 * ACCOUNT CONTROLLER
 * 
 * This controller is for administration
 */


// Import necessary packages
const db     = require('../../models');
const helper = require('../../helpers/controller.helper');


// db.Users option
const dbUsersOp = {
    attributes: {
        exclude: ['password']
    },
    include: {
        model: db.User_Accounts,
        as: 'user_accounts'
    }
}


// db.Establishments option
const dbEstablishmentsOp = {
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
}


// Get All Users
exports.getAllUsers = (req, res) => {
    
    // Check authorization first
    helper.checkAuthorization(req, res, 'Super Admin');

    // Find all users
    db.Users
        .findAll(dbUsersOp)
        .then((data) => helper.dataResponse(res, data, 'Users retrieved successfully', 'No user has been identified'))
        .catch((err) => helper.errResponse(res, err));
};


// Get One User
exports.getOneUser = (req, res, next) => {

    // Check authorization first
    helper.checkAuthorization(req, res, 'Super Admin');

    // Find one users
    db.Users
        .findByPk(req.params.user_ID, dbUsersOp)
        .then((data) => helper.dataResponse(res, data, 'A user has been identified', 'No user has been identified'))
        .catch((err) => helper.errResponse(res, err));
}


// Get All Establishments
exports.getAllEstablishments = (req, res, next) => {

    // Check authorization first
    helper.checkAuthorization(req, res, 'Super Admin');

    db.Establishments
        .findAll(dbEstablishmentsOp)
        .then((data) => helper.dataResponse(res, data, 'Establishments and its information has been identified', 'No establishment has been identified'))
        .catch((err) => helper.errResponse(res, err));
}


// Get One Establishment
exports.getOneEstablishment = (req, res, next) => {
  
    // Check authorization first
    helper.checkAuthorization(req, res, 'Super Admin');

    db.Establishments
        .findByPk(req.params.establishment_ID, dbEstablishmentsOp)
        .then((data) => helper.dataResponse(res, data, 'An establishment and its information has been identified', 'No establishment has been identified'))
        .catch((err) => helper.errResponse(res, err));
}