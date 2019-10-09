/* Install node-mongodb-native by doing:
 *  npm install mongodb
 * See documentation at https://github.com/mongodb/node-mongodb-native
 * Run this command in the terminal to launch mongo server:
 *  mongod --dbpath=/data --port 27017
 * Run this file with:
 *  node mongo-example.js
 */
const mongoClient = require('mongodb').MongoClient;

// 27017 is the default port for connecting to MongoDB
// test is the name of our database
const url = 'mongodb://localhost:27017/test';

// Open the client's connection to the server:
mongoClient.connect(url, (err, db) => {
  console.log('Connected to MongoDB!');

  // Create a collection, if it doesn't exist already:
  db.createCollection('demo-collection', (err, collection) => {
    console.log('Created collection');

    // Here's the document we want to insert:
    const testDocument = {
      name: 'Jean Valjean',
      password: '24601',
    };

    // Insert it to the collection:
    collection.insert(testDocument, (err, docs) => {
      console.log('Inserted a document.');

      // Collection#count() gives us the number of items in collection:
      collection.count((err, count) => {
        console.log(`This collection contains ${count} documents.`);
      });

      // Collection#find() returns a "cursor"
      // that can be converted to an array of documents:
      collection.find().toArray((err, documents) => {
        documents.forEach((document) => {
          console.log(`Found a document with name = ${document.name}`);
        });

        // Close the db connection when we're done with it:
        db.close();
        console.log('Closed the connection!');
      });
    });
  });
});
