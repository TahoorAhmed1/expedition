const Joi = require('joi');

const contactMessageSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().max(20).required(),
    message: Joi.string().max(1000).required(),
  }),
});

module.exports = { contactMessageSchema };
