const express = require('express');
const body_parser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./model/todoModel');
const {User} = require('./model/userModel');

const port = process.env.PORT || 3000;

var app = express();

app.use(body_parser.json());

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

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

module.exports = {app};