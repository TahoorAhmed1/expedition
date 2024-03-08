const Joi = require('joi');

const addStatsSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    label: Joi.string().required(),
    value: Joi.number().min(1).required(),
    type: Joi.string().required(),
  }),
});

const updateStatsSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    statsId: Joi.number().min(1).required(),
  }),
  body: Joi.object({
    label: Joi.string().optional(),
    value: Joi.number().min(1).optional(),
    type: Joi.string().optional(),
  }),
});

const deleteStatsSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    statsId: Joi.number().min(1).required(),
  }),
  body: Joi.object({}),
});

module.exports = {
  addStatsSchema,
  updateStatsSchema,
  deleteStatsSchema,
};
