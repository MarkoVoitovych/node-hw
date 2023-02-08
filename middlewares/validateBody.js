const { HttpError, validateError } = require('../helpers');

const validateBody = schema => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const customErrorMessage = validateError(error.message);
      if (customErrorMessage) {
        return next(HttpError(400, customErrorMessage));
      }
      return next(HttpError(400, error.message));
    }
    next();
  };
};

module.exports = validateBody;
