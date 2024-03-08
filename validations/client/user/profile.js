const Joi = require('joi');

const getMyBioSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

const updateBioSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    firstName: Joi.string().min(2).max(30).optional(),
    lastName: Joi.string().min(2).max(30).optional(),
    picture: Joi.string().optional().allow(''),
  }).min(1),
});

const updatePasswordSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).required(),
  }),
});

module.exports = {
  getMyBioSchema,
  updateBioSchema,
  updatePasswordSchema,
};
