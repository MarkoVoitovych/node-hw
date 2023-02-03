const express = require('express');
const contactsOperations = require('../../models/contacts');
const createError = require('http-errors');
const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required,
  phone: Joi.number().required,
});

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      throw createError(404, `Contact with id ${contactId} not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { name, email, phone } = req.body;
    const result = await contactsOperations.addContact({ name, email, phone });
    res.status(201).json({
      status: 'success',
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { name, email, phone } = req.body;
    const contactId = req.params.contactId;
    const result = await contactsOperations.updateContact(contactId, {
      name,
      email,
      phone,
    });
    if (!result) {
      throw createError(404, `Contact with id ${contactId} not found`);
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const result = await contactsOperations.removeContact(contactId);
    res.json({
      status: 'success',
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
