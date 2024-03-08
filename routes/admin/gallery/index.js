const express = require('express');

const authRequired = require('@/middleware/authRequired.middleware');
const restrictToAdmins = require('@/middleware/restrictToAdmins.middleware');
const validateRequest = require('@/middleware/validateRequest.middleware');
const { addToGallerySchema, deleteFromGallerySchema, getAllGallerySchema } = require('../../../validations/admin/gallery/gallery');
const { addToGallery, deleteFromGallery, getAllGallery } = require('../../../controllers/admin/gallery/gallery.controllers');

const router = express.Router();

router.use(authRequired, restrictToAdmins);

router.get('/', validateRequest(getAllGallerySchema), getAllGallery);
router.post('/', validateRequest(addToGallerySchema), addToGallery);
router.delete('/:mediaId', validateRequest(deleteFromGallerySchema), deleteFromGallery);

module.exports = router;
