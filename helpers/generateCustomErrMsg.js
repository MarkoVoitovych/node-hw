const errorMessages = [
  {
    name: 'Name',
    text: 'Name may contain only letters, apostrophe, dash and spaces.',
  },
  {
    name: 'Phone',
    text: 'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +.',
  },
  {
    name: 'Email',
    text: 'Email may contain letters, numbers and some punctuation marks(dashes, dots, underscores).',
  },
  {
    name: 'Password',
    text: 'Password must be minimum six characters long, at least one uppercase letter, one lowercase letter and one number.',
  },
  {
    name: 'Favourite',
    text: `The field "favorite" can only be true or false.`,
  },
  {
    name: 'Subscription',
    text: `Choose one of three subscription options: "starter", "pro", "business".`,
  },
];

const generateCustomErrMsg = fieldName => {
  const message = errorMessages.find(item => item.name === fieldName);

  return {
    'string.base': `${message.name} should be a type of string.`,
    'string.empty': `${message.name} must contain value.`,
    'string.pattern.base': `${message.text}`,
    'any.required': `${message.name} is a required field.`,
  };
};

module.exports = generateCustomErrMsg;
