const { errResponse, checkAuthorization, dataResponse } = require('../../helpers/controller.helper');
const db = require('../../models');


// Get Users Count
exports.getUsersCount = (req, res) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Super Admin');

    // Count frequency of user_type values
    db.Users
        .count({
            col: 'user_type',
            group: ['user_type']
        })
        .then((result) => {

            // Users Count Object
            usersCount = {
                all: 0,
                citizens: 0,
                representatives: 0,
                health_officials: 0,
                super_admins: 0
            }
            
            // Get each element in result
            result.forEach(el => {

                // Get count for each element
                var c = el.count

                // Get total users
                usersCount.all += c;

                // Get count per user
                if(el.user_type === 'Citizen')         usersCount.citizens         = c;
                if(el.user_type === 'Representative')  usersCount.representatives  = c;
                if(el.user_type === 'Health Official') usersCount.health_officials = c;
                if(el.user_type === 'Super Admin')     usersCount.super_admins     = c;
            });
            
            // Respond the userCount object
            res.send({ users_count: usersCount });
        })
        .catch(err => errResponse(res, err));
}


// Get All Citizens
exports.getAllCitizens = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Super Admin');
    
    db.Users
        .findAll({
            where: { 
                user_type: 'Citizen'
            },
            include: [{
                model: db.Addresses,
                as: 'address'
            }]
        })
        .then(data => dataResponse(res, data, 'Citizen records are retrieved successfully', 'No record of citizen has been retrieved'))
        .catch(err => errResponse(res, err))
}


// Get One Citizen
exports.getOneCitizen = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Super Admin');
    
    db.Users
        .findByPk(req.params.citizen_ID, {
            where: { 
                user_type: 'Citizen'
            },
            include: [{
                model: db.Addresses,
                as: 'address'
            }]
        })
        .then(data => dataResponse(res, data, 'Citizen records are retrieved successfully', 'No record of citizen has been retrieved'))
        .catch(err => errResponse(res, err))
}


// Options for fetching representative records
const representativesOp = {
    where: { 
        user_type: 'Representative' 
    },
    attributes: {
        exclude: [
            'birth_date',
            'sex',
            'civil_status',
        ]
    },
    include: [{
        model: db.Establishments,
        as: 'establishments_with_roles'
    }]
}


// Get All Representatives
exports.getAllRepresentatives = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Super Admin');
    
    db.Users
        .findAll(representativesOp)
        .then(data => dataResponse(res, data, 'Representative records are retrieved successfully', 'No record of representative has been retrieved'))
        .catch(err => errResponse(res, err))
}

// Get One Representative
exports.getOneRepresentative = (req, res) => {

    // Check authorization first
    checkAuthorization(req, res, 'Super Admin');
    
    db.Users
        .findByPk(req.params.representative_ID, representativesOp)
        .then(data => dataResponse(res, data, 'Representative records are retrieved successfully', 'No record of representative has been retrieved'))
        .catch(err => errResponse(res, err))
}


// Options for fetching health official records
const healthOffialsOp = {
    where: {
        user_type: 'Health Official'
    },
    include: {
        model: db.Users,
        as: 'ho_added_by',
        attributes: {
            exclude: [
                'address_ID',
                'birth_date',
                'sex',
                'civil_status',
                'created_datetime',
                'updated_datetime',
            ]
        }
    },
    attributes: {
        exclude: [
            'address_ID',
            'birth_date',
            'sex',
            'civil_status'
        ]
    }
}

// Get all health officials
exports.getAllHealthOfficials = (req, res) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Super Admin');
    
    db.Users
        .findAll(healthOffialsOp)
        .then(data => dataResponse(res, data, 'Health Official records are retrieved successfully', 'No record of health official has been retrieved'))
        .catch(err => errResponse(res, err))
}


// Get one health officials
exports.getOneHealthOfficial = (req, res) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Super Admin');
    
    db.Users
        .findByPk(req.params.health_official_ID, healthOffialsOp)
        .then(data => dataResponse(res, data, 'Health Official records are retrieved successfully', 'No record of health official has been retrieved'))
        .catch(err => errResponse(res, err))
}


// Options for fetching super admin records
const superAdminsOp = {
    where: {
        user_type: 'Super Admin'
    },
    include: {
        model: db.Users,
        as: 'sa_added_by',
        attributes: {
            exclude: [
                'address_ID',
                'birth_date',
                'sex',
                'civil_status',
                'created_datetime',
                'updated_datetime',
            ]
        }
    },
    attributes: {
        exclude: [
            'address_ID',
            'birth_date',
            'sex',
            'civil_status'
        ]
    }
}

// Get all health officials
exports.getAllSuperAdmins = (req, res) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Super Admin');
    
    db.Users
        .findAll(superAdminsOp)
        .then(data => dataResponse(res, data, 'Super admin records are retrieved successfully', 'No record of super admin has been retrieved'))
        .catch(err => errResponse(res, err))
}


// Get one super admin
exports.getOneSuperAdmin = (req, res) => {
    
    // Check authorization first
    checkAuthorization(req, res, 'Super Admin');
    
    db.Users
        .findByPk(req.params.super_admin_ID, superAdminsOp)
        .then(data => dataResponse(res, data, 'A super admin record has been identified', 'No record of super admin has been identified'))
        .catch(err => errResponse(res, err))
}