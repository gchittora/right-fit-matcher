const pool = require('../config/database');

// GET /api/universities - Get all universities
const getAllUniversities = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM universities ORDER BY ranking ASC'
    );
    
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching universities:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch universities',
      error: error.message
    });
  }
};

// GET /api/universities/:id - Get single university
const getUniversityById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM universities WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'University not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching university:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch university',
      error: error.message
    });
  }
};

module.exports = {
  getAllUniversities,
  getUniversityById
};
