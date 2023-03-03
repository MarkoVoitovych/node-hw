const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { HttpError, ctrlWrapper } = require('../helpers');

const { JWT_REFRESH_SECRET } = process.env;

const refreshToken = async (req, res, next) => {
  const { refreshToken: token } = req.body;
  let payload = '';
  try {
    payload = jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    throw HttpError(400, 'No token provided');
  }
  const user = await User.findById(payload.id);
  if (!user) {
    throw HttpError(404, "User doesn't exist");
  }
  if (!user.refreshToken || user.refreshToken !== token) {
    throw HttpError(403, 'Invalid token');
  }
  req.user = user;
  next();
};

module.exports = ctrlWrapper(refreshToken);
