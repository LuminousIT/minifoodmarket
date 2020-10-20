const mongoose = require('mongoose');
const marketSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    marketname: { type: String, required: true },
    marketshortdescription: { type: String, required: true },
    marketdescription: { type: String, required: true },
    marketaddress: {
      lat: { type: String, required: true },
      lng: { type: String, required: true },
      location: { type: String, required: true },
      country: { type: String, required: true },
    },
    marketimages: [{ type: String }],

    marketcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    isAvailable: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
const MarketModel = mongoose.model('Market', marketSchema);
module.exports = {
  MarketModel,
};
