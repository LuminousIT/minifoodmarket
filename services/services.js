const { catchError } = require('../utils/validation');
exports.findOne = async (query, model, populate) => {
  let dquery = model.findOne(query).exec();
  // if (populate.length > 0) {
  //   console.log(populate);
  //   console.log('rebuild requry');
  //   dquery = model.findOne(query);
  //   //   let p = '';
  //   //   for (let i = 0; i < populate.length; i++) {
  //   //     p += `.populate(${populate[i][0]}, [${populate[i][1]}])`;
  //   //     console.log(p);
  //   //     // dquery = model.findOne(query)${p}.exec();
  //   //     dquery += p;
  //   //   }
  //   //   console.log(dquery);
  // }
  // console.log('Query');
  // console.log(dquery);
  const get = await dquery;
  return get;
};

exports.find = async (id, res, model, msg) => {};
exports.findById = async (id, res, model, msg) => {};

exports.checkIfExist = async (model, orQuery, andQuery) => {
  let query = {};
  if (orQuery != 'undefined' && orQuery.length != 0) query['$or'] = orQuery;
  if (andQuery != 'undefined' && andQuery.length != 0) query['$and'] = andQuery;
  const check = await model.find(query).exec();
  return check;
};

exports.saveData = async (model, data, msg, res) => {
  const save = await new model(data).save();
  if (save) {
    return this.response(res, 200, true, msg, data);
  }
};

exports.response = async (res, code, status, msg, data, errors) => {
  return res.status(code).json({
    success: status,
    message: msg,
    data: data,
    errors: errors,
  });
};

// Handle Validation
exports.handleValidation = async (body, res, type, validation) => {
  const { error } = await validation[type](body);
  if (error) {
    console.log(error);
    return this.response(
      res,
      422,
      false,
      'Validation Error',
      '',
      error.details[0].message
    );
  }
};

// Catch Error
exports.catchError = (err, res, msg) => {
  console.log('Error ==' + err);
  console.log('Message ==' + msg);
  console.log('Error Kind == ' + err.kind);
  if (err.kind === 'ObjectId') {
    return this.response(res, 404, false, msg ? msg : err.message, '', err);
  }
  return this.response(res, 500, false, msg, '', err);
};
