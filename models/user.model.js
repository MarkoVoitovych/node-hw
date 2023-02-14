const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const { mongooseHandleError } = require('../helpers');

const nameRegexp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const emailRegexp =
  /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,18}$/;

const registerSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).required(),
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegexp,
      required: [
        true,
        'Set name for user. Name may contain only letters, apostrophe, dash and spaces.',
      ],
    },
    password: {
      type: String,
      match: passwordRegexp,
      required: [
        true,
        'Set password for user. Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.',
      ],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [
        true,
        'Email is required. Email may contain letters, numbers and some punctuation marks(dashes, dots, underscores).',
      ],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    accessToken: { type: String, default: null },
    refreshToken: { type: String, default: null },
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.post('save', mongooseHandleError);

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model('user', userSchema);

module.exports = { schemas, User };
