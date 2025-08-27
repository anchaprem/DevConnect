require('dotenv').config();

const config = {
  // Server Configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/devconnect',
  
  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET || 'DEVconnect@999',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  
  // CORS Configuration - Dynamic based on environment
  corsOrigin: process.env.NODE_ENV === 'production' 
    ? process.env.CORS_ORIGIN?.split(',') || ['https://yourdomain.com']
    : ['http://localhost:5173', 'http://localhost:5174'],
  
  // Security Configuration
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 10,
  
  // Rate Limiting
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15 minutes
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX) || 100, // requests per window
  
  // File Upload
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
  
  // Pagination
  defaultPageSize: parseInt(process.env.DEFAULT_PAGE_SIZE) || 10,
  maxPageSize: parseInt(process.env.MAX_PAGE_SIZE) || 50
};

module.exports = config;
