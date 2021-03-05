#!/usr/bin/env node

/**
 * File: www.js
 * Description: Establishes the Express Server hosting the authn
 *  Service application
 */

// Load variables from .env file into process.env (useful for development)
require('dotenv').config();

// Load the constants for the serivce
const constants = require('../src/resources/constants');

// Module dependencies.
const app = require('../app');
const debug = require('debug')('express-template:server');
const http = require('http');

 // Get port from environment and store in Express
const port = normalizePort(process.env.PORT || constants.EXPRESS_SERVER_PORT_DEFAULT);
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);
 
// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 * 
 * @param val the port number to normalize
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 * 
 * @param error the error message from the HTTP Server
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
