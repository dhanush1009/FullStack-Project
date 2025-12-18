// Test script for SOS functionality
// Run this with: node test-sos.js

const testEmergencyAlert = async () => {
  try {
    // Get backend URL from server config
    let backendUrl = 'http://localhost:5000';
    try {
      const fs = require('fs');
      const config = JSON.parse(fs.readFileSync('./backend/server-config.json', 'utf8'));
      backendUrl = config.url;
      console.log(`✅ Using backend URL from config: ${backendUrl}`);
    } catch (error) {
      console.log(`⚠️ Using default backend URL: ${backendUrl}`);
    }

    // Test data for simple SOS alert
    const testData = {
      userLocation: "Emergency Location: Lat 12.9716, Lng 77.5946",
      lat: 12.9716,
      lng: 77.5946,
      userName: "SOS User",
      timestamp: new Date().toISOString()
    };

    console.log('🚨 Testing Simple SOS Alert System...');
    console.log('📍 Test Data:', JSON.stringify(testData, null, 2));

    // Send SOS alert
    const response = await fetch(`${backendUrl}/api/sos-alert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ SOS Alert Test PASSED!');
      console.log('📋 Response:', JSON.stringify(result, null, 2));
      console.log(`📋 Alert ID: ${result.alertId}`);
      console.log(`📊 Status: ${result.status} (awaiting manual assignment)`);
      console.log('🎯 Alert should now appear on admin dashboard for manual volunteer assignment');
    } else {
      console.log('❌ SOS Alert Test FAILED!');
      console.log('📋 Error Response:', JSON.stringify(result, null, 2));
    }

  } catch (error) {
    console.error('❌ Test Error:', error.message);
    console.log('💡 Make sure the backend server is running!');
  }
};

// Test SMS functionality
const testSMS = async () => {
  try {
    let backendUrl = 'http://localhost:5000';
    try {
      const fs = require('fs');
      const config = JSON.parse(fs.readFileSync('./backend/server-config.json', 'utf8'));
      backendUrl = config.url;
    } catch (error) {
      // Use default
    }

    console.log('\n📱 Testing SMS functionality...');
    
    const smsData = {
      to: "+917339486437",
      userName: "SOS User",
      userLocation: "Emergency Location: Lat 12.9716, Lng 77.5946",
      lat: 12.9716,
      lng: 77.5946
    };

    const response = await fetch(`${backendUrl}/send-sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(smsData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ SMS Test PASSED!');
      console.log(`📱 SMS SID: ${result.sid}`);
    } else {
      console.log('⚠️ SMS Test Failed (this is expected if Twilio is not configured)');
      console.log(`📋 Error: ${result.error}`);
    }

  } catch (error) {
    console.error('❌ SMS Test Error:', error.message);
  }
};

// Run tests
const runTests = async () => {
  console.log('🧪 Starting SOS System Tests...\n');
  
  await testEmergencyAlert();
  await testSMS();
  
  console.log('\n✅ Tests completed!');
  console.log('\n💡 Next steps:');
  console.log('1. Start the backend server: cd backend && npm start');
  console.log('2. Start the frontend: npm run dev');
  console.log('3. Navigate to the SOS page and test with real user input');
  console.log('4. Check the admin dashboard to see if alerts appear');
};

runTests();
