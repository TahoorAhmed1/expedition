const { badRequestResponse, forbiddenResponse } = require('../constants/responses');
const { verifyAndDecodeOTPToken } = require('../services/auth.service');

const verifyOtpAuthToken = async (req, res, next) => {
  const token = req.headers?.authorization;

  if (!token) {
    const response = badRequestResponse('Token not provided.');
    return res.status(response.status.code).json(response);
  }

  const { tokenValid, decodedData } = verifyAndDecodeOTPToken(token);

  if (!tokenValid) {
    const response = forbiddenResponse('Invalid token.');
    return res.status(response.status.code).json(response);
  }
  req.user = decodedData;

  next();
};

module.exports = verifyOtpAuthToken;
