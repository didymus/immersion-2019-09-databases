/* You'll need to have MongoDB and your Node archive server
 * running for these tests to pass. */

const request = require('request');
const mongoClient = require('mongodb').MongoClient;
const expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  // TODO edit this line if your database name is not "archive":
  const dbName = 'archive';
  const dbUrl = `mongodb://localhost:27017/${dbName}`;

  it('Should store requested documents in Mongo', function(done) {

    /* TODO edit these variables to match the interface of your
     * archive server. */
    const archiveServer = 'http://127.0.0.1:8080/index.html';
    const archiveForm = { url: 'google.com' };

    // Post a message to the archive server:
    request({
      method: 'POST',
      uri: archiveServer,
      form: archiveForm,
    }, (error, response, body) => {
      /* Now if we look in the database, we should find the
       * posted message there. */

      // Wait a second for it to be done archiving
      waits(1000);

      runs(() => {
        mongoClient.connect(dbUrl, (err, db) => {
          /* TODO edit this variable to match the name of
           * the collection you're using: */
          const collectionName = 'archive';
          db.createCollection(collectionName, (err, collection) => {
            collection.find().toArray((err, results) => {
              // Should have one result:
              expect(results.length).toEqual(1);

              /* TODO edit this test to match the name of the
               * property where you're storing the page source:*/
              expect(results[0].pageSource).toMatch(/Google/);

              db.close();
              done();
            });
          });
        });
      });
    });
  });

  it('Should retrieve documents from Mongo', function(done) {
    mongoClient.connect(dbUrl, (err, db) => {
      /* TODO edit this variable to match the name of
       * the collection you're using: */
      const collectionName = 'archive';
      db.createCollection(collectionName, (err, collection) => {

        /* We'll insert some fake page source data into
         * the collection to simulate an archived page. Edit this
         * to match the document field names that your code
         * actually uses.*/
        const document = {
          url: 'jono.com',
          pageSource: '<html><head><title>Jono\'s Awesome Blank Page</title></head><body></body></html>',
        };

        collection.insert(document, (err, docs) => {

          /* Now do a request to the archive server for this url
           *and expect it to return the document.
           * TODO edit these variables to match the interface of
           * your archive server. */
          const archivedPage = 'http://127.0.0.1:8080/jono.com';

          request(archivedPage, (error, response, body) => {
            expect(body).toMatch(/Jono's Awesome Blank Page/);
            db.close();
            done();
          });
        });
      });
    });
  });
});
