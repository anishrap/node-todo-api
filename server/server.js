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

app.post('/todos', (req, res) => {
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((result) => {
    res.send(result);
  }, (err) => {
    res.status(400).send(err);
  });
});

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

app.get('/todos', (req, res) => {
  Todo.find().then((result) => {
    res.send({result});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    res.status(400).send();
  }
  Todo.findById(id).then((result) => {
    if (!result) {
      return res.status(404).send();
    }

    res.send({result});
  }).catch((err) => {
    res.status(400).send();
    console.log(err);
  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(400).send();
  }

  Todo.findByIdAndRemove(id).then((result) => {
    if (!result) {
      return res.status(404).send();
    }

    res.send({result});
  }).catch((err) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
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

  Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((result) => {
    if (!result) {
      res.status(400).send();
    }

    res.send(result);
  }).catch((err) => {
    res.status(400).send();
  })
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.result);
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
