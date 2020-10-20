const winston = require('winston');
const appRoot = require('app-root-path');

require('express-async-errors');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),

  transports: [
    new winston.transports.File({
      filename: `${appRoot}/logs/error.log`,
      level: 'error',
      handleExceptions: true,
    }),
  ],
  //   handleExceptions:[]
  exceptionHandlers: [
    new winston.transports.File({
      filename: `${appRoot}/logs/exceptionerror.log`,
      level: 'error',
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

process.on('unhandledRejection', (ex) => {
  logger.log('error', ex.message);
  logger.error(ex.message, ex);
});
process.on('uncaughtException', (ex) => {
  logger.log('error', ex.message);
  logger.error(ex.message, ex);
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      handleExceptions: true,
    })
  );
}

module.exports = { logger };
