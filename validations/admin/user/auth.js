const Joi = require('joi');

const addNewAdminSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    username: Joi.string().max(30).required(),
    email: Joi.string().max(50).email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('ADMIN', 'SUPER_ADMIN').required(),
  }),
});

const loginSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    email: Joi.string().max(50).email().required(),
    password: Joi.string().required(),
  }),
});

const resetPasswordSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    password: Joi.string().min(8).required(),
  }),
});

const generateOtpSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    type: Joi.string().valid('emailVerification', 'resetPassword').required(),
  }),
  body: Joi.object({
    email: Joi.string().max(50).email().required(),
  }),
});

const verifyOtpSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    otp: Joi.string().required(),
  }),
});

module.exports = {
  addNewAdminSchema,
  loginSchema,
  resetPasswordSchema,
  generateOtpSchema,
  verifyOtpSchema,
};
