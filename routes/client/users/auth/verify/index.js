const express = require('express');
const { verifyEmail, verifyAccess } = require('@/controllers/client/user/auth.controllers');
const authRequired = require('../../../../../middleware/authRequired.middleware');

const router = express.Router();

router.get('/email', authRequired, verifyEmail);
// router.post('/phone-number', googleRoutes);
router.post('/access', authRequired, verifyAccess);

module.exports = router;
