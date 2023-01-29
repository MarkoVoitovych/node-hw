const { program } = require('commander');

const { listContacts } = require('./listContacts');
const {
  getContactById,
  editContact,
  removeContact,
  addContact,
} = require('./contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

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
        name,
        email,
        phone,
      });
      console.log(editedContact);
      break;

    case 'remove':
      const removedContact = await removeContact(String(id));
      console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
