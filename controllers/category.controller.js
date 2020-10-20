const mongoose = require('mongoose');
const { CategoryModel } = require('../models/category.model');
const { categoryValidation } = require('../utils/validation');

const {
  checkIfExist,
  saveData,
  findById,
  findOne,
  response,
  handleValidation,
  catchError,
} = require('../services/services');

const validation = {
  validateCategory: categoryValidation,
};

// POST api/category
// Create Category
// private
module.exports.createCategory = async (req, res, next) => {
  // validate
  const validate = await handleValidation(
    req.body,
    res,
    'validateCategory',
    validation
  );
  // return validate result
  if (validate != null) return validate;
  try {
    //   check if data exist
    let category = await checkIfExist(
      CategoryModel,
      [{ categoryname: req.body.categoryname }],
      [{ isAvailable: true }]
    );
    // data exist
    if (category.length > 0) {
      return response(res, 400, false, 'Data Already Exist');
    }
    // map data
    let data = {};
    for (const key in req.body) {
      data[key] = req.body[key];
    }
    data['_id'] = new mongoose.Types.ObjectId();

    // save data
    return await saveData(
      CategoryModel,
      data,
      'Category successfull created',
      res
    );
  } catch (err) {
    return catchError(err, res);
  }
};

// GET api/category
// Get All Category
// private
module.exports.getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find({
      isAvailable: true,
      isDeleted: false,
    })
      .sort({ date: -1 })
      .exec();
    return response(res, 200, true, 'All Category', categories);
  } catch (err) {
    return catchError(err, res);
  }
};
