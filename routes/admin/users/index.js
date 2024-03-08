const express = require('express');

const authRoutes = require('./auth/authentication.routes');
const profileRoutes = require('./profile/profile.routes');
const userRoutes = require('./user/user.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/all', userRoutes);

module.exports = router;
