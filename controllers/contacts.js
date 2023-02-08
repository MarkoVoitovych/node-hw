const contactsOperations = require('../models/contacts');
const { ctrlWrapper, HttpError } = require('../helpers');

const getAll = async (_, res) => {
  const result = await contactsOperations.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: result,
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: result,
  });
};

const add = async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await contactsOperations.addContact({ name, email, phone });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: result,
  });
};

const update = async (req, res) => {
  const { name, email, phone } = req.body;
  const contactId = req.params.contactId;
  const result = await contactsOperations.updateContact(contactId, {
    name,
    email,
    phone,
  });
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: result,
  });
};

const remove = async (req, res) => {
  const contactId = req.params.contactId;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: result,
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
};
