const express = require('express');

const googleRoutes = require('./google.routes');

const router = express.Router();

router.use('/google', googleRoutes);

module.exports = router;
