const pool = require('../config/database');
const fs = require('fs');
const path = require('path');

async function initDatabase() {
  try {
    // Read schema file
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    
    // Execute schema
    await pool.query(schemaSQL);
    console.log('✅ Database schema created successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Schema creation failed:', error);
    process.exit(1);
  }
}

initDatabase();
