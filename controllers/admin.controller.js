const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { AdminModel } = require('../models/admin.model');

const { loginValidation } = require('../utils/validation');

const {
  findOne,
  saveData,
  checkIfExist,
  response,
  handleValidation,
  catchError,
} = require('../services/services');

const validation = {
  login: loginValidation,
};

// Login
module.exports.login = async (req, res, next) => {
  // validate
  const validate = await handleValidation(req.body, res, 'login', validation);
  //   return validate result
  if (validate != null) return validate;
  try {
    //   check if admin exist
    const admin = await findOne({ email: req.body.email }, AdminModel);
    if (!admin) {
      return response(res, 400, false, 'Invalid Credentials');
    }
    // compare password
    const validPass = admin.comparePassword(req.body.password, admin.password);
    // invalid password
    if (!validPass) {
      return response(res, 400, false, 'Invalid Credentials');
    }
    // generate auth token
    const authToken = admin.generateAuthToken(process.env.tokenExpire);

    // proceed to login
    return response(res, 200, true, 'Login Successful', { token: authToken });
  } catch (err) {
    return catchError(err, res);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    // validate
    const validate = await handleValidation(req.body, res, 'login', validation);
    //   return validate result
    if (validate != null) return validate;

    // check if user exist
    let admin = await checkIfExist(AdminModel, [{ email: req.body.email }], []);
    if (admin.length > 0) {
      return response(res, 400, false, 'User Already Exist');
    }

    admin = new AdminModel();
    let data = {};

    for (const key in req.body) {
      data[key] = req.body[key];
    }
    data['_id'] = new mongoose.Types.ObjectId();
    data.password = admin.encryptPassword(data.password);
    //   save data
    return await saveData(AdminModel, data, 'Registraion Successful', res);
  } catch (err) {
    return catchError(err, res);
  }
};

module.exports.addAdmin = async (req, res, next) => {
  let body = {
    email: 'test@tellerium.io',
    password: 'password',
  };
  // check if user exist
  let admin = await checkIfExist(AdminModel, [{ email: body.email }], []);
  if (admin.length > 0) {
    console.log('User Exist');
    // return response(res, 400, false, 'User Already Exist');
  }

  // try {
  // validate
  const validate = await handleValidation(body, res, 'login', validation);
  //   return validate result
  if (validate != null) return validate;

  admin = new AdminModel();
  let data = {};

  for (const key in body) {
    data[key] = body[key];
  }
  data['_id'] = new mongoose.Types.ObjectId();
  data.password = admin.encryptPassword(data.password);
  //   save data
  await new AdminModel(data).save();
  // return await saveData(AdminModel, data, 'Registraion Successful', res);
  // } catch (err) {
  //   return catchError(err, res);
  // }
};

module.exports.getAdmin = async (req, res, next) => {
  try {
    console.log(res.locals.adminID);
    const admin = await findOne({ _id: res.locals.adminID }, AdminModel);
    if (!admin) {
      return response(res, 400, false, 'Invalid Credentials');
    }
    return response(res, 201, true, 'Admin Data', admin);
  } catch (err) {
    return catchError(err, res);
  }
};
