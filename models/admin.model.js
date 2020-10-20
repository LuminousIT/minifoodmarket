const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

adminSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

adminSchema.methods.comparePassword = function (rawPass, hashPass) {
  return bcrypt.compareSync(rawPass, hashPass);
};

adminSchema.methods.generateAuthToken = function (expiretime) {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.jwtSecret,
    {
      expiresIn: expiretime,
    }
  );
  return token;
};

exports.AdminModel = mongoose.model('Admin', adminSchema);
