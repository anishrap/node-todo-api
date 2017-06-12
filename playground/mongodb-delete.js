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

  // delete Many
  db.collection('Todos').deleteMany({text: 'Hello'}).then((res) => {
    console.log(res);
  }, (err) => {
    console.log(err);
  });

  // delete One

  //find one and delete

  // db.close();
});
