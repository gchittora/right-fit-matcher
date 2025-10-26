const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration - Allow your frontend domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://right-fit-matcher-u7g2.vercel.app',
  'https://right-fit-matcher-wado.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS not allowed'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Import routes
const universityRoutes = require('./routes/universityRoutes');
const matchRoutes = require('./routes/matchRoutes');

// Use routes
app.use('/api/universities', universityRoutes);
app.use('/api/match', matchRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Root endpoint
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

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
