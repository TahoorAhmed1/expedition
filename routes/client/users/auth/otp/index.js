const express = require('express');
const { generateOtp, verifyOtp } = require('@/controllers/client/user/auth.controllers');
const validateRequest = require('@/middleware/validateRequest.middleware');
const { generateOtpSchema, verifyOtpSchema } = require('@/validations/client/user/auth');
const verifyOtpAuthToken = require('../../../../../middleware/verifyOtpAuthToken.middleware');

const router = express.Router();

router.post('/verify', verifyOtpAuthToken, validateRequest(verifyOtpSchema), verifyOtp);
router.post('/:type', validateRequest(generateOtpSchema), generateOtp);

module.exports = router;
