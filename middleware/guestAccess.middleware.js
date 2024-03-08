const { verifyAndDecodeToken } = require('../services/auth.service');

const guestAccess = async (req, res, next) => {
  const token = req.headers?.authorization;

  if (!token) {
    req.user = {};
    return next();
  }

  const { tokenValid, decodedData } = verifyAndDecodeToken(token);

  if (!tokenValid) {
    req.user = {};
    return next();
  }

  req.user = decodedData;

  next();
};

module.exports = guestAccess;
