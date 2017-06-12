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

  db.collection('Todos').findOneAndUpdate(
    { _id: new ObjectID('593a69c3b95f6995eb796e2b')},
      {
      $set: {
        text: 'Anish Raparla'
      }
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result);
}, (err) => {
  console.log(err);
});

  // db.close();
});
