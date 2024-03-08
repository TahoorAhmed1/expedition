const express = require('express');

const { getStories, getMyStories, postAStory } = require('@/controllers/client/story/story.controllers');

const validateRequest = require('@/middleware/validateRequest.middleware');
const { getStoriesSchema, postStorySchema } = require('@/validations/client/story/story');
const guestAccess = require('../../../middleware/guestAccess.middleware');
const authRequired = require('../../../middleware/authRequired.middleware');

const router = express.Router();

router.get('/', validateRequest(getStoriesSchema), getStories);
router.get('/me', authRequired, validateRequest(getStoriesSchema), getMyStories);
router.post('/', guestAccess, validateRequest(postStorySchema), postAStory);

module.exports = router;
