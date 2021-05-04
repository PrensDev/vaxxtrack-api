const Users = require("../../models/users");

// Display the page
exports.render = (req, res, next) => {
    res.send('This is a index page for representatives');
}