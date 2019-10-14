const users = require('./users');
const messages = require('./messages');
const { connection } = require('../db');

module.exports = {
  users,
  messages,
};
