const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');

var id = '593e3de5dc8fcc2703c39767';

if (!ObjectID.isValid(id)) {
  console.log('Id Not Valid');
}

// Todo.find({
//   _id: id
// }).then((res) => {
//   console.log(res);
// }, (err) => {
//   console.log(err);
// });
//
// Todo.findOne({
//   _id: id
// }).then((res) => {
//   console.log(res);
// }, (err) => {
//   console.log(err);
// });

Todo.findById(id).then((res) => {
  if(!res) return console.log('No document with given ID!');
  console.log(res);
}).catch((err) => { console.log(err); });
