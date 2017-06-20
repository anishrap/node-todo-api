require('./config/config.js');
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./Models/Todo');
var {User} = require('./Models/User');
var {authenticate} = require('./middleware/authenticate');

var app = express();
app.use(bodyParser.json());

const port = process.env.PORT;

//Creating a New Todo

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text
    _creator: req.result._id
  });

  todo.save().then((result) => {
    res.send(result);
  }, (err) => {
    res.status(400).send(err);
  });
});

//Creating a new User

app.post('/users', (req, res) => {

  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

//Retrieving a Todo

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.result._id
  }).then((result) => {
    res.send({result});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    res.status(400).send();
  }
  Todo.findOne({
    _creator: req.result._id,
    _id: id
  }).then((result) => {
    if (!result) {
      return res.status(404).send();
    }

    res.send({result});
  }).catch((err) => {
    res.status(400).send();
    console.log(err);
  });
});

//Deleting a particular Todo

app.delete('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(400).send();
  }

  Todo.findOneAndRemove({
    _creator: req.result._id,
    _id:id
  }).then((result) => {
    if (!result) {
      return res.status(404).send();
    }

    res.send({result});
  }).catch((err) => {
    res.status(400).send();
  });
});

//Updating a Todo

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _creator: req.result._id,
    _id: id
  }, {$set:body}, {new: true}).then((result) => {
    if (!result) {
      res.status(400).send();
    }

    res.send(result);
  }).catch((err) => {
    res.status(400).send();
  })
});

//Login For Users

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((err) => {
    res.status(400).send();
  });
});

//Deleting a user

app.delete('/users/me/token', authenticate, (req, res) => {
  req.result.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

//Retrieving a user

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.result);
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
