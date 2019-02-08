const mongoose = require('mongoose');
const _ = require('lodash');
const validator = require('validator');
const jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

/**
 * email: 'nikunj@gmail.com'
 * password: 'wyrqyrwuqteuiqtieuqiueqiu'
 * tokens: [{
 * access: 'auth',
 * token: 'lhlkhlwkhdlkhlkhdwlkhldw'
 * }]
 */

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: props => `${props.value} is not a valid EmailID`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// BuiltIn Method
userSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};

// Custom Method
userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'someSecret').toString();

    user.tokens.push({access, token});
    return user.save().then(() => {
        return token;
    });
};

module.exports = {
    userSchema
};