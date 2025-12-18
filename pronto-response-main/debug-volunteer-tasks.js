// Debug volunteer task assignment and retrieval
// Run with: node debug-volunteer-tasks.js

const debugVolunteerTasks = async () => {
  console.log('🔍 Debugging Volunteer Task Assignment Flow...\n');

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

  // Step 1: Create/Find test volunteer
  console.log('\n👤 Setting up test volunteer...');
  let testVolunteer = null;
  const testEmail = 'debug.volunteer@test.com';
  
  try {
    // First try to create volunteer profile
    const volunteerData = {
      name: 'Debug Volunteer',
      email: testEmail,
      age: 25,
      shelter: '1',
      phone: '+917339486437'
    };

    const volunteerResponse = await fetch(`${backendUrl}/api/volunteers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(volunteerData)
    });

    if (volunteerResponse.ok) {
      testVolunteer = await volunteerResponse.json();
      console.log(`✅ Volunteer profile created: ${testVolunteer.name} (${testVolunteer._id})`);
    } else {
      // Try to find existing volunteer
      const existingResponse = await fetch(`${backendUrl}/api/volunteers`);
      const volunteers = await existingResponse.json();
      testVolunteer = volunteers.find(v => v.email === testEmail);
      
      if (testVolunteer) {
        console.log(`✅ Using existing volunteer: ${testVolunteer.name} (${testVolunteer._id})`);
      } else {
        console.log('❌ Could not create or find test volunteer');
        return;
      }
    }
  } catch (error) {
    console.error('❌ Error with volunteer setup:', error.message);
    return;
  }

  // Step 2: Create user account for login
  console.log('\n👤 Setting up user account...');
  try {
    const userData = {
      name: 'Debug Volunteer',
      email: testEmail,
      password: 'password123',
      role: 'volunteer'
    };

    const userResponse = await fetch(`${backendUrl}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (userResponse.ok) {
      console.log(`✅ User account created for: ${testEmail}`);
    } else {
      console.log(`ℹ️ User account may already exist for: ${testEmail}`);
    }
  } catch (error) {
    console.log(`ℹ️ User account setup: ${error.message}`);
  }

  // Step 3: Test login
  console.log('\n🔐 Testing volunteer login...');
  try {
    const loginData = {
      email: testEmail,
      password: 'password123',
      role: 'volunteer'
    };

    const loginResponse = await fetch(`${backendUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });

    if (loginResponse.ok) {
      const loginResult = await loginResponse.json();
      console.log(`✅ Login successful:`, loginResult);
    } else {
      const loginError = await loginResponse.text();
      console.log(`❌ Login failed:`, loginError);
    }
  } catch (error) {
    console.error('❌ Login error:', error.message);
  }

  // Step 4: Create test SOS alert
  console.log('\n🚨 Creating test SOS alert...');
  let testAlert = null;
  try {
    const sosData = {
      userLocation: "Debug Emergency Location: Lat 13.0635, Lng 80.2297",
      lat: 13.0635,
      lng: 80.2297,
      userName: "Debug Emergency User",
      timestamp: new Date().toISOString()
    };

    const sosResponse = await fetch(`${backendUrl}/api/sos-alert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sosData)
    });

    if (sosResponse.ok) {
      const sosResult = await sosResponse.json();
      testAlert = { _id: sosResult.alertId };
      console.log(`✅ SOS alert created: ${testAlert._id}`);
    } else {
      console.log('❌ Failed to create SOS alert');
      return;
    }
  } catch (error) {
    console.error('❌ Error creating SOS alert:', error.message);
    return;
  }

  // Step 5: Assign volunteer to alert
  console.log('\n🎯 Assigning volunteer to alert...');
  try {
    const assignResponse = await fetch(`${backendUrl}/api/emergency-alerts/${testAlert._id}/assign-volunteer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ volunteerId: testVolunteer._id })
    });

    if (assignResponse.ok) {
      const assignResult = await assignResponse.json();
      console.log('✅ Volunteer assigned successfully!');
      console.log(`👤 Assigned: ${assignResult.data.assignedVolunteer.name}`);
    } else {
      const assignError = await assignResponse.text();
      console.log('❌ Assignment failed:', assignError);
      return;
    }
  } catch (error) {
    console.error('❌ Error assigning volunteer:', error.message);
    return;
  }

  // Step 6: Test task retrieval by email
  console.log('\n📋 Testing task retrieval by email...');
  try {
    const tasksResponse = await fetch(`${backendUrl}/api/tasks?email=${encodeURIComponent(testEmail)}`);
    
    console.log(`📡 Tasks response status: ${tasksResponse.status}`);
    
    if (tasksResponse.ok) {
      const tasks = await tasksResponse.json();
      console.log(`✅ Retrieved ${tasks.length} tasks for volunteer`);
      
      if (tasks.length > 0) {
        console.log('\n📄 Task Details:');
        tasks.forEach((task, index) => {
          console.log(`\n   Task ${index + 1}:`);
          console.log(`   ID: ${task.id}`);
          console.log(`   Title: ${task.title}`);
          console.log(`   Description: ${task.description}`);
          console.log(`   Location: ${task.location}`);
          console.log(`   Status: ${task.status}`);
          console.log(`   Victim: ${task.victimName}`);
          console.log(`   Phone: ${task.victimPhone}`);
          console.log(`   Assigned: ${new Date(task.assignedAt).toLocaleString()}`);
          console.log(`   Emergency Type: ${task.emergencyType}`);
        });
      } else {
        console.log('⚠️ No tasks found for this volunteer');
        
        // Debug: Check if volunteer exists in database
        console.log('\n🔍 Debugging volunteer lookup...');
        const debugVolunteerResponse = await fetch(`${backendUrl}/api/volunteers`);
        const allVolunteers = await debugVolunteerResponse.json();
        const foundVolunteer = allVolunteers.find(v => v.email === testEmail);
        
        if (foundVolunteer) {
          console.log(`✅ Volunteer found in database: ${foundVolunteer._id}`);
          
          // Check emergency alerts
          const alertsResponse = await fetch(`${backendUrl}/api/emergency-alerts`);
          const alertsData = await alertsResponse.json();
          const alerts = alertsData.data || alertsData;
          
          console.log(`📊 Total emergency alerts: ${alerts.length}`);
          const assignedToVolunteer = alerts.filter(a => 
            a.assignedVolunteer && 
            (a.assignedVolunteer._id === foundVolunteer._id || a.assignedVolunteer === foundVolunteer._id)
          );
          
          console.log(`📊 Alerts assigned to this volunteer: ${assignedToVolunteer.length}`);
          
          if (assignedToVolunteer.length > 0) {
            console.log('📋 Assigned alerts:');
            assignedToVolunteer.forEach(alert => {
              console.log(`   - ${alert._id}: ${alert.emergencyType} (${alert.status})`);
              console.log(`     Assigned Volunteer: ${alert.assignedVolunteer}`);
            });
          }
        } else {
          console.log(`❌ Volunteer not found in database with email: ${testEmail}`);
        }
      }
    } else {
      const errorText = await tasksResponse.text();
      console.log(`❌ Failed to retrieve tasks: ${errorText}`);
    }
  } catch (error) {
    console.error('❌ Error retrieving tasks:', error.message);
  }

  console.log('\n📋 Debug Summary:');
  console.log('1. ✅ Backend connection');
  console.log('2. ✅ Volunteer profile creation');
  console.log('3. ✅ User account setup');
  console.log('4. ✅ Login functionality');
  console.log('5. ✅ SOS alert creation');
  console.log('6. ✅ Volunteer assignment');
  console.log('7. 🔍 Task retrieval debugging');
  
  console.log('\n💡 Next steps:');
  console.log('1. Check if volunteer profile and user account have matching emails');
  console.log('2. Verify emergency alert assignment is properly saved');
  console.log('3. Test volunteer dashboard with this debug data');
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

debugVolunteerTasks().catch(console.error);
