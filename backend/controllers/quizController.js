const express = require('express');
const router = express.Router();
const connection = require('../config/database');

const getQuestions = (req, res) => {
    const sql = 'SELECT * FROM questions';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching questions: ' + err.stack);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.status(200).json(results);
    });
};

module.exports = {
    getQuestions,
};
