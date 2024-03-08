const express = require('express');

const authRequired = require('@/middleware/authRequired.middleware');
const validateRequest = require('@/middleware/validateRequest.middleware');

const { getMyBioSchema, updateBioSchema, updatePasswordSchema } = require('@/validations/client/user/profile');

const {
  updateBio, updatePassword, getBio, verifyEmail,
} = require('@/controllers/client/user/profile.controllers');
const handleMultipartData = require('../../../../middleware/populateMultipartData.middleware');
const uploadImage = require('../../../../middleware/uploadPicture.middleware');

const router = express.Router();

router.post('/picture', authRequired, handleMultipartData, uploadImage);

router.get('/me', authRequired, validateRequest(getMyBioSchema), getBio);
router.patch('/bio', authRequired, validateRequest(updateBioSchema), updateBio);
router.patch('/verify-email', authRequired, verifyEmail);
router.patch('/password', authRequired, validateRequest(updatePasswordSchema), updatePassword);

module.exports = router;
