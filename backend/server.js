require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

app.post('/api/signup', async (req, res) => {
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
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  