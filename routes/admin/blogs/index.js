const express = require('express');

const { createBlog, updateBlog, deleteBlog } = require('@/controllers/admin/blog/blog.controllers');

const authRequired = require('@/middleware/authRequired.middleware');
const restrictToAdmins = require('@/middleware/restrictToAdmins.middleware');
const validateRequest = require('@/middleware/validateRequest.middleware');
const { createBlogSchema, updateBlogSchema } = require('@/validations/admin/blog/blog');

const router = express.Router();

router.use(authRequired, restrictToAdmins);

router.post('/', validateRequest(createBlogSchema), createBlog);
router.patch('/:blogId', validateRequest(updateBlogSchema), updateBlog);
router.delete('/:blogId', deleteBlog);

module.exports = router;
