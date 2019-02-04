const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

module.exports = {
    userSchema
};