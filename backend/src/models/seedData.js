const pool = require('../config/database');

// Real MBA program data from top universities
const universities = [
  // Top Tier (GMAT 730+)
  { name: 'Stanford Graduate School of Business', country: 'USA', avg_gmat: 738, avg_gpa: 3.80, avg_work_exp: 4, acceptance_rate: 8.4, ranking: 1, program_type: 'Full-Time MBA' },
  { name: 'MIT Sloan School of Management', country: 'USA', avg_gmat: 740, avg_gpa: 3.75, avg_work_exp: 5, acceptance_rate: 17.8, ranking: 3, program_type: 'Full-Time MBA' },
  { name: 'University of Pennsylvania - Wharton', country: 'USA', avg_gmat: 732, avg_gpa: 3.70, avg_work_exp: 5, acceptance_rate: 23.0, ranking: 2, program_type: 'Full-Time MBA' },
  { name: 'Harvard Business School', country: 'USA', avg_gmat: 730, avg_gpa: 3.71, avg_work_exp: 5, acceptance_rate: 13.2, ranking: 4, program_type: 'Full-Time MBA' },
  { name: 'Northwestern - Kellogg', country: 'USA', avg_gmat: 730, avg_gpa: 3.60, avg_work_exp: 5, acceptance_rate: 33.3, ranking: 11, program_type: 'Full-Time MBA' },
  
  // Mid-Upper Tier (GMAT 720-729)
  { name: 'Columbia Business School', country: 'USA', avg_gmat: 727, avg_gpa: 3.65, avg_work_exp: 5, acceptance_rate: 22.4, ranking: 8, program_type: 'Full-Time MBA' },
  { name: 'UC Berkeley - Haas', country: 'USA', avg_gmat: 727, avg_gpa: 3.68, avg_work_exp: 5, acceptance_rate: 23.0, ranking: 13, program_type: 'Full-Time MBA' },
  { name: 'University of Chicago - Booth', country: 'USA', avg_gmat: 728, avg_gpa: 3.67, avg_work_exp: 5, acceptance_rate: 32.6, ranking: 7, program_type: 'Full-Time MBA' },
  
  // Mid Tier (GMAT 700-719)
  { name: 'UCLA Anderson', country: 'USA', avg_gmat: 715, avg_gpa: 3.59, avg_work_exp: 5, acceptance_rate: 40.4, ranking: 14, program_type: 'Full-Time MBA' },
  { name: 'Yale School of Management', country: 'USA', avg_gmat: 730, avg_gpa: 3.70, avg_work_exp: 5, acceptance_rate: 32.9, ranking: 16, program_type: 'Full-Time MBA' },
  { name: 'University of Texas at Austin - McCombs', country: 'USA', avg_gmat: 708, avg_gpa: 3.53, avg_work_exp: 5, acceptance_rate: 40.0, ranking: 66, program_type: 'Full-Time MBA' },
  { name: 'Duke - Fuqua', country: 'USA', avg_gmat: 705, avg_gpa: 3.50, avg_work_exp: 5, acceptance_rate: 22.1, ranking: 10, program_type: 'Full-Time MBA' },
  { name: 'Dartmouth - Tuck', country: 'USA', avg_gmat: 720, avg_gpa: 3.56, avg_work_exp: 5, acceptance_rate: 40.1, ranking: 12, program_type: 'Full-Time MBA' },
  { name: 'Cornell - Johnson', country: 'USA', avg_gmat: 700, avg_gpa: 3.50, avg_work_exp: 5, acceptance_rate: 29.9, ranking: 15, program_type: 'Full-Time MBA' },
  
  // Accessible Tier (GMAT 650-699)
  { name: 'NYU Stern', country: 'USA', avg_gmat: 704, avg_gpa: 3.60, avg_work_exp: 5, acceptance_rate: 31.4, ranking: 9, program_type: 'Full-Time MBA' },
  { name: 'Michigan - Ross', country: 'USA', avg_gmat: 706, avg_gpa: 3.54, avg_work_exp: 5, acceptance_rate: 38.0, ranking: 6, program_type: 'Full-Time MBA' },
  { name: 'Virginia - Darden', country: 'USA', avg_gmat: 698, avg_gpa: 3.52, avg_work_exp: 5, acceptance_rate: 39.4, ranking: 14, program_type: 'Full-Time MBA' },
  { name: 'Georgetown - McDonough', country: 'USA', avg_gmat: 680, avg_gpa: 3.40, avg_work_exp: 5, acceptance_rate: 61.8, ranking: 24, program_type: 'Full-Time MBA' },
  { name: 'Vanderbilt - Owen', country: 'USA', avg_gmat: 665, avg_gpa: 3.45, avg_work_exp: 5, acceptance_rate: 40.1, ranking: 20, program_type: 'Full-Time MBA' },
  { name: 'USC Marshall', country: 'USA', avg_gmat: 690, avg_gpa: 3.49, avg_work_exp: 5, acceptance_rate: 35.0, ranking: 18, program_type: 'Full-Time MBA' },
  
  // International (Diverse Profiles)
  { name: 'London Business School', country: 'UK', avg_gmat: 710, avg_gpa: 3.55, avg_work_exp: 6, acceptance_rate: 25.0, ranking: 5, program_type: 'Full-Time MBA' },
  { name: 'INSEAD', country: 'France', avg_gmat: 709, avg_gpa: 3.50, avg_work_exp: 5, acceptance_rate: 27.0, ranking: 3, program_type: 'Full-Time MBA' },
  { name: 'University of Toronto - Rotman', country: 'Canada', avg_gmat: 665, avg_gpa: 3.40, avg_work_exp: 5, acceptance_rate: 45.0, ranking: 35, program_type: 'Full-Time MBA' },
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data (optional - remove if you want to keep data)
    await pool.query('DELETE FROM universities');
    console.log('✅ Cleared existing universities');
    
    // Insert all universities
    for (const uni of universities) {
      await pool.query(
        `INSERT INTO universities (name, country, avg_gmat, avg_gpa, avg_work_exp, acceptance_rate, ranking, program_type)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [uni.name, uni.country, uni.avg_gmat, uni.avg_gpa, uni.avg_work_exp, uni.acceptance_rate, uni.ranking, uni.program_type]
      );
    }
    
    console.log(`✅ Inserted ${universities.length} universities`);
    
    // Verify data
    const result = await pool.query('SELECT COUNT(*) FROM universities');
    console.log(`✅ Total universities in database: ${result.rows[0].count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
