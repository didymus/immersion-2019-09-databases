/*
 * You'll need to have MySQL running and your Node server running
 * for these tests to pass.
 */

const mysql = require('mysql2/promise');
const axios = require('axios').default;
const { expect } = require('chai');

const api = axios.create({
  baseURL: 'http://127.0.0.1:3001',
});

describe('Persistent Node Chat Server', function() {
  let dbConnection;

  beforeEach(function() {
    return mysql.createConnection({
      user: 'root',
      password: '',
      database: 'chat',
    }).then((connection) => {
      dbConnection = connection;

      /**
       * Empty the db table before each test so that multiple tests
       * (or repeated runs of the tests) won't screw each other up
       */
      return Promise.all([
        dbConnection.query('DELETE FROM messages'),
        dbConnection.query('DELETE FROM users'),
      ]);
    });
  });

  afterEach(function() {
    return dbConnection.end();
  });

  it('should insert posted users to the DB', function() {
    const username = 'Valjean';

    return Promise.resolve()
      // Post the user to the chat server.
      .then(() => api.post('/classes/users', { username }))
      // Now if we look in the database, we should find the posted user there.
      .then(() => dbConnection.query('SELECT * FROM users', []))
      .then(([ users ]) => {
        // Should have one result:
        expect(users).to.have.lengthOf(1);
        expect(users[0].username).to.equal(username);
      });
  });

  it('should output all users from the DB', function() {
    // Let's insert a user into the db
    const username = 'Valjean';
    const queryString = 'INSERT INTO users (username) VALUES (?)';
    const queryArgs = [username];

    return Promise.resolve()
      .then(() => dbConnection.query(queryString, queryArgs))
      .then(() => api.get('/classes/users'))
      .then((response) => {
        const body = response.data;

        expect(body).to.be.a('array');
        expect(body[0]).to.be.a('object');
        expect(body[0].username).to.equal(username);
      });
  });

  it('should insert posted messages to the DB', function() {
    const username = 'Valjean';
    const user = { username };
    const message = {
      username,
      message: 'In mercy\'s name, three days is all I need.',
      roomname: 'Hello',
    };

    return Promise.resolve()
      // Post the user to the chat server.
      .then(() => api.post('/classes/users', user))
      // Post a message to the node chat server:
      .then(() => api.post('/classes/messages', message))
      .then(() => dbConnection.query('SELECT * FROM messages', []))
      .then(([ messages, fields ]) => {
        // Should have one result:
        expect(messages).to.have.lengthOf(1);
        expect(messages[0].text).to.equal(message.message);
      });
  });

  it('should output all messages from the DB', function() {
    // Let's insert a message into the db
    const text = 'Men like you can never change!';
    const roomname = 'main';
    const username = 'Bob';

    const queryString = 'INSERT INTO users (username) VALUES (?)';
    const queryArgs = [username];

    return Promise.resolve()
      .then(() => dbConnection.query(queryString, queryArgs))
      .then(([ rows, fields ]) => {
        const userId = rows.insertId;
        const queryString = 'INSERT INTO messages (text, roomname, id_user) VALUES (?, ?, ?);';
        const queryArgs = [text, roomname, userId];

        dbConnection.query(queryString, queryArgs);
      })
      .then(() => api.get('/classes/messages'))
      .then((response) => {
        const body = response.data;

        expect(body).to.be.a('array');
        expect(body[0]).to.be.a('object');
        expect(body[0].text).to.equal(text);
        expect(body[0].roomname).to.equal(roomname);
      });
  });
});
