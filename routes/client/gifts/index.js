const express = require('express');
const { getGifts } = require('@/controllers/client/gift/gift.controllers');

const router = express.Router();

router.get('/', getGifts);

module.exports = router;
