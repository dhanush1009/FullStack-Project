// Test volunteer assignment functionality
// Run with: node test-assignment.js

const testAssignment = async () => {
  console.log('🧪 Testing Volunteer Assignment System...\n');

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

  // 1. Get all emergency alerts
  console.log('\n📋 Fetching emergency alerts...');
  try {
    const alertsResponse = await fetch(`${backendUrl}/api/emergency-alerts`);
    if (!alertsResponse.ok) {
      console.log('❌ Failed to fetch alerts:', alertsResponse.status);
      return;
    }
    
    const alertsData = await alertsResponse.json();
    const alerts = alertsData.data || [];
    console.log(`📊 Found ${alerts.length} emergency alerts`);
    
    if (alerts.length === 0) {
      console.log('⚠️ No emergency alerts found. Please create a SOS alert first.');
      return;
    }

    // Find a pending alert
    const pendingAlert = alerts.find(a => a.status === 'pending');
    if (!pendingAlert) {
      console.log('⚠️ No pending alerts found. All alerts may already be assigned.');
      console.log('Available alerts:');
      alerts.forEach(a => {
        console.log(`   - ${a._id}: ${a.emergencyType} (${a.status})`);
      });
      return;
    }

    console.log(`🎯 Testing with alert: ${pendingAlert._id} (${pendingAlert.emergencyType})`);

    // 2. Get all volunteers
    console.log('\n👥 Fetching volunteers...');
    const volunteersResponse = await fetch(`${backendUrl}/api/volunteers`);
    if (!volunteersResponse.ok) {
      console.log('❌ Failed to fetch volunteers:', volunteersResponse.status);
      return;
    }
    
    const volunteers = await volunteersResponse.json();
    console.log(`📊 Found ${volunteers.length} volunteers`);
    
    if (volunteers.length === 0) {
      console.log('⚠️ No volunteers found. Please register volunteers first.');
      return;
    }

    // Find an available volunteer
    const availableVolunteer = volunteers.find(v => v.isAvailable !== false);
    if (!availableVolunteer) {
      console.log('⚠️ No available volunteers found.');
      volunteers.forEach(v => {
        console.log(`   - ${v.name}: ${v.isAvailable === false ? 'Busy' : 'Available'}`);
      });
      return;
    }

    console.log(`🎯 Testing with volunteer: ${availableVolunteer.name} (${availableVolunteer._id})`);

    // 3. Test assignment
    console.log('\n🔄 Testing volunteer assignment...');
    const assignmentResponse = await fetch(`${backendUrl}/api/emergency-alerts/${pendingAlert._id}/assign-volunteer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ volunteerId: availableVolunteer._id })
    });

    console.log(`📡 Assignment response status: ${assignmentResponse.status}`);
    
    if (assignmentResponse.ok) {
      const result = await assignmentResponse.json();
      console.log('✅ Assignment successful!');
      console.log(`📋 Result:`, JSON.stringify(result, null, 2));
      
      // 4. Verify assignment by fetching alerts again
      console.log('\n🔍 Verifying assignment...');
      const verifyResponse = await fetch(`${backendUrl}/api/emergency-alerts`);
      if (verifyResponse.ok) {
        const verifyData = await verifyResponse.json();
        const updatedAlert = verifyData.data.find(a => a._id === pendingAlert._id);
        
        if (updatedAlert && updatedAlert.status === 'assigned') {
          console.log('✅ Assignment verified in database!');
          console.log(`👤 Assigned volunteer: ${updatedAlert.assignedVolunteer?.name || 'Unknown'}`);
          console.log(`📊 Status: ${updatedAlert.status}`);
        } else {
          console.log('❌ Assignment not reflected in database');
          console.log('Updated alert:', updatedAlert);
        }
      }
      
    } else {
      const errorText = await assignmentResponse.text();
      console.log('❌ Assignment failed:', errorText);
      
      try {
        const error = JSON.parse(errorText);
        console.log('Error details:', error);
      } catch (e) {
        console.log('Raw error:', errorText);
      }
    }

  } catch (error) {
    console.error('❌ Test error:', error.message);
  }

  console.log('\n✅ Assignment test completed!');
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

testAssignment().catch(console.error);
