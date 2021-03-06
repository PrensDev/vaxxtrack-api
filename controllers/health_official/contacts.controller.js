/**
 * ==================================================================
 * * CONTACTS CONTROLLER
 * ------------------------------------------------------------------
 * This controller is for managing probable contacts
 * ==================================================================
 */


// Import required packages
const db = require('../../models');
const { checkAuthorization, dataResponse, errResponse, emptyDataResponse } = require('../../helpers/controller.helper');


// Get All Probable Contacts
exports.getAllProbableContacts = (req, res) => {
    checkAuthorization(req, res, 'Health Official');

    db.Users
        .findAll({
            where: { user_type: 'Citizen' },
            include: [{
                model: db.Addresses,
                as: 'address'
            }]
        })
        .then(data => dataResponse(res, data, 'Probable Contacts are retreived successfully', 'No probable contacts are retrieved'))
        .catch(err => errResponse(res, err));
}


// Add Contact
exports.addContact = (req, res) => {
    checkAuthorization(req, res, 'Health Official');
    db.Contacts.create(req.body);
}


// Get All Contacts
exports.getAllContacts = (req, res) => {
    checkAuthorization(req, res, 'Health Official');
    db.Contacts
        .findAll({
            include: [
                {
                    model: db.Users,
                    as: 'probable_contact',
                    attributes: {
                        exclude: [
                            'password',
                            'added_by',
                            'user_type',
                            'created_datetime',
                            'updated_datetime'
                        ]
                    }
                }, {
                    model: db.Case_Information,
                    as: 'case_information'
                }
            ]
        })
        .then(data => dataResponse(res, data, 'Contacts are retrieved successfully', 'No contacts has been retrieved'))
        .catch(err => errResponse(res, err))
}


// Get Contact Information
exports.getContactInfo = (req, res) => {
    checkAuthorization(req, res, 'Health Official');
    
    db.Contacts
        .findByPk(req.params.contact_ID, {
            include: [
                {
                    model: db.Users,
                    as: 'probable_contact',
                    attributes: {
                        exclude: [
                            'added_by',
                            'password',
                            'created_datetime',
                            'updated_datetime'
                        ]
                    },
                    include: [
                        {
                            model: db.Addresses,
                            as: 'address',
                            attributes: {
                                exclude: [
                                    'created_datetime',
                                    'updated_datetime'
                                ]
                            }
                        }, {
                            model: db.User_Accounts,
                            as: 'user_accounts',
                            attributes: {
                                exclude: [
                                    'created_datetime',
                                    'updated_datetime'
                                ]
                            }
                        }
                    ]
                }, {
                    model: db.Case_Information,
                    as: 'case_information',
                    attributes: {
                        exclude: [
                            'created_datetime',
                            'updated_datetime'
                        ]
                    }
                }
            ]
        })
        .then(data => dataResponse(res, data, 'Contact Information retrieved successfully', 'No contact information has been retrieved'))
        .catch(err => errResponse(res, err));
}