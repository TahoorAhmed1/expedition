const express = require('express');
const handleMultipartData = require('../../middleware/populateMultipartData.middleware');
const uploadImage = require('../../middleware/uploadPicture.middleware');

const userRoutes = require('./users');
const blogRoutes = require('./blogs');
const eventRoutes = require('./events');
const galleryRoutes = require('./gallery');
const statRoutes = require('./stats');
const teamRoutes = require('./teams');
const giftRoutes = require('./gifts');

const router = express.Router();

router.post('/upload', handleMultipartData, uploadImage);

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/events', eventRoutes);
router.use('/gallery', galleryRoutes);
router.use('/stats', statRoutes);
router.use('/teams', teamRoutes);
router.use('/gifts', giftRoutes);

module.exports = router;
