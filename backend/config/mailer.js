const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const connection = require('../config/database');

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
      cid: 'logo@huenique'
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
  const templatePath = path.join(__dirname, '../emails/templates/resetPassEmail.html');

  sendEmail(email, 'Reset Password', templatePath, { url });
};

const getTemplatePath = (seasonId) => {
  const seasonTemplates = {
    1: 'winterEmail.html',
    2: 'summerEmail.html',
    3: 'autumnEmail.html',
    4: 'springEmail.html'
  };
  
  const template = seasonTemplates[seasonId];
  if (!template) {
    throw new Error(`Invalid season ID: ${seasonId}`);
  }
  
  return path.join(__dirname, '../emails/templates', template);
};

const sendEmailResult = (req, res) => {
  const { email, userId } = req.body;

  const sql = `
    SELECT tr.*, s.season_name 
    FROM test_result tr
    JOIN season s ON tr.season_id = s.season_id
    WHERE tr.user_id = ? 
    ORDER BY tr.result_date DESC, tr.result_id DESC 
    LIMIT 1`;

  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching results:', err);
      return res.status(500).json({ error: 'Failed to fetch results.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Results not found.' });
    }

    const result = results[0];
    console.log('Retrieved result:', result);

    try {
      const templatePath = getTemplatePath(result.season_id);
      const replacements = { season: result.season_name, recommendations: result.recommendations };

      sendEmail(email, 'Your Color Analysis Results', templatePath, replacements);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
};


module.exports = { sendConfirmationEmail, sendResetPasswordEmail, sendEmailResult };
