const express = require('express');
const cors = require('cors');
const path = require('path');
const timeout = require('connect-timeout');
require('dotenv').config();

const { sequelize } = require('./models');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Timeout middleware - 5 minutes for bulk operations
app.use(timeout('300s'));

// Timeout handler middleware
app.use((req, res, next) => {
  if (!req.timedout) {
    next();
  }
});

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler with timeout support
app.use((err, req, res, next) => {
  // Handle timeout errors
  if (req.timedout) {
    return res.status(504).json({
      success: false,
      message: 'Request timeout - The operation took too long to complete',
      error: 'TIMEOUT'
    });
  }

  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    const server = app.listen(PORT, () => {
      console.log(`\n🚀 Server is running on port ${PORT}`);
    });

    // Set server timeout to 5 minutes (300 seconds)
    server.timeout = 300000;
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
