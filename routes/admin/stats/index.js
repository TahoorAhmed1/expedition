const express = require('express');

const authRequired = require('@/middleware/authRequired.middleware');
const restrictToAdmins = require('@/middleware/restrictToAdmins.middleware');
const validateRequest = require('@/middleware/validateRequest.middleware');
const { addStatsSchema, updateStatsSchema, deleteStatsSchema } = require('@/validations/admin/stats/stats');
const { addStats, updateStats, deleteStats } = require('@/controllers/admin/stats/stats.controllers');

const router = express.Router();

router.use(authRequired, restrictToAdmins);

router.post('/', validateRequest(addStatsSchema), addStats);
router.patch('/:statsId', validateRequest(updateStatsSchema), updateStats);
router.delete('/:statsId', validateRequest(deleteStatsSchema), deleteStats);

module.exports = router;
