const {MongoClient, ObjectID} = require('mongodb');

const dbName = 'TodoDB';

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
    if(err)
        return console.log('Unable to connect to mongodb servers');
    console.log('Connected successfully to mongodb servers');

    // update()
    // client
    // .db(dbName)
    // .collection('Todo')
    // .update({_id: new ObjectID('5c568faeabdb541cb42070f2')}, {
    //     $set: {
    //         completed: true
    //     }
    // })
    // .then((res) => {
    //     console.log(res);
    // })
    // .catch((err) => {
    //     console.log('Unable to update the document', err);
    // });

    //findOneAndUpdate
    client
    .db(dbName)
    .collection('Todo')
    .findOneAndUpdate({_id: new ObjectID('5c568faeabdb541cb42070f2')}, {
        $set: {
            completed: false
        }
    }, {
        returnOriginal: false
    })
    .then((res) => {
        console.log('Updated the document successfully to ');
        console.log(JSON.stringify(res.value, undefined, 2));
    })
    .catch((err) => {
        console.log('Unable to update the document', err);
    });

    client.close();
});