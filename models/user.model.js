const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { mongooseHandleError } = require('../helpers');
const { generateCustomErrMsg } = require('../helpers');

const nameRegexp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const emailRegexp =
  /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;

const subscriptionsList = ['starter', 'pro', 'business'];

const registerSchema = Joi.object({
  name: Joi.string()
    .pattern(nameRegexp)
    .messages(generateCustomErrMsg('Name'))
    .required(),
  email: Joi.string()
    .pattern(emailRegexp)
    .messages(generateCustomErrMsg('Email'))
    .required(),
  password: Joi.string()
    .pattern(passwordRegexp)
    .messages(generateCustomErrMsg('Password'))
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .messages(generateCustomErrMsg('Email'))
    .required(),
  password: Joi.string()
    .pattern(passwordRegexp)
    .messages(generateCustomErrMsg('Password'))
    .required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionsList)
    .messages(generateCustomErrMsg('Subscription')),
}).min(1);

const userSchema = new Schema(
  {
    name: {
      type: String,
      match: [
        nameRegexp,
        'may contain only letters, apostrophe, dash and spaces.',
      ],
      required: [true, 'is a required field.'],
    },
    password: {
      type: String,
      required: [true, 'is a required field.'],
    },
    email: {
      type: String,
      match: [
        emailRegexp,
        'may contain letters, numbers and some punctuation marks(dashes, dots, underscores).',
      ],
      required: [true, 'is a required field.'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionsList,
      default: 'starter',
    },
    accessToken: { type: String, default: null },
    refreshToken: { type: String, default: null },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', mongooseHandleError);

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
};

const User = model('user', userSchema);

module.exports = { schemas, User };
