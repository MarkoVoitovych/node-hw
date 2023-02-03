const contactsOperations = require('../../models/contacts');

const getAll = async (_, res) => {
  const result = await contactsOperations.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: result,
  });
};

module.exports = getAll;
