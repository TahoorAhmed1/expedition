const { prisma } = require('@/configs/prisma');

const { updateSuccessResponse } = require('@/constants/responses');

const updateProfile = async (req, res, next) => {
  const { userId } = req.user;
  try {
    await prisma.admins.update({
      where: {
        id: userId,
      },
      data: {
        ...req.body,
      },
    });

    const response = updateSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateProfile,
};
