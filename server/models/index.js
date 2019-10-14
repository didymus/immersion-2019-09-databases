//const users = require('./users');
//const messages = require('./messages');
const { db } = require('../db');

module.exports = {
  users: {
    get: (callback) => {
      const qs = 'select text, roomname from messages';
      db.query(queryString, (err, results) => {
        if(err){
          console.log('Error: ', err);
        } else {
          callback(results);
        }
      });
    },

    post: (user) => {
      //console.log(user);
      const text = message.message.replace(/(\')/g, '\'\'');
      console.log(text);
      const qs = `insert into users (username) values ('${user.username}')`;
      db.query(qs, (err) => {
        if(err){
          console.log('Error: ', err);
        }
      });
    },
  },
  messages: {
    // get all messages
    get: (callback) => {
      const qs = 'select text, roomname from messages';
      db.query(qs, (err, results) => {
        if(err){
          console.log('Error: ', err);
        } else {
          callback(results);
        }
      });
    },

    // insert message into db
    post: (message) => {
      //console.log(message);
      const text = message.message.replace(/(\')/g, '\'\'');
      console.log(text);
      const qs = `insert into messages (text, roomname) values ('${text}', '${message.roomname}')`;
      db.query(qs, (err) => {
        if(err){
          console.log('Error: ', err);
        }
      });
    },
  },
};
