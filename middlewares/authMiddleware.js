const jwt = require('jsonwebtoken');
const { response } = require('../services/services');

exports.adminAuth = async (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) {
    return response(res, 401, false, 'Authorization Denied');
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    // set admin Id as global variable
    res.locals.adminID = decoded._id;
    req.adminID = decoded._id;
    next();
  } catch (err) {
    console.log(err);
    return response(res, 401, false, 'Authorization Denied');
  }
};
