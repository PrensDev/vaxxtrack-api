// Check the authorization of the user
exports.checkAuthorization = (req, res, userType) => {

    // Check if userType param is null
    if(userType == null) return res.status(500).send('`userType` parameter is required');

    // Check if userType param has valid value
    const validUserType = 
        userType === 'Citizen'         ||
        userType === 'Representative'  ||
        userType === 'Health Official' ||
        userType === 'Super Admin';

    // Validate userType parameter 
    if(!validUserType) return res.status(500).send('The value for `userType` parameter is invalid');
    
    // Check if user is not authorized
    if(req.user == null || req.user.user_type !== userType) return res.sendStatus(401);
}


// Error response
exports.errResponse = (res, err) => {
    return res.status(500).send({
        error: true,
        message: `${err}`
    });
}


// Response with data
exports.dataResponse = (res, data, withDataMsg, nullDataMsg) => {
    
    // If no data return empty response
    if (data == null) return res.send({
        error: false,
        message: nullDataMsg
    });

    // else return response with data
    return res.send({
        error: false,
        data: data,
        message: withDataMsg
    });
}


// Response without data
exports.emptyDataResponse = (res, message) => {
    return res.send({
        error: false,
        message: message
    });
}