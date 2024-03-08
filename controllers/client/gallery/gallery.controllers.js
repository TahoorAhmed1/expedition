const { prisma } = require('@/configs/prisma');
const { okResponse } = require('@/constants/responses');

const getGalleryYears = async (req, res, next) => {
  const { type } = req.query;

  try {
    const galleryYears = await prisma.gallery.findMany({
      distinct: ['year'],
      where: {
        type: type === 'images' ? 'PICTURE' : 'VIDEO',
      },
      orderBy: {
        year: 'desc',
      },
    });

    const response = okResponse(galleryYears);
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const getGalleryByYear = async (req, res, next) => {
  const { type, year } = req.query;
  const page = Number(req.query?.page || 1);
  const limit = Number(req.query?.limit || 10);

  const offset = (page - 1) * limit;
  try {
    const gallery = await prisma.gallery.findMany({
      where: {
        type: type === 'images' ? 'PICTURE' : 'VIDEO',
        year: Number(year),
      },
      take: limit,
      skip: offset,
    });

    const totalMediaCount = await prisma.gallery.count({
      where: {
        type: type === 'images' ? 'PICTURE' : 'VIDEO',
        year: Number(year),
      },
    });
    const response = okResponse({ gallery, totalMediaCount });
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGalleryYears,
  getGalleryByYear,
};
