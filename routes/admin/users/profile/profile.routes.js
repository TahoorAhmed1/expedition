const express = require('express');

const authRequired = require('@/middleware/authRequired.middleware');
const restrictToAdmins = require('@/middleware/restrictToAdmins.middleware');
const validateRequest = require('@/middleware/validateRequest.middleware');
const { updateSchema } = require('@/validations/admin/user/profile');
const { updateProfile } = require('@/controllers/admin/user/profile.controllers');

const router = express.Router();

router.use(authRequired, restrictToAdmins);

router.patch('/', authRequired, restrictToAdmins, validateRequest(updateSchema), updateProfile);

module.exports = router;
