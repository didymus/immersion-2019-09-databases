//const users = require('./users');
//const messages = require('./messages');
const { db } = require('../db');

module.exports = {
  users: {
    getUser: (callback) => {
      const qs = 'select text, roomname from messages';
      db.query(queryString, (err, results) => {
        if(err){
          console.log('Error: ', err);
        } else {
          callback(results);
        }
      });
      res.end();
    },

    postUsers: (user) => {
      //console.log(user);
      const text = message.message.replace(/(\')/g, '\'\'');
      console.log(text);
      const qs = `insert into users (username) values ('${user.username}')`;
      db.query(qs, (err) => {
        if(err){
          console.log('Error: ', err);
        }
      });
      res.end();
    },
  },
  messages: {
    // get all messages
    getMessages: (callback) => {
      const qs = 'select text, roomname from messages';
      db.query(qs, (err, results) => {
        if(err){
          console.log('Error: ', err);
        } else {
          callback(results);
        }
      });
      res.end();
    },

    // insert message into db
    postMessage: (message) => {
      //console.log(message);
      const text = message.message.replace(/(\')/g, '\'\'');
      console.log(text);
      const qs = `insert into messages (text, roomname) values ('${text}', '${message.roomname}')`;
      db.query(qs, (err) => {
        if(err){
          console.log('Error: ', err);
        }
      });
      res.end();
    },
  },
};
