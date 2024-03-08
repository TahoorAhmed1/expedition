const express = require('express');

const authRequired = require('@/middleware/authRequired.middleware');
const restrictToAdmins = require('@/middleware/restrictToAdmins.middleware');
const { getUsers } = require('../../../../controllers/admin/user/user.controller');

const router = express.Router();

router.use(authRequired, restrictToAdmins);

router.get('/', authRequired, restrictToAdmins, getUsers);

module.exports = router;
