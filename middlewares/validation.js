const generateErrorMessage = require('../helpers/generateErrorMessage');

const validation = schema => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = generateErrorMessage(error.message);
      error.message = errorMessage;
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = validation;
