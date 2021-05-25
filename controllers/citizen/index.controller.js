/**
 * INDEX CONTROLLER
 * 
 * This controller is for testing purposes only
 * This will be remove later
 */

exports.render = (req, res, next) => {
    if(req.user.user_type === 'Citizen') {
        res.send({ token_data: req.user });
    } else {
        res.sendStatus(403);
    }
}