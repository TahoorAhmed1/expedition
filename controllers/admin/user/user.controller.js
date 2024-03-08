const { prisma } = require('@/configs/prisma');
const { okResponse } = require('@/constants/responses');

const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.users.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const response = okResponse(users);
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
};
