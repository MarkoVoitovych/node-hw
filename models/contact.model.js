const { Schema, model } = require('mongoose');

const { mongooseHandleError, regExps } = require('../helpers');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      match: [
        regExps.nameRegexp,
        'may contain only letters, apostrophe, dash and spaces.',
      ],
      required: true,
    },
    email: {
      type: String,
      match: [
        regExps.emailRegexp,
        'may contain letters, numbers and some punctuation marks(dashes, dots, underscores).',
      ],
      required: true,
    },
    phone: {
      type: String,
      match: [
        regExps.phoneRegexp,
        'number must be digits and can contain spaces, dashes, parentheses and can start with +.',
      ],
      required: true,
    },
    favourite: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'user' },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.post('save', mongooseHandleError);

const Contact = model('contact', contactSchema);

module.exports = Contact;
