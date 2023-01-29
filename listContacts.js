const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

module.exports = {
  listContacts,
};
