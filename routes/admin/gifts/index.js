const express = require('express');

const authRequired = require('@/middleware/authRequired.middleware');
const restrictToAdmins = require('@/middleware/restrictToAdmins.middleware');
const validateRequest = require('@/middleware/validateRequest.middleware');
const { addGiftSchema, updateGiftSchema, deleteGiftSchema } = require('@/validations/admin/gift/gift');
const { addGift, updateGift, deleteGift } = require('@/controllers/admin/gift/gift.controllers');

const router = express.Router();

router.use(authRequired, restrictToAdmins);

router.post('/', validateRequest(addGiftSchema), addGift);
router.patch('/:giftId', validateRequest(updateGiftSchema), updateGift);
router.delete('/:giftId', validateRequest(deleteGiftSchema), deleteGift);

module.exports = router;
