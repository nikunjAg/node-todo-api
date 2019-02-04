const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todoModel');
const {User} = require('./../server/model/userModel');

var id = '5c57e55fa7f626150c2c5ddf';

// console.log(ObjectID.isValid('5c583e27b9e0fa1ba8544f72'));

// Todo.find({_id: id}).then((todos) => {
//     console.log('Todos : ' + todos);
// }).catch((e) => {
//     console.log('Invalid ID');
// });

// // findByIdAndRemove is deprecated
// // if the id is correct but not present in database no error will be thrown
// // only todo becomes null
// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('No such id present in database');
//     }
//     console.log('Todo : ' + todo);
// }).catch((e) => {
//     console.log('Invalid ID');
// });

User.findById(id).then((user) => {
    if(!user)
        return console.log('No such ID id present in database');
    console.log(JSON.stringify(user, undefined, 2));
})
.catch((err) => {
    console.log('Please enter a valid ID');
});