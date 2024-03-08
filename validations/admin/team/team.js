const Joi = require('joi');

const addTeamMemberSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    name: Joi.string().max(30).required(),
    designation: Joi.string().required(),
    picture: Joi.string().optional(),
  }),
});

const updateTeamMemberSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    memberId: Joi.number().min(1).required(),
  }),
  body: Joi.object({
    name: Joi.string().max(30).optional(),
    designation: Joi.string().optional(),
    picture: Joi.string().optional(),
  }),
});

const deleteTeamMemberSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    memberId: Joi.number().min(1).required(),
  }),
  body: Joi.object({}),
});

module.exports = {
  addTeamMemberSchema,
  updateTeamMemberSchema,
  deleteTeamMemberSchema,
};
