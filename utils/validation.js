const Joi = require('@hapi/joi');

// Category Validation
exports.categoryValidation = (data) => {
  const schema = Joi.object({
    categoryname: Joi.string().required(),
    isAvailable: Joi.boolean().required(),
  });
  return schema.validate(data);
};

// Login Validation
exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

exports.marketValidation = (data) => {
  const schema = Joi.object({
    marketname: Joi.string().required(),
    marketshortdescription: Joi.string().required(),
    marketdescription: Joi.string().required(),
    marketaddress: Joi.object().required(),
    marketcategory: Joi.string().required(),
    isAvailable: Joi.boolean().required(),
  });
  return schema.validate(data);
};
