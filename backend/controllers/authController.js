const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/database');

exports.signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);
    const sql = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
    connection.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error inserting user: ' + err.stack);
        return res.status(500).json({ error: 'Failed to create user', details: err });
      }
      res.status(201).json({ message: 'User created successfully', id: result.insertId });
    });
  } catch (err) {
    console.error('Error hashing password: ' + err.stack);
    res.status(500).json({ error: 'Failed to hash password' });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'SELECT * FROM user WHERE email = ?';
  connection.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Error fetching user: ' + err.stack);
      return res.status(500).json({ error: 'Database error', details: err });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = results[0];
    console.log('Stored Hashed Password:', user.password);

    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Is Password Valid:', isPasswordValid);

      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } catch (bcryptErr) {
      console.error('Error comparing password: ' + bcryptErr.stack);
      return res.status(500).json({ error: 'Password comparison failed' });
    }
  });
};
