import React, { useEffect, useRef, useState } from "react";
import BackButton from "./BackButton";
import io from "socket.io-client";

const VolunteerDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("userEmail"); // logged-in volunteer email

  // Get backend URL (same logic as other components)
  const getBackendUrl = async () => {
    // Try common backend ports
    const commonPorts = ['5000', '5001', '3000', '8000'];
    for (const port of commonPorts) {
      try {
        const testUrl = `http://localhost:${port}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        let response: Response | null = null;
        try {
          response = await fetch(`${testUrl}/api/health`, { 
            method: 'GET',
            signal: controller.signal
          });
        } catch (fetchError) {
          // Ignore and continue trying other ports
        }
        
        clearTimeout(timeoutId);
        
        if (response?.ok) {
          console.log(`✅ Found backend server at ${testUrl}`);
          return testUrl;
        }
      } catch (e) {
        // Continue to next port
      }
    }
    
    // Default fallback
    console.log('Using default backend URL');
    return 'http://localhost:5000';
  };

  // Fetch tasks from backend
  const fetchTasks = async () => {
    if (!email) {
      console.log('❌ No email found in localStorage');
      setTasks([]);
      return;
    }

    setLoading(true);
    try {
      const backendUrl = await getBackendUrl();
      console.log(`📋 Fetching tasks for volunteer: ${email}`);
      
      const res = await fetch(`${backendUrl}/api/tasks?email=${encodeURIComponent(email)}`);
      
      if (!res.ok) {
        console.error(`❌ Failed to fetch tasks: ${res.status}`);
        setTasks([]);
        return;
      }
      
      const data = await res.json();
      console.log(`📊 Received ${Array.isArray(data) ? data.length : 0} tasks:`, data);
      
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Error fetching tasks:", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!email) return;

    fetchTasks();

    // Connect to WebSocket for real-time updates
    (async () => {
      const backendUrl = await getBackendUrl();
      const socket = io(backendUrl, { transports: ['websocket'], reconnectionAttempts: 5 });
      socketRef.current = socket;

      socket.on('connect', () => {
        console.log('🔌 Connected to task updates');
        socket.emit('registerVolunteer', email.toLowerCase());
      });

      socket.on('taskAssigned', (payload) => {
        if (payload?.volunteerEmail?.toLowerCase() === email.toLowerCase()) {
          console.log('📥 New task assignment received via socket');
          fetchTasks();
        }
      });

      socket.on('disconnect', () => {
        console.log('⚠️ Disconnected from task updates');
      });
    })();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [email]);

  // Update task status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const backendUrl = await getBackendUrl();
      
      const response = await fetch(`${backendUrl}/api/tasks/${taskId}/update-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, email })
      });

      if (response.ok) {
        console.log(`✅ Task status updated to: ${newStatus}`);
        fetchTasks(); // Refresh tasks
      } else {
        console.error('❌ Failed to update task status');
        alert('Failed to update task status');
      }
    } catch (error) {
      console.error('❌ Error updating task status:', error);
      alert('Error updating task status');
    }
  };

  // Submit completion request
  const submitCompletion = async (taskId) => {
    if (!window.confirm("Are you sure you want to mark this task as completed?")) return;

    try {
      await updateTaskStatus(taskId, 'completed');
    } catch (err) {
      console.error("Error submitting completion:", err);
    }
  };

  // Count tasks by status
  const normalizeStatus = (status?: string) => (status || '').toLowerCase();
  const completedCount = tasks.filter((t) => normalizeStatus(t.status) === "completed").length;
  const inProgressCount = tasks.filter((t) => normalizeStatus(t.status) === "in progress" || normalizeStatus(t.status) === 'in-progress').length;
  const pendingCount = tasks.filter((t) => normalizeStatus(t.status) === "pending").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton to="/volunteer-login" label="Back to Dashboard" />
        </div>
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome Back, {localStorage.getItem("username") || "Volunteer"}! 👋
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to make a difference today? Here's your mission control center.
          </p>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Tasks */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900">{tasks.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                📘
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">{completedCount}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                ✅
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-blue-600">{inProgressCount}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                🚀
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-amber-600">{pendingCount}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                ⏳
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">📋</span>
            Your Active Missions
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading your tasks...</span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks assigned yet</h3>
            <p className="text-gray-600">Check back soon for new volunteer opportunities!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/80"
              >
                {/* Task Status Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : task.status === "Pending Approval"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {task.status === "Completed"
                      ? "✅"
                      : task.status === "Pending Approval"
                      ? "⏳"
                      : "🕒"}
                    <span className="ml-1">{task.status}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  🚨 {task.emergencyType || 'Emergency'} - {task.victimName || 'Unknown'}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {task.description || `Emergency assistance needed for ${task.victimName || 'victim'}`}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    📍 <span className="ml-2 font-medium">{task.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    👤 <span className="ml-2">Victim: {task.victimName || 'Not specified'}</span>
                  </div>
                  {task.victimPhone && (
                    <div className="flex items-center text-sm text-gray-600">
                      📞 <span className="ml-2">Phone: {task.victimPhone}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600">
                    🗓 <span className="ml-2">Assigned: {new Date(task.assignedAt).toLocaleString()}</span>
                  </div>
                  {task.estimatedResponseTime && (
                    <div className="flex items-center text-sm text-gray-600">
                      ⏱️ <span className="ml-2">Est. Time: {task.estimatedResponseTime} minutes</span>
                    </div>
                  )}
                </div>

                {/* Task Actions */}
                <div className="border-t border-gray-200 pt-4">
                  {task.status === "Pending" && (
                    <div className="space-y-3">
                      <button
                        onClick={() => updateTaskStatus(task.id, 'in_progress')}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 
                                   hover:from-blue-600 hover:to-blue-700 text-white 
                                   font-medium py-2 px-4 rounded-xl transition-all duration-200 
                                   shadow-md hover:shadow-lg"
                      >
                        🚀 Start Task
                      </button>
                      <button
                        onClick={() => submitCompletion(task.id)}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 
                                   hover:from-green-600 hover:to-green-700 text-white 
                                   font-medium py-2 px-4 rounded-xl transition-all duration-200 
                                   shadow-md hover:shadow-lg"
                      >
                        ✅ Mark as Completed
                      </button>
                    </div>
                  )}
                  
                  {task.status === "In Progress" && (
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <p className="text-blue-700 font-medium">🚀 Task in progress</p>
                        <p className="text-blue-600 text-sm">You're working on this emergency</p>
                      </div>
                      <button
                        onClick={() => submitCompletion(task.id)}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 
                                   hover:from-green-600 hover:to-green-700 text-white 
                                   font-medium py-2 px-4 rounded-xl transition-all duration-200 
                                   shadow-md hover:shadow-lg"
                      >
                        ✅ Mark as Completed
                      </button>
                    </div>
                  )}
                  
                  {task.status === "Completed" && (
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <p className="text-green-700 font-medium">✅ Task completed</p>
                      <p className="text-green-600 text-sm">Great job helping in this emergency!</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;
