const { prisma } = require('@/configs/prisma');
const { okResponse, createSuccessResponse } = require('@/constants/responses');

const getStories = async (req, res, next) => {
  const page = Number(req.query?.page || 1);
  const limit = Number(req.query?.limit || 10);

  const offset = (page - 1) * limit;
  try {
    const stories = await prisma.stories.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      where: {
        adminApproved: true,
      },
      select: {
        name: true,
        email: true,
        description: true,
        createdAt: true,
      },
    });

    const totalStoryCount = await prisma.stories.count({
      where: {
        adminApproved: true,
      },
    });

    const response = okResponse({ stories, totalStoryCount });
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const getMyStories = async (req, res, next) => {
  const { userId } = req.user;
  const page = Number(req.query?.page || 1);
  const limit = Number(req.query?.limit || 10);

  const offset = (page - 1) * limit;
  try {
    const stories = await prisma.stories.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      where: {
        userId,
      },
      select: {
        name: true,
        email: true,
        description: true,
        createdAt: true,
        adminApproved: true,
      },
    });

    const totalStoryCount = await prisma.stories.count({
      where: {
        userId,
      },
    });

    const response = okResponse({ stories, totalStoryCount });
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const postAStory = async (req, res, next) => {
  const { userId } = req.user;
  const { name, email, description } = req.body;
  try {
    const story = await prisma.stories.create({
      data: {
        name,
        email,
        description,
        userId,
      },
    });

    const response = createSuccessResponse(story, 'Story submitted. Will be live after admin approval.');
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStories,
  getMyStories,
  postAStory,
};
