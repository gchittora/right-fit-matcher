const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const universityRoutes = require('./routes/universityRoutes');
const matchRoutes = require('./routes/matchRoutes');

app.use('/api/universities', universityRoutes);
app.use('/api/match', matchRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Right Fit Matcher API',
    endpoints: {
      health: '/health',
      universities: '/api/universities',
      match: '/api/match'
    }
  });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// Prevent timeout
server.keepAliveTimeout = 0;
server.headersTimeout = 0;

// Prevent exit on unhandled rejection
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});

// Keep alive
setInterval(() => {}, 1000);
