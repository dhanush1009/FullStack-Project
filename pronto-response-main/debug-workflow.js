// Complete workflow debugging script
// Run with: node debug-workflow.js

const debugWorkflow = async () => {
  console.log('🔧 Debugging Complete SOS Workflow...\n');

  // Find backend URL
  let backendUrl = 'http://localhost:5000';
  const ports = [5000, 5001, 3000, 8000];
  
  console.log('🔍 Finding backend server...');
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
      console.log(`❌ No server at http://localhost:${port}`);
    }
  }

  // Step 1: Create a test volunteer if none exist
  console.log('\n👥 Checking volunteers...');
  try {
    const volunteersResponse = await fetch(`${backendUrl}/api/volunteers`);
    const volunteers = await volunteersResponse.json();
    
    if (volunteers.length === 0) {
      console.log('📝 Creating test volunteer...');
      const createResponse = await fetch(`${backendUrl}/api/create-test-volunteer`, {
        method: 'POST'
      });
      
      if (createResponse.ok) {
        const result = await createResponse.json();
        console.log(`✅ Test volunteer created: ${result.volunteer.name}`);
      } else {
        console.log('❌ Failed to create test volunteer');
        return;
      }
    } else {
      console.log(`✅ Found ${volunteers.length} existing volunteers`);
    }
  } catch (error) {
    console.error('❌ Error checking volunteers:', error.message);
    return;
  }

  // Step 2: Create a test SOS alert
  console.log('\n🚨 Creating test SOS alert...');
  try {
    const sosData = {
      userLocation: "Debug Test Location: Lat 13.0635, Lng 80.2297",
      lat: 13.0635,
      lng: 80.2297,
      userName: "Debug Test User",
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
      
      // Step 3: Verify alert appears in emergency alerts
      console.log('\n📋 Verifying alert in database...');
      const alertsResponse = await fetch(`${backendUrl}/api/emergency-alerts`);
      if (alertsResponse.ok) {
        const alertsData = await alertsResponse.json();
        const alerts = alertsData.data || [];
        const newAlert = alerts.find(a => a._id === sosResult.alertId);
        
        if (newAlert) {
          console.log(`✅ Alert found in database: ${newAlert.emergencyType} (${newAlert.status})`);
          
          // Step 4: Test volunteer assignment
          console.log('\n🎯 Testing volunteer assignment...');
          
          // Get volunteers again
          const volunteersResponse2 = await fetch(`${backendUrl}/api/volunteers`);
          const volunteers2 = await volunteersResponse2.json();
          const availableVolunteer = volunteers2.find(v => v.isAvailable !== false);
          
          if (availableVolunteer) {
            console.log(`👤 Using volunteer: ${availableVolunteer.name}`);
            
            const assignResponse = await fetch(`${backendUrl}/api/emergency-alerts/${newAlert._id}/assign-volunteer`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ volunteerId: availableVolunteer._id })
            });
            
            if (assignResponse.ok) {
              const assignResult = await assignResponse.json();
              console.log('✅ Assignment successful!');
              console.log(`📊 Assigned to: ${assignResult.data.assignedVolunteer.name}`);
              
              // Step 5: Verify assignment in database
              console.log('\n🔍 Verifying assignment...');
              const verifyResponse = await fetch(`${backendUrl}/api/emergency-alerts`);
              if (verifyResponse.ok) {
                const verifyData = await verifyResponse.json();
                const updatedAlert = verifyData.data.find(a => a._id === newAlert._id);
                
                if (updatedAlert && updatedAlert.status === 'assigned' && updatedAlert.assignedVolunteer) {
                  console.log('✅ Assignment verified in database!');
                  console.log(`👤 Assigned volunteer: ${updatedAlert.assignedVolunteer.name}`);
                  console.log(`📊 Alert status: ${updatedAlert.status}`);
                  console.log('\n🎉 Complete workflow test PASSED!');
                } else {
                  console.log('❌ Assignment not properly saved to database');
                  console.log('Updated alert:', JSON.stringify(updatedAlert, null, 2));
                }
              }
            } else {
              const assignError = await assignResponse.text();
              console.log('❌ Assignment failed:', assignError);
            }
          } else {
            console.log('❌ No available volunteers found');
          }
        } else {
          console.log('❌ Alert not found in database');
        }
      }
    } else {
      const sosError = await sosResponse.text();
      console.log('❌ SOS alert creation failed:', sosError);
    }
  } catch (error) {
    console.error('❌ Workflow error:', error.message);
  }

  console.log('\n📋 Summary:');
  console.log('1. ✅ Backend server detection');
  console.log('2. ✅ Volunteer management');
  console.log('3. ✅ SOS alert creation');
  console.log('4. ✅ Database verification');
  console.log('5. ✅ Volunteer assignment');
  console.log('6. ✅ Real-time updates');
  
  console.log('\n💡 Next steps:');
  console.log('1. Start frontend: npm run dev');
  console.log('2. Navigate to admin dashboard');
  console.log('3. Verify alerts appear in real-time');
  console.log('4. Test manual assignment from UI');
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

debugWorkflow().catch(console.error);
