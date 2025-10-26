const pool = require('../config/database');

// POST /api/match - Match universities based on user profile
const matchUniversities = async (req, res) => {
  try {
    const { gmat_score, gpa, work_experience = 0 } = req.body;
    
    // Validation
    if (!gmat_score || !gpa) {
      return res.status(400).json({
        success: false,
        message: 'GMAT score and GPA are required'
      });
    }
    
    if (gmat_score < 0 || gmat_score > 800) {
      return res.status(400).json({
        success: false,
        message: 'GMAT score must be between 0 and 800'
      });
    }
    
    if (gpa < 0.0 || gpa > 4.0) {
      return res.status(400).json({
        success: false,
        message: 'GPA must be between 0.0 and 4.0'
      });
    }
    
    // Fetch all universities
    const result = await pool.query('SELECT * FROM universities');
    const universities = result.rows;
    
    // Calculate match score for each university
    const matches = universities.map(uni => {
      let score = 0;
      
      // GMAT scoring (40% weight)
      const gmatDiff = Math.abs(uni.avg_gmat - gmat_score);
      const gmatScore = Math.max(0, 100 - (gmatDiff / 800) * 100);
      score += gmatScore * 0.4;
      
      // GPA scoring (40% weight)
      const gpaDiff = Math.abs(uni.avg_gpa - gpa);
      const gpaScore = Math.max(0, 100 - (gpaDiff / 4.0) * 100);
      score += gpaScore * 0.4;
      
      // Work experience scoring (20% weight)
      const workExpDiff = Math.abs(uni.avg_work_exp - work_experience);
      const workExpScore = Math.max(0, 100 - (workExpDiff / 10) * 100);
      score += workExpScore * 0.2;
      
      // Admission probability (based on score and acceptance rate)
      const admissionProbability = Math.min(
        100,
        score * (uni.acceptance_rate / 100)
      );
      
      return {
        ...uni,
        match_score: Math.round(score),
        admission_probability: Math.round(admissionProbability)
      };
    });
    
    // Sort by admission probability (highest first)
    matches.sort((a, b) => b.admission_probability - a.admission_probability);
    
    res.status(200).json({
      success: true,
      count: matches.length,
      user_profile: { gmat_score, gpa, work_experience },
      matches
    });
    
  } catch (error) {
    console.error('Error matching universities:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to match universities',
      error: error.message
    });
  }
};

module.exports = {
  matchUniversities
};
