const express = require('express');

const validateRequest = require('@/middleware/validateRequest.middleware');

const { signupSchema, loginSchema, resetPasswordSchema } = require('@/validations/client/user/auth');

const { signup, login, resetPassword } = require('@/controllers/client/user/auth.controllers');

const oAuthRoutes = require('./OAuth/index');
const otpRoutes = require('./otp/index');
const verifyOtpAuthToken = require('../../../../middleware/verifyOtpAuthToken.middleware');

const router = express.Router();

router.use('/otp', otpRoutes);
router.use('/oauth', oAuthRoutes);

router.post('/signup', validateRequest(signupSchema), signup);
router.post('/login', validateRequest(loginSchema), login);
router.post('/reset-password', verifyOtpAuthToken, validateRequest(resetPasswordSchema), resetPassword);

module.exports = router;
