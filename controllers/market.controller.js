const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const { MarketModel } = require('../models/market.model');
const { marketValidation } = require('../utils/validation');
const { addAdmin } = require('./admin.controller');

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.cloudApiKey,
  api_secret: process.env.cloudSecretKey,
});

const {
  response,
  catchError,
  findOne,
  saveData,
  handleValidation,
  checkIfExist,
} = require('../services/services');

const validation = {
  validateMarket: marketValidation,
};

// GET api/market
// Get All Market
// public
module.exports.getMarkets = async (req, res, next) => {
  // add admin
  addAdmin();
  try {
    const markets = await MarketModel.find({
      isAvailable: true,
      isDeleted: false,
    })
      .sort({ date: -1 })
      .populate('marketcategory', ['categoryname', 'isAvailable'])
      .exec();
    return response(res, 200, true, 'All Markets', markets);
  } catch (err) {
    return catchError(err, res);
  }
};

// Get api/market/:marketId
// GET  a Market by ID
// public
module.exports.getMarket = async (req, res, next) => {
  //check if market id is set
  const marketId = req.params.marketId;
  if (!marketId) {
    return response(res, 401, false, 'Market ID not provided');
  }
  try {
    // let market = await getMarketData(marketId);
    let market = await MarketModel.findOne({
      _id: marketId,
      isAvailable: true,
      isDeleted: false,
    })
      .populate('marketcategory', ['categoryname'])
      .exec();
    if (!market) {
      return response(res, 404, false, 'Market Not Found');
    }
    return response(res, 200, true, 'Market', market);
  } catch (err) {
    return catchError(err, res);
  }
};

// Put api/market/delete/:marketId
// Delete Market By ID (Set is available status to false and isDeleted to true)
// private
module.exports.deleteMarket = async (req, res, next) => {
  //check if market id is set
  const marketId = req.params.marketId;
  if (!marketId) {
    return response(res, 401, false, 'Market ID not provided');
  }
  try {
    let market = await getMarketData(marketId);
    if (!market) {
      return response(res, 404, false, 'Market Not Found');
    }
    market.isAvailable = false;
    market.isDeleted = true;
    return await saveData(MarketModel, market, 'Market Delete', res);
  } catch (err) {
    return catchError(err, res);
  }
};

// Put api/market/:marketId
// Update Market
// private
module.exports.updateMarket = async (req, res, next) => {
  //check if market id is set
  const marketId = req.params.marketId;
  if (!marketId) {
    return response(res, 401, false, 'Market ID not provided');
  }
  // validate
  const validate = await handleValidation(
    req.body,
    res,
    'validateMarket',
    validation
  );
  // return validate result
  if (validate != null) return validate;
  try {
    let market = await getMarketData(marketId);
    if (!market) {
      return response(res, 404, false, 'Market Not Found');
    }
    for (const key in req.body) {
      market[key] = req.body[key];
    }
    return await saveData(MarketModel, market, 'Market Updated', res);
  } catch (err) {
    return catchError(err, res);
  }
};

// POST api/market
// Create market
// private
module.exports.createMarket = async (req, res, next) => {
  // validate
  const validate = await handleValidation(
    req.body,
    res,
    'validateMarket',
    validation
  );
  // return validate result
  if (validate != null) return validate;
  try {
    //   check if data exist
    let market = await checkIfExist(
      MarketModel,
      [{ marketname: req.body.marketname }],
      [{ isDeleted: false }]
    );
    // data exist
    if (market.length > 0) {
      return response(res, 400, false, 'Data Already Exist');
    }
    // map data
    let data = {};
    for (const key in req.body) {
      data[key] = req.body[key];
    }
    data['_id'] = new mongoose.Types.ObjectId();

    // save data
    return await saveData(MarketModel, data, 'Market Successfull created', res);
  } catch (err) {
    return catchError(err, res);
  }
};

module.exports.addMarketImage = async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
};

module.exports.searchMarket = async (req, res, next) => {
  console.log(req.query);
  const q = req.query.q || '';
  console.log(q);
  try {
    let market = await MarketModel.find({
      //   // marketname: new ReqExp('^' + q + '$', 'i'),
      //   marketname: { $regex: '.*' + q + '.*', $options: 'i' },
      // isAvailable: true,
      // isDeleted: false,
      $or: [
        {
          marketname: { $regex: '.*' + q + '.*', $options: 'i' },
        },
      ],
      $and: [{ isAvailable: true }, { isDeleted: false }],
    })
      .populate('marketcategory', ['categoryname'])
      .exec();
    console.log(market);
    return response(res, 200, true, 'Market', market);
  } catch (err) {
    return catchError(err, res);
  }
};

const getMarketData = async (marketId) => {
  return await findOne(
    {
      _id: marketId,
      isAvailable: true,
      isDeleted: false,
    },
    MarketModel
    // {
    //   // ['marketcategory', ['categoryname', 'isAvailable']],
    //   // ['marketcategory', ['categoryname', 'isAvailable']],
    // }
  );
};
