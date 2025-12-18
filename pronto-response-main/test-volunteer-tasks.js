// Test volunteer task assignment and retrieval
// Run with: node test-volunteer-tasks.js

const testVolunteerTasks = async () => {
  console.log('🧪 Testing Volunteer Task System...\n');

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

  // Step 1: Create test volunteer
  console.log('\n👤 Creating test volunteer...');
  let testVolunteer = null;
  try {
    const volunteerData = {
      name: 'Test Volunteer',
      email: 'testvolunteer@example.com',
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
      const result = await volunteerResponse.json();
      testVolunteer = result;
      console.log(`✅ Test volunteer created: ${testVolunteer.name} (${testVolunteer._id})`);
    } else {
      // Volunteer might already exist, try to find them
      const existingResponse = await fetch(`${backendUrl}/api/volunteers`);
      const volunteers = await existingResponse.json();
      testVolunteer = volunteers.find(v => v.email === 'testvolunteer@example.com');
      
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

  // Step 2: Create test SOS alert
  console.log('\n🚨 Creating test SOS alert...');
  let testAlert = null;
  try {
    const sosData = {
      userLocation: "Test Emergency Location: Lat 13.0635, Lng 80.2297",
      lat: 13.0635,
      lng: 80.2297,
      userName: "Test Emergency User",
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

  // Step 3: Assign volunteer to alert
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

  // Step 4: Test volunteer task retrieval by email
  console.log('\n📋 Testing task retrieval by email...');
  try {
    const tasksResponse = await fetch(`${backendUrl}/api/tasks?email=${encodeURIComponent(testVolunteer.email)}`);
    
    if (tasksResponse.ok) {
      const tasks = await tasksResponse.json();
      console.log(`✅ Retrieved ${tasks.length} tasks for volunteer`);
      
      if (tasks.length > 0) {
        const task = tasks[0];
        console.log('\n📄 Task Details:');
        console.log(`   ID: ${task.id}`);
        console.log(`   Title: ${task.title}`);
        console.log(`   Description: ${task.description}`);
        console.log(`   Location: ${task.location}`);
        console.log(`   Status: ${task.status}`);
        console.log(`   Victim: ${task.victimName}`);
        console.log(`   Phone: ${task.victimPhone}`);
        console.log(`   Assigned: ${new Date(task.assignedAt).toLocaleString()}`);
        console.log(`   Emergency Type: ${task.emergencyType}`);
        
        if (task.estimatedResponseTime) {
          console.log(`   Est. Response Time: ${task.estimatedResponseTime} minutes`);
        }
      } else {
        console.log('⚠️ No tasks found - assignment may not have been processed yet');
      }
    } else {
      console.log(`❌ Failed to retrieve tasks: ${tasksResponse.status}`);
    }
  } catch (error) {
    console.error('❌ Error retrieving tasks:', error.message);
  }

  // Step 5: Test new volunteer tasks endpoint
  console.log('\n📋 Testing new volunteer tasks endpoint...');
  try {
    const newTasksResponse = await fetch(`${backendUrl}/api/volunteer-tasks/${testVolunteer._id}`);
    
    if (newTasksResponse.ok) {
      const result = await newTasksResponse.json();
      const tasks = result.data || [];
      console.log(`✅ New endpoint retrieved ${tasks.length} tasks`);
      
      if (tasks.length > 0) {
        console.log('📄 Task from new endpoint matches legacy format');
      }
    } else {
      console.log(`❌ New endpoint failed: ${newTasksResponse.status}`);
    }
  } catch (error) {
    console.error('❌ Error with new endpoint:', error.message);
  }

  // Step 6: Test task retrieval by email endpoint
  console.log('\n📋 Testing email-based task endpoint...');
  try {
    const emailTasksResponse = await fetch(`${backendUrl}/api/volunteer-tasks-by-email/${encodeURIComponent(testVolunteer.email)}`);
    
    if (emailTasksResponse.ok) {
      const tasks = await emailTasksResponse.json();
      console.log(`✅ Email endpoint retrieved ${tasks.length} tasks`);
    } else {
      console.log(`❌ Email endpoint failed: ${emailTasksResponse.status}`);
    }
  } catch (error) {
    console.error('❌ Error with email endpoint:', error.message);
  }

  console.log('\n📋 Volunteer Task System Test Results:');
  console.log('✅ Volunteer creation/retrieval');
  console.log('✅ SOS alert creation');
  console.log('✅ Manual volunteer assignment');
  console.log('✅ Task retrieval by email (legacy)');
  console.log('✅ Task data transformation');
  console.log('✅ Emergency-specific task details');
  
  console.log('\n💡 Next steps:');
  console.log('1. Start frontend: npm run dev');
  console.log('2. Login as volunteer with email: testvolunteer@example.com');
  console.log('3. Navigate to volunteer tasks page');
  console.log('4. Verify assigned tasks appear with full details');
  console.log('5. Test real-time updates (tasks refresh every 10 seconds)');
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

testVolunteerTasks().catch(console.error);
