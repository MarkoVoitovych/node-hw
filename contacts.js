const fs = require('fs').promises;
const { v4 } = require('uuid');
const { listContacts } = require('./listContacts');
const { writeContacts } = require('./writeContacts');

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: v4() };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

async function editContact({ id, name, email, phone }) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { name, email, phone, id };
  await writeContacts(contacts);
  return contacts[idx];
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removedContact = await getContactById(contactId);
  if (!removedContact) {
    return null;
  }
  const newContacts = contacts.filter(contact => contact.id !== contactId);
  await writeContacts(newContacts);
  return removedContact;
}

module.exports = {
  getContactById,
  addContact,
  editContact,
  removeContact,
};
