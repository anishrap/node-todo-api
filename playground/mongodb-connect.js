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

  db.collection('Todos').insertOne({
    text: 'Hello',
    completed: false
  }, (err, res) => {
    if (err) {
      return console.log('Error inserting document to the collection', err);
    }

    console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2));
  });

  db.close();
});
