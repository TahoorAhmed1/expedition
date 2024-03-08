const { prisma } = require('@/configs/prisma');
const { okResponse, badRequestResponse } = require('@/constants/responses');

const getBlogs = async (req, res, next) => {
  const page = Number(req.query?.page);
  const limit = Number(req.query?.limit);

  const offset = (page - 1) * limit;
  const obj = limit ? { take: limit, skip: offset } : {};
  try {
    const blogs = await prisma.blogs.findMany({
      ...obj,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        picture: true,
        quotation: true,
        content: true,
        createdAt: true,
        admin: {
          select: {
            username: true,
          },
        },
      },
    });

    const totalBlogCount = await prisma.blogs.count();
    const response = okResponse({ blogs, totalBlogCount });
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const getBlogById = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    const blog = await prisma.blogs.findUnique({
      where: {
        id: Number(blogId),
      },
      select: {
        id: true,
        title: true,
        picture: true,
        quotation: true,
        content: true,
        createdAt: true,
        admin: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!blog) {
      const response = badRequestResponse('Blog not found.');
      return res.status(response.status.code).json(response);
    }
    const response = okResponse(blog);
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogs,
  getBlogById,
};
