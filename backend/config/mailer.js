const nodemailer = require('nodemailer');

console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = (email, token) => {
  const url = `http://localhost:3000/api/confirm/${token}`;

  transporter.sendMail({
    to: email,
    subject: 'Confirm your Email',
    html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
  }, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });  
};

module.exports = { sendConfirmationEmail };
