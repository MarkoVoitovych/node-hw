const { isValidObjectId } = require('mongoose');

const { HttpError } = require('../helpers');

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = HttpError(400, `Id: ${contactId} is in wrong format`);
    next(error);
  }
  next();
};

module.exports = isValidId;
