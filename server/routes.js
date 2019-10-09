const { Router } = require('express')
const { users, messages } = require('./controllers');

// Connect controller methods to their corresponding routes
const classesRouter = Router();

classesRouter.get('/users', users.getUsers);
classesRouter.post('/users', users.postUser);

classesRouter.get('/messages', messages.getMessages);
classesRouter.post('/messages', messages.postMessage);

module.exports = {
  classesRouter,
};
