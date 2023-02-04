const generateErrorMessage = message => {
  if (message.includes('name')) {
    return "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";
  } else if (message.includes('phone')) {
    return 'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +';
  } else if (message.includes('email')) {
    return 'Invalid email adress';
  } else {
    return 'Validation error';
  }
};

module.exports = generateErrorMessage;
