const mongoose = require('mongoose');
require('dotenv').config();

const testDatabase = async () => {
  console.log('🗄️ Testing DevConnect Database Connection...\n');

  try {
    // Test database connection
    console.log('1. Testing MongoDB Connection...');
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/devconnect';
    console.log('Connecting to:', mongoUri);
    
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
    
    // Test basic operations
    console.log('\n2. Testing Basic Database Operations...');
    
    // Check if collections exist
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Available collections:', collections.map(c => c.name));
    
    // Test User model
    const User = require('./src/models/user');
    const userCount = await User.countDocuments();
    console.log('👥 Total users in database:', userCount);
    
    // Test ConnectionRequest model
    const ConnectionRequest = require('./src/models/connectionRequest');
    const requestCount = await ConnectionRequest.countDocuments();
    console.log('🔗 Total connection requests in database:', requestCount);
    
    // Show sample data if available
    if (userCount > 0) {
      const sampleUser = await User.findOne().select('firstName lastName emailId');
      console.log('👤 Sample user:', sampleUser);
    }
    
    if (requestCount > 0) {
      const sampleRequest = await ConnectionRequest.findOne().populate('fromUserId toUserId', 'firstName lastName');
      console.log('📨 Sample connection request:', {
        id: sampleRequest._id,
        from: sampleRequest.fromUserId ? `${sampleRequest.fromUserId.firstName} ${sampleRequest.fromUserId.lastName}` : 'Unknown',
        to: sampleRequest.toUserId ? `${sampleRequest.toUserId.firstName} ${sampleRequest.toUserId.lastName}` : 'Unknown',
        status: sampleRequest.status,
        createdAt: sampleRequest.createdAt
      });
    }
    
    console.log('\n✅ Database test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    // Close connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('🔌 Database connection closed');
    }
    process.exit(0);
  }
};

// Run the test
testDatabase();
