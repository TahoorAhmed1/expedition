const express = require('express');

const { createEvent, updateEvent, deleteEvent } = require('@/controllers/admin/event/event.controllers');

const authRequired = require('@/middleware/authRequired.middleware');
const restrictToAdmins = require('@/middleware/restrictToAdmins.middleware');
const validateRequest = require('@/middleware/validateRequest.middleware');
const { createEventSchema, updateEventSchema } = require('@/validations/admin/event/event');

const router = express.Router();

router.use(authRequired, restrictToAdmins);

router.post('/', validateRequest(createEventSchema), createEvent);
router.patch('/:eventId', validateRequest(updateEventSchema), updateEvent);
router.delete('/:eventId', deleteEvent);

module.exports = router;
