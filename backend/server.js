require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const authRoutes = require('./routes/authRoutes');
const profRoutes = require('./routes/profRoutes');
const quizRoutes = require('./routes/quizRoutes');
const emailRoutes = require('./routes/emailRoutes');

app.use('/api/auth', authRoutes);
app.use('/api', profRoutes);
app.use('/api', quizRoutes);
app.use('/api', emailRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
