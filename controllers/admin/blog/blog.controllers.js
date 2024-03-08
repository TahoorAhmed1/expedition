const { prisma } = require('@/configs/prisma');
const { createSuccessResponse, updateSuccessResponse, deleteSuccessResponse } = require('@/constants/responses');

const createBlog = async (req, res, next) => {
  const { userId: authorId } = req.user;

  try {
    const blog = await prisma.blogs.create({
      data: { ...req.body, authorId },
    });
    const response = createSuccessResponse(blog);
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    const result = await prisma.blogs.update({
      where: {
        id: Number(blogId),
      },
      data: {
        ...req.body,
      },
    });
    const response = updateSuccessResponse(result);
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    await prisma.blogs.delete({
      where: {
        id: Number(blogId),
      },
    });

    const response = deleteSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
};
