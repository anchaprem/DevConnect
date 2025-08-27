const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

const testEndpoints = async () => {
  console.log('🧪 Testing DevConnect Server Endpoints...\n');

  try {
    // Test health endpoint
    console.log('1. Testing Health Endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.status, healthResponse.data);
  } catch (error) {
    console.log('❌ Health Check Failed:', error.message);
  }

  try {
    // Test user endpoints (without auth)
    console.log('\n2. Testing User Endpoints (should fail without auth)...');
    const userResponse = await axios.get(`${BASE_URL}/user/connections`);
    console.log('❌ User endpoint should have failed:', userResponse.status);
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ User endpoint correctly requires authentication');
    } else {
      console.log('❌ Unexpected error:', error.message);
    }
  }

  try {
    // Test auth endpoint structure
    console.log('\n3. Testing Auth Endpoint Structure...');
    const authResponse = await axios.get(`${BASE_URL}/auth`);
    console.log('✅ Auth endpoint accessible:', authResponse.status);
  } catch (error) {
    if (error.response?.status === 404) {
      console.log('✅ Auth endpoint correctly returns 404 for GET (POST required)');
    } else {
      console.log('❌ Unexpected auth error:', error.message);
    }
  }

  console.log('\n🎯 Server connection test completed!');
  console.log('📝 Check the console for detailed results.');
};

// Run the test
testEndpoints().catch(console.error);
