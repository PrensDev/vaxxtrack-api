/**
 * ============================================================================
 * * CONTROLLER HELPERS
 * ----------------------------------------------------------------------------
 * This are custom-defined methods used for eliminating repetitive blocks of
 * code in controller files
 * 
 * @author PrensDev
 * ============================================================================
 */


/**
 * Check the authorization of the user
 * 
 * @param {*} req - throw the request parameter here 
 * @param {*} res - throw the response parameter here
 * @param {*} userType - set the type of user that is authorized only
 * @returns 
 */
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
    if(req.user == null && req.user.user_type !== userType) return res.sendStatus(401);
}


/**
 * This will return an internal server error (500) response.
 * Commonly called in catch promise to return error message
 * 
 * @param {*} res - throw the response parameter here
 * @param {*} err - throw the error parameter here from catch() or set a custom error message
 * @returns 
 */
exports.errResponse = (res, err) => {
    return res.status(500).send({
        error: true,
        message: `${err}`
    });
}


/**
 * This will return an OK (200) response regardless if doesn't have data.
 * 
 * @param {*} res - throw the response parameter here
 * @param {*} data - set the data object here
 * @param {*} withDataMsg - set a custom message here if has data
 * @param {*} nullDataMsg - set a custom message here if no data
 * @returns 
 */
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


/**
 * This is used for empty data responses
 * This will return an OK (200) response with custom message.
 * 
 * @param {*} res - throw the response parameter here
 * @param {*} message - set a custom message here for empty data
 * @returns 
 */
exports.emptyDataResponse = (res, message) => {
    return res.send({
        error: false,
        message: message
    });
}