const { program } = require('commander');
const readline = require('readline');
require('colors');

const { listContacts } = require('./listContacts');
const {
  getContactById,
  editContact,
  removeContact,
  addContact,
} = require('./contacts');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

const allActions = ['list', 'get', 'add', 'edit', 'remove', 'clear'];

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const findedContact = await getContactById(String(id));
      console.log(findedContact);
      break;

    case 'add':
      const newContact = await addContact({ name, email, phone });
      console.log(newContact);
      break;

    case 'edit':
      const editedContact = await editContact({
        id: String(id),
        ...argv,
      });
      console.log(editedContact);
      break;

    case 'remove':
      const removedContact = await removeContact(String(id));
      console.log(removedContact);
      break;

    case 'clear':
      rl.close();
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};
