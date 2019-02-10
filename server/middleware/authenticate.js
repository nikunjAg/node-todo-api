const {User} = require('./../model/userModel');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    // Now this token must be searched in the database using model
    User.findByToken(token)
    .then((user) => {
        if (!user)
            return Promise.reject();
        req.user = user;
        req.token = token;
        next();
    })
    .catch((e) => {
        res.status(401).send();
    });
};

module.exports = {
    authenticate
};