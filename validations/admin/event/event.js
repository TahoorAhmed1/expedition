const Joi = require('joi');

const createEventSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    title: Joi.string().max(255).required(),
    address: Joi.string().max(255).required(),
    description: Joi.string().required(),
    time: Joi.string().isoDate().required(),
    picture: Joi.string().max(1000).required(),
  }),
});

const updateEventSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    eventId: Joi.number().min(1).required(),
  }),
  body: Joi.object({
    title: Joi.string().max(255).optional(),
    address: Joi.string().max(255).optional(),
    description: Joi.string().optional(),
    time: Joi.string().optional(),
    picture: Joi.string().max(1000).optional(),
  }).min(1),
});

module.exports = { createEventSchema, updateEventSchema };
