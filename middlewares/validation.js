const validateError = require('../helpers/validateError');

const validateBody = schema => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = validateError(error.message);
      error.message = errorMessage;
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = validateBody;
