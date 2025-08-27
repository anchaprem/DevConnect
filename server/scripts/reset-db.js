const mongoose = require('mongoose');
const User = require('../src/models/user');
const ConnectionRequest = require('../src/models/connectionRequest');
require('dotenv').config();

const resetDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/devconnect');
    console.log('✅ Connected to MongoDB');

    // Clear all data
    await User.deleteMany({});
    await ConnectionRequest.deleteMany({});
    
    console.log('🧹 Database reset completed');
    console.log('📊 All users and connection requests have been removed');
    console.log('💡 Run "npm run db:seed" to populate with sample data');

  } catch (error) {
    console.error('❌ Error resetting database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the reset function
resetDatabase();
