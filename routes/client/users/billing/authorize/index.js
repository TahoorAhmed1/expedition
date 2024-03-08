const express = require('express');
const authRequired = require('@/middleware/authRequired.middleware');
const validateRequest = require('@/middleware/validateRequest.middleware');
const { authorizeChargeSchema } = require('@/validations/client/user/billing');

const router = express.Router();

router.post('/subscribe', authRequired, validateRequest(authorizeChargeSchema), (req, res) => {
  res.send(200);
});
// router.get('/un-subscribe', authRequired, unSubscribe);

// router.get('/invoices', authRequired, subscriptionHistory);

// router.post('/change-plan', authRequired, validateRequest(authorizeUpdateSchema), changeSubscriptionPlan);

module.exports = router;
