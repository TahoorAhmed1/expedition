const { prisma } = require('@/configs/prisma');
const { createSuccessResponse, updateSuccessResponse, deleteSuccessResponse } = require('@/constants/responses');

const createEvent = async (req, res, next) => {
  const { userId: authorId } = req.user;

  try {
    const event = await prisma.events.create({
      data: { ...req.body, time: new Date(req.body.time), createdBy: authorId },
    });
    const response = createSuccessResponse(event);
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const updateEvent = async (req, res, next) => {
  const { eventId } = req.params;
  try {
    const result = await prisma.events.update({
      where: {
        id: Number(eventId),
      },
      data: {
        ...req.body,
        time: req.body?.time ? new Date(req.body.time) : undefined,
      },
    });
    const response = updateSuccessResponse(result);
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  const { eventId } = req.params;
  try {
    await prisma.events.delete({
      where: {
        id: Number(eventId),
      },
    });

    const response = deleteSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
};
