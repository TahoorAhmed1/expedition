const Joi = require('joi');

const addGiftSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    picture: Joi.string().required(),
    isActive: Joi.boolean().required(),
  }),
});

const updateGiftSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    giftId: Joi.number().min(1).required(),
  }),
  body: Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    picture: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
  }).min(1),
});

const deleteGiftSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    giftId: Joi.number().min(1).required(),
  }),
  body: Joi.object({}),
});

module.exports = {
  addGiftSchema,
  updateGiftSchema,
  deleteGiftSchema,
};
