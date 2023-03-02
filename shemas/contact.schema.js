const Joi = require('joi');

const { generateCustomErrMsg, regExps } = require('../helpers');

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(regExps.nameRegexp)
    .messages(generateCustomErrMsg('Name'))
    .required(),
  email: Joi.string()
    .pattern(regExps.emailRegexp)
    .messages(generateCustomErrMsg('Email'))
    .required(),
  phone: Joi.string()
    .pattern(regExps.phoneRegexp)
    .messages(generateCustomErrMsg('Phone'))
    .required(),
  favourite: Joi.boolean(),
});

const updateStatusSchema = Joi.object({
  favourite: Joi.bool().messages(generateCustomErrMsg('Favourite')),
}).min(1);

module.exports = {
  addSchema,
  updateStatusSchema,
};
