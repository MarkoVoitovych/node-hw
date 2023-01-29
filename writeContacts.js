const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function writeContacts(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

module.exports = {
  writeContacts,
};
