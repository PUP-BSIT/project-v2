const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const connection = require('../config/database');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (email, subject, templateType, replacements) => {
  let templatePath;

  switch (templateType) {
    case 'confirmEmail':
      templatePath = path.join(__dirname, '../emails/templates/confirmEmail.html');
      break;
    case 'resetPassword':
      templatePath = path.join(__dirname, '../emails/templates/resetPassEmail.html');
      break;
    case 'resultEmail':
      templatePath = path.join(__dirname, '../emails/templates/emailTemplate.html');
      break;
    default:
      throw new Error('Invalid email template type');
  }

  const template = fs.readFileSync(templatePath, { encoding: 'utf-8' });
  let htmlContent = template;

  for (const key in replacements) {
    htmlContent = htmlContent.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
  }

  const attachments = [
    {
      filename: 'logo.png',
      path: path.join(__dirname, '../emails/assets/logo.png'),
      cid: 'logo@huenique'
    }
  ];

  if (replacements.seasonImage) {
    attachments.push({
      filename: replacements.seasonImage,
      path: path.join(__dirname, `../emails/assets/${replacements.seasonImage}`),
      cid: 'seasonImage@huenique'
    });
  }

  transporter.sendMail({
    to: email,
    subject: subject,
    html: htmlContent,
    attachments: attachments
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
  sendEmail(email, 'Confirm your Email', 'confirmEmail', { url });
};

const sendResetPasswordEmail = (email, token) => {
  const url = `http://localhost:4200/reset-password/${token}`;
  sendEmail(email, 'Reset Password', 'resetPassword', { url });
};

const fetchRecommendations = (seasonId, subcategoryId, callback) => {
  const sql = `
    SELECT 
      'accessories' AS category, color_name, hex_code 
    FROM accessories 
    WHERE season_id = ? AND (subcategory_id IS NULL OR subcategory_id = ?)
    UNION ALL
    SELECT 
      'avoid' AS category, color_name, hex_code 
    FROM avoid_color 
    WHERE season_id = ? AND (subcategory_id IS NULL OR subcategory_id = ?)
    UNION ALL
    SELECT 
      'lens' AS category, color_name, hex_code 
    FROM contact_lens 
    WHERE season_id = ? AND (subcategory_id IS NULL OR subcategory_id = ?)
    UNION ALL
    SELECT 
      'hair' AS category, color_name, hex_code 
    FROM hair_color 
    WHERE season_id = ? AND (subcategory_id IS NULL OR subcategory_id = ?)
    UNION ALL
    SELECT 
      'makeup' AS category, color_name, hex_code 
    FROM makeup_shade 
    WHERE season_id = ? AND (subcategory_id IS NULL OR subcategory_id = ?)
    UNION ALL
    SELECT 
      'clothing' AS category, color_name, hex_code 
    FROM cloth 
    WHERE season_id = ? AND (subcategory_id IS NULL OR subcategory_id = ?)
  `;

  connection.query(sql, [seasonId, subcategoryId, seasonId, subcategoryId, seasonId, subcategoryId, seasonId, subcategoryId, seasonId, subcategoryId, seasonId, subcategoryId], (err, results) => {
    if (err) {
      console.error('Error fetching recommendations:', err.stack);
      callback(err, null);
    } else {
      const recommendations = results.reduce((acc, row) => {
        if (!acc[row.category]) {
          acc[row.category] = [];
        }
        acc[row.category].push({
          color_name: row.color_name,
          hex_code: row.hex_code
        });
        return acc;
      }, {});

      callback(null, recommendations);
    }
  });
};

const formatRecommendations = (recommendations) => {
  let formatted = '';

  for (const category in recommendations) {
    formatted += `<h3 style="color: #333;">${category.charAt(0).toUpperCase() + category.slice(1)}</h3>`;
    formatted += '<div style="display: flex; flex-wrap: wrap;">';
    recommendations[category].forEach(item => {
      formatted += `
        <div style="width: 100px; margin: 5px; text-align: center;">
          <div style="width: 40px; height: 40px; background-color: ${item.hex_code}; margin: 0 auto;"></div>
          <p style="margin: 5px 0;">${item.color_name}</p>
        </div>
      `;
    });
    formatted += '</div>';
  }

  return formatted;
};

const sendEmailResult = (req, res) => {
  const { email, userId } = req.body;

  const sql = `
    SELECT tr.result_id, tr.*, s.season_name, tr.subcategory_id, (SELECT season_name FROM season WHERE season_id = tr.subcategory_id) AS subcategory_name 
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

    fetchRecommendations(result.season_id, result.subcategory_id, (err, recommendations) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch recommendations.' });
      }

      try {
        const formattedRecommendations = formatRecommendations(recommendations);
        
        const seasonImages = {
          'Clear Spring': 'clearSpring.png',
          'Warm Spring': 'warmSpring.png',
          'Light Spring': 'lightSpring.png',
          'Soft Summer': 'softSummer.png',
          'Cool Summer': 'coolSummer.png',
          'Light Summer': 'lightSummer.png',
          'Soft Autumn': 'softAutumn.png',
          'Warm Autumn': 'warmAutumn.png',
          'Deep Autumn': 'deepAutumn.png',
          'Clear Winter': 'clearWinter.png',
          'Cool Winter': 'coolWinter.png',
          'Deep Winter': 'deepWinter.png'
        };

        const seasonDescriptions = {
          'Clear Spring': 'Bright and warm, Clear Spring shines with vivid and clear colors.',
          'Warm Spring': 'Warm Spring exudes a golden glow with sunny and warm shades.',
          'Light Spring': 'Light Spring sparkles with delicate, pastel, and fresh colors.',
          'Soft Summer': 'Soft Summer is cool and muted with gentle and subtle shades.',
          'Cool Summer': 'Cool Summer is calm and collected with icy and serene colors.',
          'Light Summer': 'Light Summer glows with airy, light, and cool tones.',
          'Soft Autumn': 'Soft Autumn features muted and earthy colors that are gentle and warm.',
          'Warm Autumn': 'Warm Autumn boasts rich, warm, and golden hues.',
          'Deep Autumn': 'Deep Autumn is characterized by dark, warm, and intense colors.',
          'Clear Winter': 'Clear Winter is bold and bright with high-contrast and clear shades.',
          'Cool Winter': 'Cool Winter is sharp and frosty with cool and dark colors.',
          'Deep Winter': 'Deep Winter features deep, dramatic, and rich tones.'
        };
        
        const replacements = { 
          season: result.season_name, 
          subcategory: result.subcategory_name,
          seasonImage: seasonImages[result.subcategory_name],
          seasonDescription: seasonDescriptions[result.subcategory_name],
          recommendations: formattedRecommendations 
        };

        sendEmail(email, 'Your Color Analysis Results', 'resultEmail', replacements);

        // Insert the email log into the database
        const insertSql = `
          INSERT INTO email_log (result_id, user_id) 
          VALUES (?, ?)`;

        connection.query(insertSql, [result.result_id, userId], (err, insertResult) => {
          if (err) {
            console.error('Error saving email log:', err);
            return res.status(500).json({ error: 'Failed to save email log.' });
          }

          res.status(200).json({ message: 'Email sent and log saved successfully!' });
        });
      } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
      }
    });
  });
};

module.exports = { sendConfirmationEmail, sendResetPasswordEmail, sendEmailResult };