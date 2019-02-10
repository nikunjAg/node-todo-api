const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'nikunj1';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashedPassword = '$2a$10$sHnHe4QAVQ.JTV1qXTy/mu4IwM4DxJNtcnzJhWRmjOLihCYsR.dJO';

bcrypt.compare(password, hashedPassword, (err, res) => {
    if(res)
        console.log('Matched');
    else
        console.log('Not matched');
});


// var data = {
//     id: 4,
//     id1: 8
// };

// var token = jwt.sign(data, 'secret');
// console.log(token);

// var decoded = jwt.verify(token, 'secret');
// console.log(decoded);

// var str = 'Hello';
// var hashed = SHA256(str).toString();

// // console.log('String ', str);
// // console.log('Hashed ', hashed);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'secret').toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'secret').toString();
// if(resultHash === token.hash)
//     console.log('Data was not changed');
// else
//     console.log('Data was changed');