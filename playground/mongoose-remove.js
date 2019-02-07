const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todoModel');
const {User} = require('./../server/model/userModel');

// Todo.deleteMany({})
// .then((res) => {
//     console.log(res);
// })
// .catch((e) => {
//     console.log(e);
// });

// Todo.deleteOne({});

// Todo.findOneAndDelete({})

Todo.findByIdAndDelete('5c5c0ab1acb2151fd0747c58').then((res) => {
    console.log(res);
}).catch((e) => console.log(e));