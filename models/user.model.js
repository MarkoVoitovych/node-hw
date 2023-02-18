const { Schema, model } = require('mongoose');

const {
  mongooseHandleError,
  regExps,
  subscriptionsList,
} = require('../helpers');

const userSchema = new Schema(
  {
    name: {
      type: String,
      match: [
        regExps.nameRegexp,
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
        regExps.emailRegexp,
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

const User = model('user', userSchema);

module.exports = User;
