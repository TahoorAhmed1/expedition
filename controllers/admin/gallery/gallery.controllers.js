const { prisma } = require('@/configs/prisma');
const { createSuccessResponse, deleteSuccessResponse, okResponse } = require('@/constants/responses');

const addToGallery = async (req, res, next) => {
  const { year, type } = req.query;
  const { media } = req.body;
  try {
    const mediaUrls = media.map((m) => ({
      type: type === 'images' ? 'PICTURE' : 'VIDEO',
      year: Number(year),
      url: m,
    }));

    await prisma.gallery.createMany({
      data: mediaUrls,
    });
    const response = createSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const deleteFromGallery = async (req, res, next) => {
  const { mediaId } = req.params;
  try {
    await prisma.gallery.delete({
      where: {
        id: Number(mediaId),
      },
    });
    const response = deleteSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const getAllGallery = async (req, res, next) => {
  const { type } = req.query;

  try {
    const gallery = await prisma.gallery.findMany({
      where: {
        type: type === 'images' ? 'PICTURE' : 'VIDEO',
      },
    });

    const response = okResponse({ gallery });
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToGallery,
  deleteFromGallery,
  getAllGallery,
};
