const Joi = require('joi');

const {
  generateCustomErrMsg,
  regExps,
  subscriptionsList,
} = require('../helpers');

const registerSchema = Joi.object({
  name: Joi.string()
    .pattern(regExps.nameRegexp)
    .messages(generateCustomErrMsg('Name'))
    .required(),
  email: Joi.string()
    .pattern(regExps.emailRegexp)
    .messages(generateCustomErrMsg('Email'))
    .required(),
  password: Joi.string()
    .pattern(regExps.passwordRegexp)
    .messages(generateCustomErrMsg('Password'))
    .required(),
  repeatPassword: Joi.ref('password'),
  avatarURL: Joi.string(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string()
    .pattern(regExps.emailRegexp)
    .messages(generateCustomErrMsg('Email'))
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(regExps.emailRegexp)
    .messages(generateCustomErrMsg('Email'))
    .required(),
  password: Joi.string()
    .pattern(regExps.passwordRegexp)
    .messages(generateCustomErrMsg('Password'))
    .required(),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionsList)
    .messages(generateCustomErrMsg('Subscription')),
}).min(1);

module.exports = {
  registerSchema,
  verifyEmailSchema,
  loginSchema,
  updateSubscriptionSchema,
  refreshSchema,
};
