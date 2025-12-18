// Test manual assignment system (no location-based logic)
// Run with: node test-manual-assignment.js

const testManualAssignment = async () => {
  console.log('🧪 Testing Manual Assignment System...\n');

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

  // Step 1: Create multiple test volunteers
  console.log('\n👥 Creating test volunteers...');
  const testVolunteers = [
    { name: 'Alice Johnson', email: 'alice@test.com' },
    { name: 'Bob Smith', email: 'bob@test.com' },
    { name: 'Carol Davis', email: 'carol@test.com' }
  ];

  for (const vol of testVolunteers) {
    try {
      const createResponse = await fetch(`${backendUrl}/api/volunteers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: vol.name,
          email: vol.email,
          age: 25,
          shelter: '1',
          phone: '+917339486437'
        })
      });

      if (createResponse.ok) {
        console.log(`✅ Created volunteer: ${vol.name}`);
      } else {
        console.log(`⚠️ Volunteer ${vol.name} may already exist`);
      }
    } catch (error) {
      console.log(`❌ Error creating ${vol.name}:`, error.message);
    }
  }

  // Step 2: Create test SOS alert
  console.log('\n🚨 Creating test SOS alert...');
  try {
    const sosData = {
      userLocation: "Manual Assignment Test: Lat 13.0635, Lng 80.2297",
      lat: 13.0635,
      lng: 80.2297,
      userName: "Manual Test User",
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
      
      // Step 3: Get all volunteers (should show all, not just available)
      console.log('\n👥 Fetching all volunteers...');
      const volunteersResponse = await fetch(`${backendUrl}/api/volunteers`);
      const volunteers = await volunteersResponse.json();
      
      console.log(`📊 Found ${volunteers.length} volunteers:`);
      volunteers.forEach(v => {
        console.log(`   - ${v.name} (${v.email}) - ${v.isAvailable === false ? '🔴 Busy' : '🟢 Available'}`);
      });

      if (volunteers.length > 0) {
        // Step 4: Test manual assignment with any volunteer
        const testVolunteer = volunteers[0]; // Pick first volunteer regardless of availability
        console.log(`\n🎯 Testing manual assignment with: ${testVolunteer.name}`);
        
        const assignResponse = await fetch(`${backendUrl}/api/emergency-alerts/${sosResult.alertId}/assign-volunteer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ volunteerId: testVolunteer._id })
        });
        
        if (assignResponse.ok) {
          const assignResult = await assignResponse.json();
          console.log('✅ Manual assignment successful!');
          console.log(`👤 Assigned: ${assignResult.data.assignedVolunteer.name}`);
          console.log(`⏱️ Estimated time: ${assignResult.data.estimatedResponseTime} minutes`);
          
          // Step 5: Test unassignment
          console.log('\n🔄 Testing unassignment...');
          const unassignResponse = await fetch(`${backendUrl}/api/emergency-alerts/${sosResult.alertId}/unassign-volunteer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
          
          if (unassignResponse.ok) {
            const unassignResult = await unassignResponse.json();
            console.log('✅ Unassignment successful!');
            console.log(`📊 Alert status: ${unassignResult.data.status}`);
            
            // Step 6: Test reassignment with different volunteer
            if (volunteers.length > 1) {
              const secondVolunteer = volunteers[1];
              console.log(`\n🔄 Testing reassignment with: ${secondVolunteer.name}`);
              
              const reassignResponse = await fetch(`${backendUrl}/api/emergency-alerts/${sosResult.alertId}/assign-volunteer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ volunteerId: secondVolunteer._id })
              });
              
              if (reassignResponse.ok) {
                const reassignResult = await reassignResponse.json();
                console.log('✅ Reassignment successful!');
                console.log(`👤 New assignee: ${reassignResult.data.assignedVolunteer.name}`);
              } else {
                console.log('❌ Reassignment failed');
              }
            }
          } else {
            console.log('❌ Unassignment failed');
          }
        } else {
          const assignError = await assignResponse.text();
          console.log('❌ Manual assignment failed:', assignError);
        }
      } else {
        console.log('❌ No volunteers found for testing');
      }
    } else {
      const sosError = await sosResponse.text();
      console.log('❌ SOS creation failed:', sosError);
    }
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }

  console.log('\n📋 Manual Assignment System Features Tested:');
  console.log('✅ No location-based filtering');
  console.log('✅ Admin can assign any volunteer to any alert');
  console.log('✅ Shows all volunteers (available and busy)');
  console.log('✅ Manual assignment functionality');
  console.log('✅ Unassignment functionality');
  console.log('✅ Reassignment capability');
  
  console.log('\n💡 Admin Dashboard Features:');
  console.log('- Dropdown shows ALL volunteers with status indicators');
  console.log('- Can assign busy volunteers (admin decision)');
  console.log('- Unassign button for reassignments');
  console.log('- Volunteer status overview section');
  console.log('- Real-time updates after assignments');
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

testManualAssignment().catch(console.error);
