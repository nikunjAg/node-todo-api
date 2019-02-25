require('./config/config');
const express = require('express');
const body_parser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./model/todoModel');
const {User} = require('./model/userModel');
const {authenticate} = require('./middleware/authenticate');

const port = process.env.PORT;

var app = express();

app.use(body_parser.json());

// Adding a todo
app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo
    .save()
    .then((todo) => {
        res.status(200).send({todo});
    })
    .catch((e) => {
        res.status(400).send(e);
    });
});

// Get all the todos
app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});
    })
    .catch((e) => {
        res.status(400).send(e);
    });
});

// Get a particular todo with given ID
app.get('/todos/:id', authenticate, (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(404).send();
    Todo.findOne({_id: req.params.id, _creator: req.user._id}).then((todo) => {
        if(!todo)
            return res.status(404).send();
        res.send({todo});
    })
    .catch((e) => res.status(400).send(e));
});

// Remove a particular todo by its ID
app.delete('/todos/:id', authenticate, (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send();
    }
    Todo.findOneAndDelete({_id: req.params.id, _creator: req.user._id}, {useFindAndModify: false}).then((todo) => {
        if(!todo)
            return res.status(404).send();
        res.send({todo});
    })
    .catch((e) => res.status(400).send(e));
});


// Update a particular todo by its ID
app.patch('/todos/:id', authenticate, (req, res) => {

    var hexID = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(hexID))
        return res.status(404).send();

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({_id: hexID, _creator: req.user._id}, {
        $set: body
    },
    {new: true, useFindAndModify: false})
    .then((todo) => {
        if(!todo)
            return res.status(404).send();
        res.send({todo})
    }).catch((e) => res.status(400).send(e));

});

// Adding a user
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save()
    .then((user)=> {
        return user.generateAuthToken();
    })
    .then((token) => {
        // Custom Header (prefix => 'x-something')
        res.header('x-auth', token).send(user);
    })
    .catch((e) => res.status(400).send(e));

});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    })
    .catch((e) => {
        res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    })
    .catch ((e) => res.status(400).send());
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

module.exports = {app};