const createError = require('http-errors');
const contactsOperations = require('../../models/contacts');

const getById = async (req, res) => {
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
};

module.exports = getById;
