var {User} = require('./../Models/User');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then((result) => {
    if (!result) {
      return Promise.reject();
    }
    req.result = result;
    req.token = token;
    next();
  }).catch((err) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
