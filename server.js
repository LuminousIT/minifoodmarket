// Init Express App
const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const app = express();

const { logger } = require('./startup/logger');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

require('./startup/config')();
require('./startup/db')();
require('./startup/routes')(app);

// Setting up server
const port = process.env.PORT || 5000;
console.log(`Server PORT === ${port}`);
const server = http.createServer(app);
server.listen(port, () => logger.log('info', `Server Listening on ${port}`));
