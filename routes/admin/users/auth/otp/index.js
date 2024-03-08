const express = require('express');
const { generateOtp, verifyOtp } = require('@/controllers/admin/user/auth.controllers');
const authRequired = require('@/middleware/authRequired.middleware');
const validateRequest = require('@/middleware/validateRequest.middleware');
const { generateOtpSchema, verifyOtpSchema } = require('@/validations/admin/user/auth');

const router = express.Router();

router.post('/verify', authRequired, validateRequest(verifyOtpSchema), verifyOtp);
router.post('/:type', validateRequest(generateOtpSchema), generateOtp);

module.exports = router;
