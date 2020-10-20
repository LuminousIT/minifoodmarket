const { logger } = require('../startup/logger');

module.exports = () => {
  if (!process.env.devDbURI) {
    logger.log('error', 'Fatal Error: Database URI not define');
    throw Error('Fatal Error: Development Database URI not define');
  }
  if (!process.env.proDbURI) {
    logger.log('error', 'Fatal Error: Database URI not define');
    throw Error('Fatal Error: Production Database URI not define');
  }

  if (!process.env.jwtSecret) {
    logger.log('error', 'Fatal Error: jwtSecret not define');
    throw Error('Fatal Error: jwtSecret not define');
  }

  if (!process.env.tokenExpire) {
    logger.log('error', 'Fatal Error: tokenExpire not define');
    throw Error('Fatal Error: tokenExpire not define');
  }
};
