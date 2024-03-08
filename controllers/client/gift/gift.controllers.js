const { prisma } = require('@/configs/prisma');
const { okResponse } = require('@/constants/responses');

const getGifts = async (req, res, next) => {
  try {
    const gifts = await prisma.gifts.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        picture: true,
        isActive: true,
      },
    });

    const response = okResponse(gifts);
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGifts,
};
