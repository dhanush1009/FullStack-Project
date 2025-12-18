// Test admin dashboard connection to backend
// Run with: node test-admin-connection.js

const testAdminConnection = async () => {
  console.log('🔍 Testing Admin Dashboard Connection...\n');

  // Try different common ports
  const ports = [5000, 5001, 3000, 8000];
  let workingUrl = null;

  for (const port of ports) {
    const url = `http://localhost:${port}`;
    try {
      console.log(`Checking ${url}...`);
      
      // Test health endpoint
      const healthResponse = await fetch(`${url}/api/health`);
      if (healthResponse.ok) {
        const healthData = await healthResponse.json();
        console.log(`✅ Health check passed: ${healthData.status}`);
        workingUrl = url;
        break;
      }
    } catch (error) {
      console.log(`❌ No server at ${url}`);
    }
  }

  if (!workingUrl) {
    console.log('\n❌ Backend server not found!');
    console.log('💡 Please start the backend server first:');
    console.log('   cd backend && npm start');
    return;
  }

  console.log(`\n✅ Backend server found at: ${workingUrl}`);

  // Test emergency alerts endpoint
  console.log('\n🚨 Testing emergency alerts endpoint...');
  try {
    const alertsResponse = await fetch(`${workingUrl}/api/emergency-alerts`);
    if (alertsResponse.ok) {
      const alertsData = await alertsResponse.json();
      console.log(`✅ Emergency alerts endpoint working`);
      console.log(`📊 Found ${alertsData.data?.length || 0} alerts`);
      
      if (alertsData.data?.length > 0) {
        console.log('\n📋 Sample alert:');
        const sample = alertsData.data[0];
        console.log(`   ID: ${sample._id}`);
        console.log(`   Type: ${sample.emergencyType}`);
        console.log(`   Status: ${sample.status}`);
        console.log(`   Location: ${sample.location?.address}`);
      }
    } else {
      console.log('⚠️ Emergency alerts endpoint returned error:', alertsResponse.status);
    }
  } catch (error) {
    console.log('❌ Emergency alerts endpoint failed:', error.message);
  }

  // Test volunteers endpoint
  console.log('\n👥 Testing volunteers endpoint...');
  try {
    const volunteersResponse = await fetch(`${workingUrl}/api/volunteers`);
    if (volunteersResponse.ok) {
      const volunteersData = await volunteersResponse.json();
      console.log(`✅ Volunteers endpoint working`);
      console.log(`📊 Found ${volunteersData.length || 0} volunteers`);
    } else {
      console.log('⚠️ Volunteers endpoint returned error:', volunteersResponse.status);
    }
  } catch (error) {
    console.log('❌ Volunteers endpoint failed:', error.message);
  }

  // Test manual assignment endpoint
  console.log('\n🎯 Testing manual assignment capability...');
  console.log('ℹ️  Manual assignment will be available when you have both alerts and volunteers');

  console.log('\n✅ Admin dashboard connection test completed!');
  console.log('\n🎯 Next steps:');
  console.log('1. Start the frontend: npm run dev');
  console.log('2. Navigate to the admin dashboard');
  console.log('3. Send a test SOS alert');
  console.log('4. Verify the alert appears on the dashboard');
  console.log('5. Register volunteers if needed');
  console.log('6. Test manual volunteer assignment');
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

testAdminConnection().catch(console.error);
