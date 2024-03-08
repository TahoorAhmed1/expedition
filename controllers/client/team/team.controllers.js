const { prisma } = require('@/configs/prisma');
const { okResponse } = require('@/constants/responses');

const getTeamMembers = async (req, res, next) => {
  try {
    const members = await prisma.teamMembers.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        designation: true,
        picture: true,
      },
    });

    const totalMemberCount = await prisma.teamMembers.count();

    const response = okResponse({ members, totalMemberCount });
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTeamMembers,
};
