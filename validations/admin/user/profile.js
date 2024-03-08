const Joi = require('joi');

const updateSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    username: Joi.string().max(30).optional(),
    password: Joi.string().min(8).optional(),
    picture: Joi.string().optional(),
  }).min(1),
});

module.exports = {
  updateSchema,
};
