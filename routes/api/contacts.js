const express = require('express');
const contactsOperations = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const result = await contactsOperations.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: result,
  });
});

router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const result = await contactsOperations.getContactById(contactId);
  res.json({
    status: 'success',
    code: 200,
    data: result,
  });
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const result = await contactsOperations.addContact({ name, email, phone });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: result,
  });
});

router.put('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const { name, email, phone } = req.body;
  const result = await contactsOperations.updateContact(contactId, {
    name,
    email,
    phone,
  });
  res.status(200).json({
    status: 'success',
    code: 200,
    data: result,
  });
});

router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const result = await contactsOperations.removeContact(contactId);
  res.json({
    status: 'success',
    code: 200,
    data: result,
  });
});

module.exports = router;
