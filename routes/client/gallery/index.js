const express = require('express');

const validateRequest = require('@/middleware/validateRequest.middleware');
const { getGalleryYearsSchema, getGalleryByYearSchema } = require('../../../validations/client/gallery/gallery');
const { getGalleryYears, getGalleryByYear } = require('../../../controllers/client/gallery/gallery.controllers');

const router = express.Router();

router.get('/', validateRequest(getGalleryYearsSchema), getGalleryYears);
router.get('/year', validateRequest(getGalleryByYearSchema), getGalleryByYear);

module.exports = router;
