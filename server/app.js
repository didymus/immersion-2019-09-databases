const express = require('express');

// Middleware
const morgan = require('morgan');
const parser = require('body-parser');

// Router
const { classesRouter } = require('./routes');

const app = express();

// Set what we are listening on.
app.set('port', 3001);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use('/classes', classesRouter);

// Serve the client files
app.use(express.static(__dirname + '/../client'));

module.exports = {
  app,
};
