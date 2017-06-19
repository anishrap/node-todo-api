const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SHA256} = require('crypto-js');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPass = '$2a$10$Q03ei4UkKOYh8YTVEH2zDOQzTUmtE5afViNP7Yf47sQRjkEdiD9T6';

bcrypt.compare(password, hashedPass, (err, res) => {
  console.log(res);
});
