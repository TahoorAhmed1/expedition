const express = require('express');
const validateRequest = require('@/middleware/validateRequest.middleware');
const { contactMessageSchema } = require('@/validations/client/contactUs/contactUs');
const { submitMessage } = require('@/controllers/client/contactUs/contactUs.controllers');

const router = express.Router();

router.post('/', validateRequest(contactMessageSchema), submitMessage);

module.exports = router;
