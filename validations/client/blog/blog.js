const Joi = require('joi');

const getBlogsSchema = Joi.object({
  query: Joi.object({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional(),
  }),
  params: Joi.object({}),
  body: Joi.object({}),
});

const getBlogByIdSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    blogId: Joi.number().min(1).required(),
  }),
  body: Joi.object({}),
});

module.exports = { getBlogsSchema, getBlogByIdSchema };
