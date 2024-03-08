const express = require('express');

const authorizeRoutes = require('./authorize');

const router = express.Router();

router.use('/authorize', authorizeRoutes);

module.exports = router;
