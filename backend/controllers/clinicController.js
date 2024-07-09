const connection = require('../config/database');

const getAllClinics = (req, res) => {
  const sql = 'SELECT * FROM clinic';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching clinic data:', err);
      return res.status(500).json({ error: 'Failed to fetch clinic data.' });
    }
    res.status(200).json(results);
  });
};

module.exports = { getAllClinics };
