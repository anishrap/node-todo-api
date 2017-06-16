var express = require('express');
var bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./Models/Todo');
var {User} = require('./Models/User');

var app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.post('/todos', (req, res) => {
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((result) => {
    res.send(result);
  }, (err) => {
    res.status(400).send(err);
  })
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

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
