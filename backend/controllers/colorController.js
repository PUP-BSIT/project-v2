const connection = require('../config/database');

const getDataWithSubcategory = (req, res) => {
    const { subcategory_id } = req.params;

    const query = `
      SELECT 
        'accessories' AS category, color_name, accessories_details AS details, hex_code 
      FROM accessories 
      WHERE subcategory_id = ?
      UNION ALL
      SELECT 
        'avoid' AS category, color_name, avoid_details AS details, hex_code 
      FROM avoid_color 
      WHERE subcategory_id = ?
      UNION ALL
      SELECT 
        'lens' AS category, color_name, lens_details AS details, hex_code 
      FROM contact_lens 
      WHERE subcategory_id = ?
      UNION ALL
      SELECT 
        'hair' AS category, color_name, hair_details AS details, hex_code 
      FROM hair_color 
      WHERE subcategory_id = ?
      UNION ALL
      SELECT 
        'makeup' AS category, color_name, shade_details AS details, hex_code 
      FROM makeup_shade 
      WHERE subcategory_id = ?
      UNION ALL
      SELECT 
        'clothing' AS category, color_name, cloth_details AS details, hex_code 
      FROM cloth 
      WHERE subcategory_id = ?
    `;

    connection.query(query, [subcategory_id, subcategory_id, subcategory_id, subcategory_id, subcategory_id, subcategory_id], (error, results) => {
        if (error) {
            return res.status(500).json({ status: 'error', message: error.message });
        }
        res.status(200).json({ status: 'success', data: results });
    });
};

module.exports = {
  getDataWithSubcategory,
};
