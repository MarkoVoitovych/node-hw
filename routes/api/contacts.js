const express = require('express');

const { contactsControllers } = require('../../controllers');
const { validation, ctrlWrapper } = require('../../middlewares');
const { contactSchema } = require('../../schemas');

const router = express.Router();

router.get('/', ctrlWrapper(contactsControllers.getAll));

router.get('/:contactId', ctrlWrapper(contactsControllers.getById));

router.post(
  '/',
  validation(contactSchema),
  ctrlWrapper(contactsControllers.add),
);

router.put(
  '/:contactId',
  validation(contactSchema),
  ctrlWrapper(contactsControllers.update),
);

router.delete('/:contactId', ctrlWrapper(contactsControllers.remove));

module.exports = router;
