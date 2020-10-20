const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { logger } = require('../startup/logger');

// Import routes
const adminRoutes = require('../routes/admin');
const categoryRoutes = require('../routes/category');
const marketRoutes = require('../routes/market');

module.exports = (app) => {
  // Setup App Config || Middlewares
  app.use(cors());
  app.use(morgan('combined'));
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));
  }

  app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
      return res.status(200).json({});
    }
    next();
  });

  //   Routes
  app.use('/api/admin', adminRoutes);
  app.use('/api/category', categoryRoutes);
  app.use('/api/market', marketRoutes);

  //   Handling Error
  app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    logger.log('info', error);
    logger.error(error.message, error);
    res.json({
      error: {
        message: error.message,
      },
    });
  });
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
};
