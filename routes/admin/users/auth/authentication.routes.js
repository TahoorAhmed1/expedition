const express = require('express');

const validateRequest = require('@/middleware/validateRequest.middleware');
const authRequired = require('@/middleware/authRequired.middleware');

const { loginSchema, addNewAdminSchema } = require('@/validations/admin/user/auth');

const { login, addNewAdmin } = require('@/controllers/admin/user/auth.controllers');

const router = express.Router();

router.post('/login', validateRequest(loginSchema), login);

router.post('/register', authRequired, validateRequest(addNewAdminSchema), addNewAdmin);

module.exports = router;
