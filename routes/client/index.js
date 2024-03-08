const express = require('express');

const userRoutes = require('./users');
const teamRoutes = require('./teams');
const blogRoutes = require('./blogs');
const eventRoutes = require('./events');
const galleryRoutes = require('./gallery');
const storyRoutes = require('./stories');
const giftRoutes = require('./gifts');
const statRoutes = require('./stats');
const contactUsRoutes = require('./contactUs');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);
router.use('/blogs', blogRoutes);
router.use('/events', eventRoutes);
router.use('/gallery', galleryRoutes);
router.use('/stories', storyRoutes);
router.use('/gifts', giftRoutes);
router.use('/stats', statRoutes);
router.use('/contact-us', contactUsRoutes);

module.exports = router;
