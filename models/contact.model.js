const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { mongooseHandleError } = require('../helpers');
const { generateCustomErrMsg } = require('../helpers');

const nameRegexp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const emailRegexp =
  /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const phoneRegexp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(nameRegexp)
    .messages(generateCustomErrMsg('Name'))
    .required(),
  email: Joi.string()
    .pattern(emailRegexp)
    .messages(generateCustomErrMsg('Email'))
    .required(),
  phone: Joi.string()
    .pattern(phoneRegexp)
    .messages(generateCustomErrMsg('Phone'))
    .required(),
  favourite: Joi.boolean(),
});

const updateStatusSchema = Joi.object({
  favourite: Joi.bool().messages(generateCustomErrMsg('Favourite')),
}).min(1);

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    favourite: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'user' },
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
