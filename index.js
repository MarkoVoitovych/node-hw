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

program.parse();

const argv = program.opts();
const allActions = ['list', 'get', 'add', 'edit', 'remove', 'clear'];

const isValidInput = value => {
  if (value < 1 || value > 10) {
    console.log('Число має бути в діапазоні від 1 до 10'.red);
    return false;
  }
  return true;
};

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
      console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

// invokeAction(argv);

const game = () => {
  rl.question(
    'Введіть число від 1 до 10, щоб вгадати задумане: '.yellow,
    value => {
      console.log(value);
      console.log(typeof value);
      // let a = +value;
      // if (!isValid(a)) {
      //   game();
      //   return;
      // }
      // count += 1;
      // if (a === mind) {
      //   console.log('Вітаю Ви вгадали число за %d крок(ів)'.green, count);
      //   rl.close();
      //   return;
      // }
      // console.log('Ви не вгадали ще спроба'.red);
      // game();
    },
  );
};

game();
