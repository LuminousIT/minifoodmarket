const mongoose = require('mongoose');
const { logger } = require('../startup/logger');

// Setup App DB
module.exports = async () => {
  const dbURI =
    process.env.NODE_ENV !== 'production'
      ? process.env.devDbURI
      : process.env.proDbURI;
  console.log(dbURI);
  try {
    const db = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      //   useUnifiedTopology: true,
      useCreateIndex: true,
      // useFindAndModify:false
    });
    logger.log('info', 'Mongodb connection established successfully');
  } catch (err) {
    logger.log('error', err.message);
    logger.error('error', 'MongoDB Connection Failed...', err);
    throw Error(err);
    // process.exit(1);
  }
};
