// Simple backend health check script
// Run with: node check-backend.js

const checkBackend = async () => {
  console.log('🔍 Checking Backend Server Status...\n');

  // Try different common ports
  const ports = [5000, 5001, 3000, 8000];
  let workingUrl = null;

  for (const port of ports) {
    const url = `http://localhost:${port}`;
    try {
      console.log(`Checking ${url}...`);
      const response = await fetch(`${url}/api/health`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Backend server found at ${url}`);
        console.log(`📊 Status: ${data.status}`);
        console.log(`🔌 Port: ${data.port}`);
        console.log(`⏰ Timestamp: ${data.timestamp}`);
        workingUrl = url;
        break;
      }
    } catch (error) {
      console.log(`❌ No server at ${url}`);
    }
  }

  if (!workingUrl) {
    console.log('\n❌ Backend server not found on common ports!');
    console.log('\n💡 To start the backend server:');
    console.log('1. Open terminal in the backend folder');
    console.log('2. Run: npm install');
    console.log('3. Run: npm start');
    console.log('4. Or use the start-servers.bat file');
    return;
  }

  // Test SOS endpoint
  console.log('\n🧪 Testing SOS endpoint...');
  try {
    const testData = {
      userLocation: "Test Location: Lat 12.9716, Lng 77.5946",
      lat: 12.9716,
      lng: 77.5946,
      userName: "Test User",
      timestamp: new Date().toISOString()
    };

    const response = await fetch(`${workingUrl}/api/sos-alert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ SOS endpoint working correctly!');
      console.log(`📋 Test Alert ID: ${result.alertId}`);
    } else {
      console.log('⚠️ SOS endpoint returned error:', response.status);
    }
  } catch (error) {
    console.log('❌ SOS endpoint test failed:', error.message);
  }

  console.log('\n✅ Backend health check completed!');
  console.log(`\n🌐 Your backend is running at: ${workingUrl}`);
  console.log('🎯 You can now use the SOS button in the frontend!');
};

// Add fetch polyfill for older Node versions
if (!global.fetch) {
  try {
    global.fetch = require('node-fetch');
  } catch (e) {
    console.log('❌ node-fetch not available. Please install it: npm install node-fetch');
    process.exit(1);
  }
}

checkBackend().catch(console.error);
