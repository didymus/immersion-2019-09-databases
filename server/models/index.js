//const users = require('./users');
//const messages = require('./messages');
const { connection } = require('../db/index');

module.exports = {
  users: {
    getUser: (callback) => {
      const qs = 'select text, roomname from messages';
      connection.query(qs, (err, results) => {
        //console.log("*************", results);
        if(err){
          console.log('Error: ', err);
        } else {
          //debugger;
          console.log('************' + results);
          callback(results);
        }
      });
    },

    postUsers: (user) => {
      //console.log(user);
      //console.log(text);
      const qs = `insert into users (username) values ('${user.username}')`;
      connection.query(qs, (err) => {
        if(err){
          console.log('Error: ', err);
        }
      });
    },
  },
  messages: {
    // get all messages
    getMessages: (callback) => {
      const qs = 'select text, roomname from messages';
      connection.query(qs, (err, results) => {
        if(err){
          console.log('Error: ', err);
        } else {
          callback(results);
        }
      });
    },

    // insert message into db
    postMessage: (message) => {
      //console.log(message);
      const text = message.message.replace(/(\')/g, '\'\'');
      //console.log(text);
      const qs = `insert into messages (text, roomname) values ('${text}', '${message.roomname}')`;
      connection.query(qs, (err) => {
        if(err){
          console.log('Error: ', err);
        }
      });
    },
  },
};
