const {todoSchema} = require('../schema/todoSchema');
const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', todoSchema);
module.exports = {
    Todo
};