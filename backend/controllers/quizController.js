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

const saveResult = (req, res) => {
  const {
    season_id,
    result_date,
    hair_id,
    makeup_id,
    accessories_id,
    color_combination_id,
    contact_lens_id,
    avoid_color_id
  } = req.body;

  const user_id = req.userId;
  
  const sql = `
    INSERT INTO test_result (
      user_id, season_id, result_date, hair_id, makeup_id, accessories_id,
      color_combination_id, contact_lens_id, avoid_color_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [
      user_id, season_id, result_date, hair_id, makeup_id, accessories_id,
      color_combination_id, contact_lens_id, avoid_color_id
    ],
    (err, result) => {
      if (err) {
        console.error('Error saving result: ' + err.stack);
        return res.status(500).json({ error: 'Database error', details: err });
      }
      res.status(201).json({ message: 'Result saved successfully', resultId: result.insertId });
    }
  );
};

const getTestResult = (req, res) => {
  const user_id = req.userId;
  
  const sql = `
    SELECT 
      tr.season_id,
      s.season_name
    FROM 
      test_result tr
    JOIN
      season s ON tr.season_id = s.season_id
    WHERE 
      tr.user_id = ?
    ORDER BY 
      tr.result_date DESC
    LIMIT 1
  `;


  connection.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching test result: ' + err.stack);
      return res.status(500).json({ error: 'Database error', details: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No test result found' });
    }

    res.status(200).json(results[0]);
  });
};

const getRecommendations = (req, res) => {
  const { season_id } = req.params;

  const sql = `
    SELECT 
      CONCAT(
        'Accessories: ', (SELECT accessories_details FROM accessories WHERE season_id = ?), '\n',
        'Avoid: ', (SELECT avoid_details FROM avoid_color WHERE season_id = ?), '\n',
        'Combinations: ', (SELECT combination_details FROM color_combination WHERE season_id = ?), '\n',
        'Lens: ', (SELECT lens_details FROM contact_lens WHERE season_id = ?), '\n',
        'Hair: ', (SELECT hair_details FROM hair_color WHERE season_id = ?), '\n',
        'Makeup: ', (SELECT shade_details FROM makeup_shade WHERE season_id = ?)
      ) AS recommendations
  `;

  connection.query(sql, [season_id, season_id, season_id, season_id, season_id, season_id], (err, results) => {
    if (err) {
      console.error('Error fetching recommendations: ' + err.stack);
      return res.status(500).json({ error: 'Database error', details: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No recommendations found' });
    }

    res.status(200).json(results[0]);
  });
};

module.exports = {
  getQuestionsWithOptions,
  saveResult,
  getTestResult,
  getRecommendations
};
