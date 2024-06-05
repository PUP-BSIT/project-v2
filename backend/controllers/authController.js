const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const connection = require('../config/database');
const { sendConfirmationEmail } = require('../config/mailer');

const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
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

      res.status(200).json({ message: 'Email confirmed successfully. You can now log in.' });
    });
  });
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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  });
};

module.exports = {
  signup,
  confirmEmail,
  login,
};
