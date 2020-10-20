const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    categoryname: { type: String, required: true },
    isAvailable: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model('Category', categorySchema);
module.exports = {
  CategoryModel,
};
