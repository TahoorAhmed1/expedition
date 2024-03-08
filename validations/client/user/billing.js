const Joi = require('joi');

const authorizeChargeSchema = Joi.object({
  query: Joi.object({
    type: Joi.string().valid('monthly', 'yearly').required(),
  }).length(1),
  params: Joi.object({}).length(0),
  body: Joi.object({
    firstName: Joi.string().max(12).required(),
    lastName: Joi.string().max(12).required(),
    cardNumber: Joi.number().required(),
    expirationDate: Joi.string().max(5).required(),
    cvc: Joi.string().max(3).min(3),
    address: Joi.string().max(100).required(),
    country: Joi.string().max(50).required(),
    state: Joi.string().max(50).required(),
    city: Joi.string().max(50).required(),
    zip: Joi.string().max(8).required(),
  }),
});

const authorizeUpdateSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    firstName: Joi.string().max(12).required(),
    lastName: Joi.string().max(12).required(),
    cardNumber: Joi.number().required(),
    expirationDate: Joi.string().max(5).required(),
    address: Joi.string().max(100).required(),
    country: Joi.string().max(50).required(),
    state: Joi.string().max(50).required(),
    city: Joi.string().max(50).required(),
    zip: Joi.string().max(8).required(),
    cvc: Joi.string().max(3).min(3),
  }),
});

module.exports = { authorizeChargeSchema, authorizeUpdateSchema };
