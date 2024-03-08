const { prisma } = require('@/configs/prisma');
const { createSuccessResponse, updateSuccessResponse, deleteSuccessResponse } = require('@/constants/responses');

const addGift = async (req, res, next) => {
  try {
    const gift = await prisma.gifts.create({
      data: {
        ...req.body,
      },
    });
    const response = createSuccessResponse(gift);
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const updateGift = async (req, res, next) => {
  const { giftId } = req.params;
  try {
    const result = await prisma.gifts.update({
      where: {
        id: Number(giftId),
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

const deleteGift = async (req, res, next) => {
  const { giftId } = req.params;

  try {
    await prisma.gifts.delete({
      where: {
        id: Number(giftId),
      },
    });

    const response = deleteSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addGift,
  updateGift,
  deleteGift,
};
