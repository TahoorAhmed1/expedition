const express = require('express');

const { getBlogs, getBlogById } = require('@/controllers/client/blog/blog.controllers');

const validateRequest = require('@/middleware/validateRequest.middleware');
const { getBlogsSchema, getBlogByIdSchema } = require('@/validations/client/blog/blog');

const router = express.Router();

router.get('/', validateRequest(getBlogsSchema), getBlogs);
router.get('/:blogId', validateRequest(getBlogByIdSchema), getBlogById);

module.exports = router;
