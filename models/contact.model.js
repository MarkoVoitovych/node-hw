const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { mongooseHandleError } = require('../helpers');

const nameRegexp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const emailRegexp =
  /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const phoneRegexp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const addSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favourite: Joi.boolean(),
});

const updateStatusSchema = Joi.object({
  favourite: Joi.bool().required(),
});

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [
        true,
        'Set name for contact. Name may contain only letters, apostrophe, dash and spaces.',
      ],
    },
    email: {
      type: String,
      required: [
        true,
        'Set email for contact. Email may contain letters, numbers and some punctuation marks(dashes, dots, underscores).',
      ],
    },
    phone: {
      type: String,
      required: [
        true,
        'Set phone for contact. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +.',
      ],
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.post('save', mongooseHandleError);

const schemas = {
  addSchema,
  updateStatusSchema,
};

const Contact = model('contact', contactSchema);

module.exports = { schemas, Contact };
