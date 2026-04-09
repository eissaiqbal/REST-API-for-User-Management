const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();

// CORS Configuration - Fixed for local development
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5000',
      'http://localhost:3000',
      'http://127.0.0.1:5000',
      'http://127.0.0.1:3000',
      'http://localhost:5001',
      'http://localhost:8000',
      'http://localhost:8080',
      'http://0.0.0.0:5000'
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Still allow it for development
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/users', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API Documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    message: 'User Management REST API',
    version: '1.0.0',
    endpoints: {
      'GET /api/users': 'Get all users',
      'GET /api/users/:id': 'Get a specific user',
      'POST /api/users': 'Create a new user',
      'PUT /api/users/:id': 'Update a user',
      'DELETE /api/users/:id': 'Delete a user',
      'GET /api/users/search?q=query': 'Search users'
    },
    baseURL: 'http://localhost:5000',
    examples: {
      getAllUsers: 'curl http://localhost:5000/api/users',
      createUser: 'curl -X POST http://localhost:5000/api/users -H "Content-Type: application/json" -d \'{"name":"John","email":"john@test.com","phone":"+1-555-0100"}\''
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `${req.method} ${req.path} does not exist`,
    suggestion: 'Check the API documentation at /api/docs'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong',
    status: err.status || 500
  });
});

module.exports = app;