const validateError = message => {
  if (message.includes('name')) {
    return 'Name may contain only letters, apostrophe, dash and spaces.';
  } else if (message.includes('phone')) {
    return 'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +';
  } else if (message.includes('email')) {
    return 'Email may contain letters, numbers and some punctuation marks(dashes, dots, underscores)';
  }
};

module.exports = validateError;
