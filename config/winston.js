const winston = require('winston');
const config = require('./config');

const CustomLoggingLevels = {
  error: 0,
  warn: 1,
  info: 2,
  trace: 3,
};

const LoggingLevels = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  TRACE: 'trace',
};

const logger = winston.createLogger({
  levels: CustomLoggingLevels,
  formatter: options =>
    `${options.level.toUpperCase()} ${options.message ? options.message : ''}`,
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      json: true,
    }),
  ],
  exitOnError: false,
});

logger.level = config.DEFAULT_LOGGING_LEVEL;

module.exports = {
  logger,
  LoggingLevels,
};
