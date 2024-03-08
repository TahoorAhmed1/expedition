const Joi = require('joi');

const createBlogSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    title: Joi.string().required(),
    quotation: Joi.string().optional(),
    content: Joi.string().required(),
    picture: Joi.string().max(1000).required(),
  }),
});

const updateBlogSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    blogId: Joi.number().min(1).required(),
  }),
  body: Joi.object({
    title: Joi.string().optional(),
    quotation: Joi.string().optional(),
    content: Joi.string().optional(),
    picture: Joi.string().max(1000).optional(),
  }).min(1),
});

module.exports = { createBlogSchema, updateBlogSchema };
