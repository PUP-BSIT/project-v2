const express = require('express');
const router = express.Router();
const connection = require('../config/database');

const getQuestionsWithOptions = (req, res) => {
    const sql = `
        SELECT 
            q.question_id, 
            q.question_text, 
            o.option_id, 
            o.option_text, 
            o.season_id 
        FROM questions q
        JOIN options o ON q.question_id = o.question_id
    `;
    
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching questions and options: ' + err.stack);
            return res.status(500).json({ error: 'Database error', details: err });
        }

        const questions = {};
        results.forEach(row => {
            if (!questions[row.question_id]) {
                questions[row.question_id] = {
                    question_id: row.question_id,
                    question_text: row.question_text,
                    options: []
                };
            }
            questions[row.question_id].options.push({
                option_id: row.option_id,
                option_text: row.option_text,
                season_id: row.season_id
            });
        });

        res.status(200).json(Object.values(questions));
    });
};

module.exports = {
    getQuestionsWithOptions,
};