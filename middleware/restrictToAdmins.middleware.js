const { unauthorizedResponse } = require('../constants/responses');

const restrictToAdmins = (req, res, next) => {
  const { role } = req.user;

  if (role !== 'SUPER_ADMIN' && role !== 'ADMIN') {
    const response = unauthorizedResponse();
    return res.status(response.status.code).json(response);
  }
  next();
};

module.exports = restrictToAdmins;
