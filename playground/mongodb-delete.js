const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'TodoDB';

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if(err)
        return console.log('Unable to connect to mongodb server', err);
    console.log('Connected to mongodb server successfully');
    client
    .db(dbName)
    .collection('Users')
    .deleteMany( {name: 'Nikunj'} )
    .then((res) => {
        console.log('Document deleted successfully');
    })
    .catch((err) => {
        console.log('Unable to delete the document', err);
    });

    client
    .db(dbName)
    .collection('Users')
    .deleteOne({name: 'Nikunj1'})
    .then((res) => {
        console.log('Document deleted successfully');
    })
    .catch((err) => {
        console.log('Unable to delete the document', err);
    });

    client
    .db(dbName)
    .collection('Users')
    .findOneAndDelete({name: 'Nikunj2'})
    .then((res) => {
        console.log('Deleted the document');
        console.log(JSON.stringify(res.value, undefined, 2));
    })
    .catch((err) => {
        console.log('Unable to delete the document', err);
    });

    client.close();
});