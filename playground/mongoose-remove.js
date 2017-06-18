const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');

var id = '593e3de5dc8fcc2703c39767';

if (!ObjectID.isValid(id)) {
  console.log('Id Not Valid');
}

Todo.remove({
  _id: id
}).then((res) => {
    console.log(res);
});
