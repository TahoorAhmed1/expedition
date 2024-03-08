const express = require('express');
const { getStats } = require('@/controllers/client/stats/stats.controllers');

const router = express.Router();

router.get('/', getStats);

module.exports = router;
