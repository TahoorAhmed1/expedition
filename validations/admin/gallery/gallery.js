const Joi = require('joi');

const getAllGallerySchema = Joi.object({
  query: Joi.object({
    type: Joi.string().valid('images', 'videos').required(),
  }),
  params: Joi.object({}),
  body: Joi.object({}),
});

const addToGallerySchema = Joi.object({
  query: Joi.object({
    year: Joi.number().min(2020).required(),
    type: Joi.string().valid('images', 'videos').required(),
  }),
  params: Joi.object({}),
  body: Joi.object({
    media: Joi.array().items(Joi.string()).min(1).required(),
  }),
});

const deleteFromGallerySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    mediaId: Joi.number().min(1).required(),
  }),

  body: Joi.object({}),
});

module.exports = { getAllGallerySchema, addToGallerySchema, deleteFromGallerySchema };
