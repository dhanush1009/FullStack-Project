// Test complete volunteer flow
// Run with: node test-volunteer-flow.js

const testVolunteerFlow = async () => {
  console.log('🧪 Testing Complete Volunteer Flow...\n');

  const backendUrl = 'http://localhost:5000';
  const testEmail = 'flowtest.volunteer@test.com';

  try {
    // Step 1: Create user account
    console.log('1️⃣ Creating user account...');
    const userResponse = await fetch(`${backendUrl}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Flow Test Volunteer',
        email: testEmail,
        password: 'password123',
        role: 'volunteer'
      })
    });

    if (userResponse.ok) {
      console.log('✅ User account created');
    } else {
      console.log('ℹ️ User account may already exist');
    }

    // Step 2: Create volunteer profile
    console.log('\n2️⃣ Creating volunteer profile...');
    const volunteerResponse = await fetch(`${backendUrl}/api/volunteers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Flow Test Volunteer',
        email: testEmail,
        age: 25,
        shelter: '1',
        phone: '+917339486437'
      })
    });

    let volunteerId = null;
    if (volunteerResponse.ok) {
      const volunteerData = await volunteerResponse.json();
      volunteerId = volunteerData._id;
      console.log(`✅ Volunteer profile created: ${volunteerId}`);
    } else {
      // Try to find existing volunteer
      const existingResponse = await fetch(`${backendUrl}/api/volunteers`);
      const volunteers = await existingResponse.json();
      const existingVolunteer = volunteers.find(v => v.email === testEmail);
      if (existingVolunteer) {
        volunteerId = existingVolunteer._id;
        console.log(`✅ Using existing volunteer: ${volunteerId}`);
      } else {
        console.log('❌ Could not create or find volunteer');
        return;
      }
    }

    // Step 3: Test login
    console.log('\n3️⃣ Testing login...');
    const loginResponse = await fetch(`${backendUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'password123',
        role: 'volunteer'
      })
    });

    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Login successful:', loginData);
    } else {
      const loginError = await loginResponse.text();
      console.log('❌ Login failed:', loginError);
      return;
    }

    // Step 4: Create SOS alert
    console.log('\n4️⃣ Creating SOS alert...');
    const sosResponse = await fetch(`${backendUrl}/api/sos-alert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userLocation: "Flow Test Emergency: Lat 13.0635, Lng 80.2297",
        lat: 13.0635,
        lng: 80.2297,
        userName: "Flow Test User",
        timestamp: new Date().toISOString()
      })
    });

    let alertId = null;
    if (sosResponse.ok) {
      const sosData = await sosResponse.json();
      alertId = sosData.alertId;
      console.log(`✅ SOS alert created: ${alertId}`);
    } else {
      console.log('❌ Failed to create SOS alert');
      return;
    }

    // Step 5: Assign volunteer to alert
    console.log('\n5️⃣ Assigning volunteer to alert...');
    const assignResponse = await fetch(`${backendUrl}/api/emergency-alerts/${alertId}/assign-volunteer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ volunteerId })
    });

    if (assignResponse.ok) {
      const assignData = await assignResponse.json();
      console.log('✅ Assignment successful:', assignData.data.assignedVolunteer.name);
    } else {
      const assignError = await assignResponse.text();
      console.log('❌ Assignment failed:', assignError);
      return;
    }

    // Step 6: Fetch tasks for volunteer
    console.log('\n6️⃣ Fetching tasks for volunteer...');
    const tasksResponse = await fetch(`${backendUrl}/api/tasks?email=${encodeURIComponent(testEmail)}`);
    
    if (tasksResponse.ok) {
      const tasks = await tasksResponse.json();
      console.log(`✅ Retrieved ${tasks.length} tasks`);
      
      if (tasks.length > 0) {
        console.log('\n📋 Task Details:');
        const task = tasks[0];
        console.log(`   Title: ${task.title}`);
        console.log(`   Description: ${task.description}`);
        console.log(`   Location: ${task.location}`);
        console.log(`   Status: ${task.status}`);
        console.log(`   Victim: ${task.victimName}`);
        console.log(`   Phone: ${task.victimPhone}`);
        console.log(`   Assigned: ${new Date(task.assignedAt).toLocaleString()}`);
        
        console.log('\n🎉 FLOW TEST PASSED! Volunteer can see assigned tasks.');
      } else {
        console.log('❌ No tasks found - assignment may not be working');
      }
    } else {
      const tasksError = await tasksResponse.text();
      console.log('❌ Failed to fetch tasks:', tasksError);
    }

  } catch (error) {
    console.error('❌ Flow test error:', error.message);
  }

  console.log('\n📋 Flow Test Complete');
  console.log('💡 If tasks are not showing, check:');
  console.log('   1. Volunteer profile email matches user account email');
  console.log('   2. Emergency alert assignment is saved correctly');
  console.log('   3. Backend logs for debugging information');
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

testVolunteerFlow().catch(console.error);
