const Joi = require('joi');

const getGalleryYearsSchema = Joi.object({
  query: Joi.object({
    type: Joi.string().valid('images', 'videos').required(),
  }),
  params: Joi.object({}),
  body: Joi.object({}),
});

const getGalleryByYearSchema = Joi.object({
  query: Joi.object({
    type: Joi.string().valid('images', 'videos').required(),
    year: Joi.number().min(2020).required(),
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional(),
  }),
  params: Joi.object({}),
  body: Joi.object({}),
});

module.exports = {
  getGalleryYearsSchema,
  getGalleryByYearSchema,
};
