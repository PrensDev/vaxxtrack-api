const { errResponse, checkAuthorization } = require('../../helpers/controller.helper');
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