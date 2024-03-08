const { prisma } = require('@/configs/prisma');
const { okResponse } = require('@/constants/responses');

const getStats = async (req, res, next) => {
  try {
    const stats = await prisma.stats.findMany();

    const response = okResponse(stats);
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
};
