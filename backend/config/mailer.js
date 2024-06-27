const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (email, subject, templatePath, replacements) => {
  const template = fs.readFileSync(templatePath, { encoding: 'utf-8' });
  let htmlContent = template;

  for (const key in replacements) {
    htmlContent = htmlContent.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
  }

  transporter.sendMail({
    to: email,
    subject: subject,
    html: htmlContent,
    attachments: [{
      filename: 'logo.png',
      path: path.join(__dirname, '../emails/assets/logo.png'),
      cid: 'logo@huenique' // same cid value as in the html img src
    }]
  }, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const sendConfirmationEmail = (email, token) => {
  const url = `http://localhost:3000/api/auth/confirm/${token}`;
  const templatePath = path.join(__dirname, '../emails/templates/confirmEmail.html');
  
  sendEmail(email, 'Confirm your Email', templatePath, { url });
};

const sendResetPasswordEmail = (email, token) => {
  const url = `http://localhost:4200/reset-password/${token}`;
  const templatePath = path.join(__dirname, '../emails/templates/resetPassword.html');

  sendEmail(email, 'Reset Password', templatePath, { url });
};

module.exports = { sendConfirmationEmail, sendResetPasswordEmail };
