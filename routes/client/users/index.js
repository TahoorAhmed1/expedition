const express = require('express');

const authRoutes = require('./auth/authentication.routes');
const profileRoutes = require('./profile/profile.routes');
const billingRoutes = require('./billing/billing.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/billing', billingRoutes);

module.exports = router;
