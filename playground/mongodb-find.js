const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);
//
// var objTwo = new ObjectID();
// console.log(objTwo);


MongoClient.connect('mongodb://localhost:27017/todoApp', (err, db) => {
  if (err) {
    return console.log('Unable to Connect to the Database');
  }
  console.log('Connected to the Database');

  // db.collection('Todos').find({_id: new ObjectID('593a69c3b95f6995eb796e2b')}).toArray().then((res) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(res, undefined, 2));
  // }, (err) => {
  //   console.console.log('Unable to fetch todos.', err);
  // });

  db.collection('Todos').find().count().then((res) => {
    console.log('Todos count: ', res);
  }, (err) => {
    console.console.log('Unable to fetch todos.', err);
  });

  db.close();
});
