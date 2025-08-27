const express = require("express");
const connectDb = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config/config");

// Import routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");
const userRouter = require("./routes/user");

// Import middleware
const errorHandler = require("./middlewares/errorHandler");
const rateLimiter = require("./middlewares/rateLimiter");

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));
app.use(express.json({ limit: config.maxFileSize }));
app.use(express.urlencoded({ extended: true, limit: config.maxFileSize }));

// Rate limiting
app.use(rateLimiter);

// Request logging in development
if (config.nodeEnv === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv
  });
});

// API Routes
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/requests", requestsRouter);
app.use("/user", userRouter);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server after database connection
const startServer = async () => {
  try {
    await connectDb();
    app.listen(config.port, () => {
      console.log(`🚀 DevConnect Server running on port ${config.port}`);
      console.log(`🌍 Environment: ${config.nodeEnv}`);
      console.log(`🔗 CORS Origin: ${config.corsOrigin}`);
      console.log(`📊 Database: Connected to MongoDB`);
      console.log(`⏰ Started at: ${new Date().toISOString()}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;


