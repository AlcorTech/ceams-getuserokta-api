/**
 * File: app.js
 * Description: Establishes the Authn Service application
 */
const config = require("./config/config");


// require dependencies
const express = require('express');
const path = require('path');
const cors = require('cors');
const httpLogger = require('morgan');
const helmet = require('helmet');
const { logger, LoggingLevels } = require('./config/winston');
const constants = require('./src/resources/constants');

// require routes
const routes = require('./src/routes/routes');

// create Express app
const app = express();

// allow cors
app.use(cors());

// allow body-parser for post
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// logging setup
app.use(httpLogger(config.MORGAN_LOGGING_FORMAT));

// HTTP header security setup
app.use(helmet());

// setup to enable application to parse incoming JSON payloads
app.use(express.json());

// allow public to be accessible by outsiders
app.use(express.static(path.join(__dirname, 'public')));

// set up healthCheck route
app.get(
  '/' + constants.API_NAME + '/' + constants.HEALTH_CHECK_URI,
  (req, res) => {
    res.writeHead(constants.HTTP_STATUS_CODE_OK,
                  { 'Content-type': 'text/plain' });
    res.end(constants.HEALTH_CHECK_MESSAGE);
  },
);

// set up routes
app.use('/' + constants.API_NAME, routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  logger.log(LoggingLevels.ERROR, 'Requested resource does not exist.');
  const err = new Error(
    'Resource Not Found - make sure context is part of the resource',
  );
  err.status = constants.HTTP_STATUS_CODE_NOT_FOUND;
  next(err);
});

// the default error handler for the NodeJS application
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err.message : "";

  res.app.set('errorMessageForApp',res.locals.error);

  // render the error page
  res.status(err.status);
  res.render('error');
});

module.exports = app;
