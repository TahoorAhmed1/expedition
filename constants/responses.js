const responses = {
  genericResponse: (status, success, data = null, error = null) => ({
    status: {
      code: status,
      success,
    },
    data,
    message: error,
  }),
  okResponse: (data = null, message = null) => ({
    status: {
      code: 200,
      success: true,
    },
    data,
    error: null,
    message,
  }),
  createSuccessResponse: (data = null, message = 'Successfully created.') => ({
    status: {
      code: 201,
      success: true,
    },
    data,
    error: null,
    message,
  }),
  updateSuccessResponse: (data = null, message = 'Successfully updated.') => ({
    status: {
      code: 200,
      success: true,
    },
    data,
    error: null,
    message,
  }),
  deleteSuccessResponse: (data = null, message = 'Successfully deleted.') => ({
    status: {
      code: 200,
      success: true,
    },
    data,
    error: null,
    message,
  }),
  badRequestResponse: (error = null) => ({
    status: {
      code: 400,
      success: false,
    },
    data: null,
    message: error,
  }),
  unauthorizedResponse: (error = null) => ({
    status: {
      code: 401,
      success: false,
    },
    data: null,
    message: error,
  }),
  forbiddenResponse: (error = null) => ({
    status: {
      code: 403,
      success: false,
    },
    data: null,
    message: error,
  }),
  serverErrorResponse: (error = null) => ({
    status: {
      code: 500,
      success: false,
    },
    data: null,
    message: error,
  }),
};

module.exports = responses;
