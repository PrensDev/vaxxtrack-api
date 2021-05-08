// Display the page
exports.render = (req, res, next) => {
    if(req.user.user_type == 'Representative') {
        res.send('This is a index page for representatives');
    }
}