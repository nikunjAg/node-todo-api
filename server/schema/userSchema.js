const mongoose = require('mongoose');
const _ = require('lodash');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

userSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
        $pull: {
            tokens: {token}
        }
    });
};

// statics => Model method methods => Instance method
userSchema.statics.findByToken = function(token) {
    var User = this;
    var decode;

    try {
        decode = jwt.verify(token, 'someSecret');
    } catch (e) {
        return Promise.reject();
    }
    return User.findOne({
        '_id': decode._id,
        'tokens.access': 'auth',
        'tokens.token': token
    });

};

userSchema.statics.findByCredentials = function (email, password) {
    var User = this;
    return User.findOne({email}).then((user) => {
        if (!user)
            return Promise.reject();
        // we now normally use callback in bcrypt.compare but in return we need promise
        // so we need wrap our code inside a promise
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res)
                    resolve(user);
                else
                    reject();
            });
        });
    });
};

userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

module.exports = {
    userSchema
};