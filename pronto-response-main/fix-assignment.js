// Quick fix and test for assignment issue
// Run with: node fix-assignment.js

const fixAssignment = async () => {
  console.log('🔧 Fixing Assignment Issue...\n');

  // Find backend URL
  let backendUrl = 'http://localhost:5000';
  const ports = [5000, 5001, 3000, 8000];
  
  for (const port of ports) {
    try {
      const testUrl = `http://localhost:${port}`;
      const response = await fetch(`${testUrl}/api/health`);
      if (response.ok) {
        backendUrl = testUrl;
        console.log(`✅ Found backend at: ${backendUrl}`);
        break;
      }
    } catch (e) {
      // Continue
    }
  }

  // Step 1: Create test volunteer with proper coordinates
  console.log('\n👤 Creating test volunteer...');
  try {
    const createResponse = await fetch(`${backendUrl}/api/create-test-volunteer`, {
      method: 'POST'
    });
    
    if (createResponse.ok) {
      const result = await createResponse.json();
      console.log(`✅ ${result.message}: ${result.volunteer.name}`);
      console.log(`📍 Coordinates: lat=${result.volunteer.coordinates?.lat}, lng=${result.volunteer.coordinates?.lng}`);
    }
  } catch (error) {
    console.error('❌ Error creating volunteer:', error.message);
  }

  // Step 2: Create test SOS alert
  console.log('\n🚨 Creating test SOS alert...');
  try {
    const sosData = {
      userLocation: "Test Location: Lat 13.0635, Lng 80.2297",
      lat: 13.0635,
      lng: 80.2297,
      userName: "Test User",
      timestamp: new Date().toISOString()
    };

    const sosResponse = await fetch(`${backendUrl}/api/sos-alert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sosData)
    });

    if (sosResponse.ok) {
      const sosResult = await sosResponse.json();
      console.log(`✅ SOS alert created: ${sosResult.alertId}`);
      
      // Step 3: Get volunteers and test assignment
      console.log('\n🎯 Testing assignment...');
      
      const volunteersResponse = await fetch(`${backendUrl}/api/volunteers`);
      const volunteers = await volunteersResponse.json();
      const testVolunteer = volunteers.find(v => v.email === "test.volunteer@example.com");
      
      if (testVolunteer) {
        console.log(`👤 Using volunteer: ${testVolunteer.name} (${testVolunteer._id})`);
        console.log(`📍 Volunteer coordinates:`, testVolunteer.coordinates);
        
        const assignResponse = await fetch(`${backendUrl}/api/emergency-alerts/${sosResult.alertId}/assign-volunteer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ volunteerId: testVolunteer._id })
        });
        
        console.log(`📡 Assignment response status: ${assignResponse.status}`);
        
        if (assignResponse.ok) {
          const assignResult = await assignResponse.json();
          console.log('✅ Assignment successful!');
          console.log(`📊 Result:`, JSON.stringify(assignResult, null, 2));
        } else {
          const errorText = await assignResponse.text();
          console.log('❌ Assignment failed:', errorText);
          
          // Try to parse error
          try {
            const error = JSON.parse(errorText);
            console.log('📋 Error details:', error);
          } catch (e) {
            console.log('📋 Raw error:', errorText);
          }
        }
      } else {
        console.log('❌ Test volunteer not found');
      }
    } else {
      const sosError = await sosResponse.text();
      console.log('❌ SOS creation failed:', sosError);
    }
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }

  console.log('\n💡 If assignment still fails:');
  console.log('1. Check backend console for detailed logs');
  console.log('2. Verify volunteer has coordinates');
  console.log('3. Verify alert has location data');
  console.log('4. Check that estimatedResponseTime is not NaN');
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

fixAssignment().catch(console.error);
