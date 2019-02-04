const {userSchema} = require('../schema/userSchema');
const mongoose = require('mongoose');

var User = mongoose.model('User', userSchema);
module.exports = {
    User
};