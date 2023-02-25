const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const authentication = require('./authentication');
const refreshToken = require('./refreshToken');
const upload = require('./upload');

module.exports = {
  validateBody,
  isValidId,
  authentication,
  refreshToken,
  upload,
};
