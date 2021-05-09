exports.render = (req, res, next) => {
    if(req.user.user_type === 'Citizen') {
        res.send({ token_data: req.user });
    } else {
        res.sendStatus(403);
    }
}