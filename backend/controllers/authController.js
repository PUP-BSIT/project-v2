const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const connection = require('../config/database');
const { sendConfirmationEmail, sendResetPasswordEmail } = require('../config/mailer');

const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const emailCheckSql = 'SELECT * FROM user WHERE email = ?';
    connection.query(emailCheckSql, [email], async (err, results) => {
      if (err) {
        console.error('Error checking email: ' + err.stack);
        return res.status(500).json({ error: 'Database error', details: err });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const token = uuidv4();
      const sql = 'INSERT INTO user (username, email, password, token, confirmed) VALUES (?, ?, ?, ?, ?)';
      connection.query(sql, [username, email, hashedPassword, token, false], (err, result) => {
        if (err) {
          console.error('Error inserting user: ' + err.stack);
          return res.status(500).json({ error: 'Failed to create user', details: err });
        }

        sendConfirmationEmail(email, token);
        res.status(201).json({ message: 'User created successfully. Please check your email to confirm your account.' });
      });
    });
  } catch (err) {
    console.error('Error hashing password: ' + err.stack);
    res.status(500).json({ error: 'Failed to hash password' });
  }
};

const confirmEmail = (req, res) => {
  const { token } = req.params;

  const sql = 'SELECT * FROM user WHERE token = ?';
  connection.query(sql, [token], (err, results) => {
    if (err) {
      console.error('Error fetching user: ' + err.stack);
      return res.status(500).json({ error: 'Database error', details: err });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    const user = results[0];
    const updateSql = 'UPDATE user SET confirmed = ? WHERE user_id = ?';
    connection.query(updateSql, [true, user.user_id], (updateErr) => {
      if (updateErr) {
        console.error('Error confirming user: ' + updateErr.stack);
        return res.status(500).json({ error: 'Failed to confirm user', details: updateErr });
      }

      res.redirect('https://huenique.online/confirm-email'); 
    });
  });
};

const forgotPassword = (req, res) => {
  const { email } = req.body;

  console.log('Received email:', email);

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const token = uuidv4();
  const sql = 'UPDATE user SET reset_token = ? WHERE email = ?';
  
  console.log(`Updating reset token for email: ${email}`);
  
  connection.query(sql, [token, email], (err, result) => {
    if (err) {
      console.error('Error updating user: ' + err.stack);
      return res.status(500).json({ error: 'Failed to update user', details: err });
    }

    if (result.affectedRows === 0) {
      console.error('No user found with this email');
      return res.status(400).json({ error: 'No user found with this email' });
    }

    console.log('Reset token updated, sending email');
    sendResetPasswordEmail(email, token);
    res.status(200).json({ message: 'Password reset email sent successfully' });
  });
};

const resetPassword = async (req, res) => {
  const { token, newPassword, confirmNewPassword } = req.body;

  if (!token || !newPassword || !confirmNewPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const sql = 'UPDATE user SET password = ?, reset_token = NULL WHERE reset_token = ?';
    connection.query(sql, [hashedPassword, token], (err, result) => {
      if (err) {
        console.error('Error updating password: ' + err.stack);
        return res.status(500).json({ error: 'Failed to update password', details: err });
      }

      if (result.affectedRows === 0) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }

      res.status(200).json({ message: 'Password reset successfully' });
    });
  } catch (err) {
    console.error('Error hashing password: ' + err.stack);
    res.status(500).json({ error: 'Failed to hash password' });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM user WHERE email = ?';
  connection.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Error fetching user: ' + err.stack);
      return res.status(500).json({ error: 'Database error', details: err });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    if (!user.confirmed) {
      return res.status(400).json({ error: 'Please confirm your email before logging in.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET);
    res.status(200).json({ message: 'Login successful', token });
  });
};

const getUserProfile = (req, res) => {
  const userId = req.userId;

  const sql = 'SELECT username, email FROM user WHERE user_id = ?';
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user profile: ' + err.stack);
      return res.status(500).json({ error: 'Database error', details: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(results[0]);
  });
};

module.exports = {
  signup,
  confirmEmail,
  forgotPassword,
  resetPassword,
  login,
  getUserProfile
};