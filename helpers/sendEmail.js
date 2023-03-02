const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY, SENDGRID_EMAIL_HOST } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data => {
  const email = { ...data, from: SENDGRID_EMAIL_HOST };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
