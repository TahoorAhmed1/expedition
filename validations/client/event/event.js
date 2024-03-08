const Joi = require('joi');

const getEventsSchema = Joi.object({
  query: Joi.object({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional(),
  }),
  params: Joi.object({}),
  body: Joi.object({}),
});

module.exports = { getEventsSchema };
