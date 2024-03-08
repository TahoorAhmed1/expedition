const express = require('express');

const { getEvents, getEventById } = require('@/controllers/client/event/event.controllers');

const validateRequest = require('@/middleware/validateRequest.middleware');
const { getEventsSchema } = require('@/validations/client/event/event');

const router = express.Router();

router.get('/', validateRequest(getEventsSchema), getEvents);
router.get('/:eventId', getEventById);

module.exports = router;
