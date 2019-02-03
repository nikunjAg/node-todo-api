const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'TodoDB';
MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
    if(err){
        return console.log('Can\'t connect to mongodb servers');
    }
    console.log('Connected successfully to mongodb server');

    // client.db(dbName).collection('Todo').insertOne({
    //     todo: 'Do something 1',
    //     completed: true
    // }, (err, res) => {

    //     if (err)
    //         return console.log('Unable to create a collection', err);
    //     console.log(JSON.stringify(res.ops, undefined, 2));

    // });

    client.db(dbName).collection('Users').insertOne({
        name: 'Nikunj',
        age: 19,
        location: 'New Delhi, India'
    }, (err, res) => {
        if (err)
            return console.log('Unable to create the collection', err);
        console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2));
    });

    client.close();

});