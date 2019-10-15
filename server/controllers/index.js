// const users = require('./users');
// const messages = require('./messages');
const models = require('../models');

module.exports = {
  users: {
    getUsers: (req, res) => {
      res.sendStatus(200);
      //res.end();
    },

    postUser: (req, res) => {
      //console.log(req.body)
      models.users.postUsers(req.body);
      res.sendStatus(201);
      //res.end();
    }
  },
  messages: {
    getMessages: (req, res) => {
      models.messages.getMessages((results) => {
        res.status(200);
        res.send(JSON.stringify(results));
        //console.log(results)
        //res.end();
      });
    },
    postMessage: (req, res) => {
      models.messages.postMessage(req.body);
      res.sendStatus(201);
      //res.end();
    },
  },
};
