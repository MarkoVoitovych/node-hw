const createError = require('http-errors');

const contactsOperations = require('../../models/contacts');

const update = async (req, res) => {
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
};

module.exports = update;
