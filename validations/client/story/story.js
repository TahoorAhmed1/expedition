const Joi = require('joi');

const getStoriesSchema = Joi.object({
  query: Joi.object({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional(),
  }),
  params: Joi.object({}),
  body: Joi.object({}),
});

const postStorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    description: Joi.string().required(),
  }),
});

module.exports = {
  getStoriesSchema,
  postStorySchema,
};
