const { HttpError, customValidateBodyError } = require('../helpers');

const validateBody = schema => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      // const customErrorMessage = customValidateBodyError(error.message);
      // if (customErrorMessage) {
      //   return next(HttpError(400, customErrorMessage));
      // }
      next(HttpError(400, error.message));
      return;
    }
    next();
  };
};

module.exports = validateBody;
