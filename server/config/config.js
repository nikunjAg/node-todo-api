var env = process.env.NODE_ENV || 'development';

if ( env === 'development' || env === 'test') {
    // automatically converts the JSON file into a javascript object
    var config = require('./config.json');
    // config is object if the value we want to access is variable then we need to use bracket notation
    var envConfig = config[env];
    // Converts all the keys in envConfig and convert them into an array
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}

// if(env === 'development') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoDB';
// } else if (env === 'test') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoDBTest';
// }