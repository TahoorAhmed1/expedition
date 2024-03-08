const { prisma } = require('@/configs/prisma');
const { createSuccessResponse, updateSuccessResponse, deleteSuccessResponse } = require('@/constants/responses');

const addStats = async (req, res, next) => {
  try {
    const member = await prisma.stats.create({
      data: {
        ...req.body,
      },
    });
    const response = createSuccessResponse(member);
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const updateStats = async (req, res, next) => {
  const { statsId } = req.params;
  try {
    const result = await prisma.stats.update({
      where: {
        id: Number(statsId),
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

const deleteStats = async (req, res, next) => {
  const { statsId } = req.params;
  try {
    await prisma.stats.delete({
      where: {
        id: Number(statsId),
      },
    });

    const response = deleteSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addStats,
  updateStats,
  deleteStats,
};
