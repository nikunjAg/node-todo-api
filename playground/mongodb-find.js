const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'TodoDB';

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if (err)
        return console.log('Unable to connect to mongodb server', err);
    console.log('Connected to the server successfully');
    // client
    // .db(dbName)
    // .collection('Todo')
    // .find({ _id: new ObjectID('5c568f7243ffb61414eb0a3a') })
    // .toArray()
    // .then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // })
    // .catch((err) => {
    //     console.log('Unable to fetch the todos', err);
    // });
    // client.close();

    client
    .db(dbName)
    .collection('Users')
    .find( {name: 'Nikunj'} )
    .toArray()
    .then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    })
    .catch((err) => {
        console.log('Unable to fetch the documents', err);
    });

});
