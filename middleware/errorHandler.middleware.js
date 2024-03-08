const { logger } = require('../configs/logger');
const { handlePrismaError } = require('../configs/prisma');
const { serverErrorResponse } = require('../constants/responses');

const errorHandler = (error, request, response, next) => {
  if (response.headersSent) {
    return next(error);
  }

  logger.error(error);

  const err = handlePrismaError(error);

  const res = serverErrorResponse(err?.message ?? err);
  return response.status(res.status.code).json(res);
};

module.exports = errorHandler;
