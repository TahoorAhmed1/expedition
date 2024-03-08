const { logger } = require('../configs/logger');
const { prisma } = require('../configs/prisma');
const { badRequestResponse, serverErrorResponse } = require('../constants/responses');

const validateUniqueEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      const response = badRequestResponse('Email already taken.');
      return res.status(response.status.code).json(response);
    }

    next();
  } catch (error) {
    logger.error('validateUniqueEmail error --> ', error);
    const response = serverErrorResponse();
    return res.status(response.status.code).json(response);
  }
};

module.exports = validateUniqueEmail;
