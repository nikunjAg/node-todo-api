const express = require('express');
const body_parser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./model/todoModel');
const {User} = require('./model/userModel');

const port = process.env.PORT || 3000;

var app = express();

app.use(body_parser.json());

// Adding a todo
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo
    .save()
    .then((doc) => {
        res.status(200).send(doc);
    })
    .catch((e) => {
        res.status(400).send(e);
    });
});

// Get al the todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    })
    .catch((e) => {
        res.status(400).send(e);
    });
});

// Get a particular todo with given ID
app.get('/todos/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(404).send();
    Todo.findById(req.params.id).then((todo) => {
        if(!todo)
            return res.status(404).send();
        res.send({todo});
    })
    .catch((e) => res.status(400).send());
});

// Remove a particular todo by its ID
app.delete('/todos/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send();
    }
    Todo.findByIdAndDelete(req.params.id).then((todo) => {
        if(!todo)
            return res.status(404).send();
        res.send({todo});
    })
    .catch((e) => res.status(400).send());
});


// Update a particular todo by its ID
app.patch('/todos/:id', (req, res) => {

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

    Todo.findByIdAndUpdate(hexID, {
        $set: body
    },
    {new: true})
    .then((todo) => {
        if(!todo)
            return res.status(404).send();
        res.send({todo})
    }).catch((e) => res.status(400).send());

});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

module.exports = {app};