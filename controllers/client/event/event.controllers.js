const { prisma } = require('@/configs/prisma');
const { okResponse, badRequestResponse } = require('@/constants/responses');

const getEvents = async (req, res, next) => {
  const page = Number(req.query?.page || 1);
  const limit = Number(req.query?.limit || 10);

  const offset = (page - 1) * limit;
  try {
    const events = await prisma.events.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        time: true,
        address: true,
        description: true,
        picture: true,
        createdAt: true,
        admin: {
          select: {
            username: true,
          },
        },
      },
    });

    const totalEventCount = await prisma.events.count();

    const response = okResponse({ events, totalEventCount });
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  const { eventId } = req.params;
  try {
    const event = await prisma.events.findUnique({
      where: {
        id: Number(eventId),
      },
      select: {
        id: true,
        title: true,
        time: true,
        address: true,
        description: true,
        picture: true,
        createdAt: true,
        admin: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!event) {
      const response = badRequestResponse('Event not found.');
      return res.status(response.status.code).json(response);
    }
    const response = okResponse(event);
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEvents,
  getEventById,
};
