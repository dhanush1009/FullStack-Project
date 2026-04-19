import React, { useState, useEffect } from "react";
 import io from 'socket.io-client';

const districtsData = [
        {
          district: "Chennai",
          shelters: [
            { id: 1, name: "Chennai Corporation Shelter", address: "123 Anna Salai, Chennai", phone: "+91 7339486437", email: "chennai1@example.com", location: { lat: 13.0635, lng: 80.2297 } },
            { id: 2, name: "Red Cross Relief Center", address: "45 Gandhi Nagar, Chennai", phone: "+91 7339486437", email: "chennai2@example.com", location: { lat: 13.0856, lng: 80.2484 } },
            { id: 3, name: "Govt. School Shelter", address: "K.K. Nagar, Chennai", phone: "+91 7339486437", email: "chennai3@example.com", location: { lat: 13.0392, lng: 80.2126 } },
            { id: 4, name: "Community Hall Shelter", address: "Perambur, Chennai", phone: "+91 7339486437", email: "chennai4@example.com", location: { lat: 13.1131, lng: 80.2214 } },
            { id: 5, name: "College Auditorium Shelter", address: "T. Nagar, Chennai", phone: "+91 7339486437", email: "chennai5@example.com", location: { lat: 13.0418, lng: 80.2333 } },
          ],
        },
        {
          district: "Cuddalore",
          shelters: [
            { id: 6, name: "Cuddalore Relief Camp 1", address: "Silver Beach Road, Cuddalore", phone: "+91 7339486437", email: "cuddalore1@example.com", location: { lat: 11.7361, lng: 79.7686 } },
            { id: 7, name: "Cuddalore Relief Camp 2", address: "Old Town Hall, Cuddalore", phone: "+91 7339486437", email: "cuddalore2@example.com", location: { lat: 11.746, lng: 79.764 } },
            { id: 8, name: "Cuddalore Govt. School Shelter", address: "Main Road, Cuddalore", phone: "+91 7339486437", email: "cuddalore3@example.com", location: { lat: 11.75, lng: 79.76 } },
            { id: 9, name: "Seashore Relief Camp", address: "Beach Road, Cuddalore", phone: "+91 7339486437", email: "cuddalore4@example.com", location: { lat: 11.73, lng: 79.77 } },
            { id: 10, name: "Cyclone Relief Center", address: "Port Area, Cuddalore", phone: "+91 7339486437", email: "cuddalore5@example.com", location: { lat: 11.735, lng: 79.765 } },
          ],
        },
        {
          district: "Nagapattinam",
          shelters: [
            { id: 11, name: "Nagapattinam Relief Camp 1", address: "Harbor Road, Nagapattinam", phone: "+91 7339486437", email: "nagapattinam1@example.com", location: { lat: 10.763, lng: 79.843 } },
            { id: 12, name: "Nagapattinam Relief Camp 2", address: "Town Hall, Nagapattinam", phone: "+91 7339486437", email: "nagapattinam2@example.com", location: { lat: 10.765, lng: 79.84 } },
            { id: 13, name: "Govt. School Shelter", address: "Main Road, Nagapattinam", phone: "+91 7339486437", email: "nagapattinam3@example.com", location: { lat: 10.76, lng: 79.85 } },
            { id: 14, name: "Fishing Village Relief", address: "Coastline, Nagapattinam", phone: "+91 7339486437", email: "nagapattinam4@example.com", location: { lat: 10.77, lng: 79.84 } },
            { id: 15, name: "Cyclone Shelter", address: "Seashore Road, Nagapattinam", phone: "+91 7339486437", email: "nagapattinam5@example.com", location: { lat: 10.758, lng: 79.842 } },
          ],
        },
        {
          district: "Thoothukudi",
          shelters: [
            { id: 16, name: "Thoothukudi Relief Camp 1", address: "Beach Road, Thoothukudi", phone: "+91 7339486437", email: "thoothukudi1@example.com", location: { lat: 8.805, lng: 78.15 } },
            { id: 17, name: "Thoothukudi Relief Camp 2", address: "Old Harbor Area, Thoothukudi", phone: "+91 7339486437", email: "thoothukudi2@example.com", location: { lat: 8.81, lng: 78.145 } },
            { id: 18, name: "Govt. College Shelter", address: "Main Street, Thoothukudi", phone: "+91 7339486437", email: "thoothukudi3@example.com", location: { lat: 8.808, lng: 78.14 } },
            { id: 19, name: "Fishing Community Relief", address: "Seashore, Thoothukudi", phone: "+91 7339486437", email: "thoothukudi4@example.com", location: { lat: 8.806, lng: 78.15 } },
            { id: 20, name: "Cyclone Safe Shelter", address: "Coastline Road, Thoothukudi", phone: "+91 7339486437", email: "thoothukudi5@example.com", location: { lat: 8.804, lng: 78.142 } },
          ],
        },
        {
          district: "Kanyakumari",
          shelters: [
            { id: 21, name: "Kanyakumari Relief Camp 1", address: "Near Beach, Kanyakumari", phone: "+91 7339486437", email: "kanyakumari1@example.com", location: { lat: 8.0883, lng: 77.5385 } },
            { id: 22, name: "Kanyakumari Relief Camp 2", address: "Town Hall, Kanyakumari", phone: "+91 7339486437", email: "kanyakumari2@example.com", location: { lat: 8.09, lng: 77.54 } },
            { id: 23, name: "Govt. School Shelter", address: "Main Road, Kanyakumari", phone: "+91 7339486437", email: "kanyakumari3@example.com", location: { lat: 8.085, lng: 77.54 } },
            { id: 24, name: "Cyclone Shelter", address: "Seashore Road, Kanyakumari", phone: "+91 7339486437", email: "kanyakumari4@example.com", location: { lat: 8.083, lng: 77.537 } },
            { id: 25, name: "Fishing Village Relief", address: "Harbor Side, Kanyakumari", phone: "+91 7339486437", email: "kanyakumari5@example.com", location: { lat: 8.087, lng: 77.536 } },
          ],
        },
      ];

/* -------------------- Component -------------------- */
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // data states
  const [emergencies, setEmergencies] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [shelters, setShelters] = useState(districtsData.flatMap(d => d.shelters.map(s => ({ ...s, district: d.district }))));
  const [backendBaseUrl, setBackendBaseUrl] = useState<string>("");

  // Socket.IO connection
  // const [socket, setSocket] = useState(null);

  // modal/assign state
  const [assigning, setAssigning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [showManualAssignModal, setShowManualAssignModal] = useState(false);
  const [manualTaskData, setManualTaskData] = useState({ volunteer: "", task: "", description: "" });

  /* -------------------- Demo Fallback Data -------------------- */
  const demoEmergencies = [
    {
      _id: "demo-1",
      userName: "User Name",
      userLocation: "Lat: 11.27193, Lon: 77.60768",
      time: new Date().toISOString(),
      assignedVolunteers: [
        "ARAVINTH",
        "AB",
        "ABC",
        "dhanush",
        "hari",
        "Bharani",
      ],
    },
    {
      _id: "demo-2",
      userName: "User Name",
      userLocation: "Lat: 11.27319, Lon: 77.60701",
      time: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      assignedVolunteers: ["AB", "dhanush"],
    },
  ];

  const demoVolunteers = [
    { _id: "v1", name: "ARAVINTH", email: "aravinth@example.com", shelter: "Zone A", tasks: [] },
    { _id: "v2", name: "AB", email: "ab@example.com", shelter: "Zone B", tasks: [] },
    { _id: "v3", name: "dhanush", email: "dhanush@example.com", shelter: "Zone C", tasks: [] },
    { _id: "v4", name: "hari", email: "hari@example.com", shelter: "Zone D", tasks: [] },
    { _id: "v5", name: "Bharani", email: "bharani@example.com", shelter: "Zone E", tasks: [] },
  ];

  /* -------------------- Manual Task Assignment Functions -------------------- */
  const openManualAssignModal = (volunteer) => {
    setManualTaskData({ volunteer: volunteer._id, task: "", description: "" });
    setSelectedVolunteer(volunteer);
    setShowManualAssignModal(true);
  };

  const openEmergencyAssignModal = (emergency) => {
    setSelectedEmergency(emergency);
    setShowModal(true);
  };

        const assignManualTask = async () => {
          if (!manualTaskData.task.trim()) {
            alert("❌ Please enter a task title");
            return;
          }

          try {
            setAssigning(true);
            const backendUrl = await getBackendUrl();
            const response = await fetch(`${backendUrl}/api/volunteers/${manualTaskData.volunteer}/assign-task`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                task: manualTaskData.task,
                description: manualTaskData.description,
                assignedByName: localStorage.getItem("username") || "Admin",
                assignedByEmail: localStorage.getItem("adminEmail") || localStorage.getItem("userEmail")
              })
            });

            if (response.ok) {
              alert("✅ Task assigned successfully!");
              setShowManualAssignModal(false);
              setManualTaskData({ volunteer: "", task: "", description: "" });
              fetchVolunteers(); // Refresh volunteer list
            } else {
              const error = await response.json();
              alert("❌ " + (error.msg || "Failed to assign task"));
            }
          } catch (error) {
            console.error("Error assigning manual task:", error);
            alert("❌ Failed to assign task");
          } finally {
            setAssigning(false);
          }
        };

        const assignVolunteerToEmergency = async (volunteerId) => {
          if (!selectedEmergency) return;

          try {
            setAssigning(true);
            const backendUrl = await getBackendUrl();
            const response = await fetch(`${backendUrl}/api/emergency-alerts/${selectedEmergency._id}/assign-volunteer`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ volunteerId })
            });

            if (response.ok) {
              alert("✅ Volunteer assigned to emergency successfully!");
              setShowModal(false);
              setSelectedEmergency(null);
              fetchEmergencies(); // Refresh emergency list
            } else {
              const error = await response.json();
              alert("❌ " + (error.msg || "Failed to assign volunteer"));
            }
          } catch (error) {
            console.error("Error assigning volunteer to emergency:", error);
            alert("❌ Failed to assign volunteer");
          } finally {
            setAssigning(false);
          }
        };

        /* -------------------- Backend URL Detection -------------------- */
        const getBackendUrl = async () => {
          // Try to get from server config first
          try {
            const response = await fetch('/server-config.json');
            const config = await response.json();
            return config.url;
          } catch (error) {
            console.log('Server config not found, trying common ports...');
          }

          // Try common backend ports
          const commonPorts = ['5003', '5002', '5001', '5000', '3000', '8000'];
          for (const port of commonPorts) {
            try {
              const testUrl = `http://localhost:${port}`;
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 2000);
              
              const response = await fetch(`${testUrl}/api/emergency-alerts`, { 
                method: 'GET',
                signal: controller.signal
              });
              
              clearTimeout(timeoutId);
              
              if (response.ok) {
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

        /* -------------------- Fetching -------------------- */
        useEffect(() => {
          const detectBackend = async () => {
            try {
              const detected = await getBackendUrl();
              setBackendBaseUrl(prev => prev || detected);
            } catch (error) {
              console.error("Failed to detect backend URL", error);
            }
          };

          detectBackend();
        }, []);

        const fetchEmergencies = async () => {
          try {
            const backendUrl = await getBackendUrl();
            setBackendBaseUrl(prev => prev || backendUrl);
            const res = await fetch(`${backendUrl}/api/emergency-alerts`);
            
            if (!res.ok) {
              console.error("Failed to fetch emergencies:", res.status);
              return;
            }
            
            const data = await res.json();
            console.log("Fetched emergencies:", data);
            
            // Handle different response formats
            let formatted = [];
            if (data.success && Array.isArray(data.data)) {
              formatted = data.data.reverse();
            } else if (Array.isArray(data)) {
              formatted = data.reverse();
            }
            
            setEmergencies(formatted);
          } catch (err) {
            console.error("fetchEmergencies error:", err);
          }
        };

        const fetchVolunteers = async () => {
          try {
            const backendUrl = await getBackendUrl();
            setBackendBaseUrl(prev => prev || backendUrl);
            const res = await fetch(`${backendUrl}/api/volunteers`);
            
            if (!res.ok) {
              console.error("Failed to fetch volunteers:", res.status);
              return;
            }
            
            const data = await res.json();
            console.log("Fetched volunteers:", data);
            
            const formatted = Array.isArray(data) ? data : [];
            setVolunteers(formatted);
          } catch (err) {
            console.error("fetchVolunteers error:", err);
          }
        };

        useEffect(() => {
          // Initial data fetch
          console.log('🔄 Initial data fetch...');
          fetchEmergencies();
          fetchVolunteers();
        }, []);

        // Enhanced polling for real-time-like updates
        useEffect(() => {
          console.log('🔄 Setting up real-time polling...');

          // Refresh data every 3 seconds for better responsiveness
          const interval = setInterval(() => {
            fetchEmergencies();
            fetchVolunteers();
          }, 3000);

          return () => {
            console.log('🔄 Cleaning up polling interval');
            clearInterval(interval);
          };
        }, []);

        /* -------------------- Volunteer Actions -------------------- */
        const deleteVolunteer = async (id) => {
          if (!window.confirm("Are you sure you want to delete this volunteer?")) return;
          try {
            const backendUrl = await getBackendUrl();
            const res = await fetch(`${backendUrl}/api/volunteers/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (!res.ok) {
              alert("❌ " + (data.msg || "Failed to delete"));
              return;
            }
            const updatedVols = volunteers.filter(v => v._id !== id);
            setVolunteers(updatedVols);
            alert("✅ Volunteer deleted!");
          } catch (err) {
            console.error(err);
            alert("❌ Failed to delete volunteer");
          }
        };

        /* -------------------- Shelter Actions -------------------- */
        const deleteShelter = (id) => {
          if (!window.confirm("Are you sure you want to delete this shelter?")) return;
          const updated = shelters.filter(s => s.id !== id);
          setShelters(updated);
          alert("✅ Shelter deleted!");
        };

        /* -------------------- Assign Modal -------------------- */
        const openAssignModal = (volunteerId, task, emergencyId = null) => {
          const volunteer = (volunteers.length > 0 ? volunteers : demoVolunteers).find(v => v._id === volunteerId);
          setSelectedVolunteer(volunteer || null);
          setSelectedTask(task || "");
          setSelectedEmergency(emergencyId);
          setShowModal(true);
        };

        const confirmAssignTask = async () => {
          // This function is now handled by the inline assignment in the emergency cards
          // No automatic assignment - all assignments are manual
          setShowModal(false);
          setSelectedVolunteer(null);
          setSelectedTask("");
          setSelectedEmergency(null);
        };

        /* -------------------- Helpers -------------------- */
        const renderTasks = (tasks) => {
          if (!tasks || tasks.length === 0) return "No tasks yet";
          return tasks
            .map(t => {
              if (!t) return "";
              if (typeof t === "string") return t;
              if (typeof t === "object") return t.task ?? t.taskName ?? t.name ?? JSON.stringify(t);
              return String(t);
            })
            .filter(Boolean)
            .join(", ");
        };

        // Only show real data - no demo fallbacks
        const emergenciesToShow = emergencies;
        const volunteersToUse = volunteers;

        const stats = [
          { id: 1, title: "Active Alerts", value: emergenciesToShow.length, icon: "🚨", bg: "from-red-500 to-red-600", color: "text-red-50" },
          { id: 2, title: "Safe Zones", value: districtsData.length, icon: "🛡️", bg: "from-green-500 to-green-600", color: "text-green-50" },
          { id: 3, title: "Volunteers", value: volunteersToUse.length, icon: "👥", bg: "from-blue-500 to-blue-600", color: "text-blue-50" },
          { id: 4, title: "Shelters", value: shelters.length, icon: "🏠", bg: "from-purple-500 to-purple-600", color: "text-purple-50" },
        ];

        const pendingApprovalCount = volunteers.filter(v => v.tasks?.some(t => t?.status === "Pending Approval")).length;
        const hasProofTasks = volunteers.some(v => v.tasks?.some(t => t?.proof));

        const tabConfig = {
          dashboard: { icon: "📊", label: "Dashboard" },
          volunteers: { icon: "👥", label: "Volunteers" },
          tasks: { icon: "✅", label: "Task Approvals" },
          shelters: { icon: "🏠", label: "Shelters" }
        };

        /* -------------------- JSX -------------------- */
        return (
          <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Enhanced Sidebar */}
            <aside className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
              <div className="p-8 border-b border-slate-700">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Admin Panel
                </div>
                <p className="text-slate-300 text-sm mt-1">Emergency Management System</p>
              </div>
              <nav className="flex-1 p-6 space-y-3">
                {Object.entries(tabConfig).map(([tab, config]) => (
                  <button
                    key={tab}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
                      activeTab === tab 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transform scale-105" 
                        : "hover:bg-slate-700/50 hover:translate-x-1"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    <span className="text-2xl">{config.icon}</span>
                    <span>{config.label}</span>
                  </button>
                ))}
              </nav>
              <div className="p-6 border-t border-slate-700">
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-300 text-sm">System Status</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Online</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Enhanced Main Content */}
            <main className="flex-1 p-8">
              <header className="mb-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      Emergency Command Center
                    </h1>
                    <p className="text-gray-600 text-lg">Real-time disaster response coordination</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-lg">
                    <div className="text-sm text-gray-500">Last Updated</div>
                    <div className="text-lg font-bold text-gray-900">{new Date().toLocaleTimeString()}</div>
                  </div>
                </div>
              </header>

              {/* Enhanced Dashboard Tab */}
              {activeTab === "dashboard" && (
                <>
                  {/* Enhanced Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {stats.map((s, index) => (
                      <div 
                        key={s.id} 
                        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${s.bg} p-6 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-3xl font-bold ${s.color} mb-2`}>{s.value}</p>
                            <p className={`${s.color} opacity-90 font-medium`}>{s.title}</p>
                          </div>
                          <div className={`text-5xl ${s.color} opacity-80`}>{s.icon}</div>
                        </div>
                        <div className="absolute -right-4 -bottom-4 text-8xl opacity-10">
                          {s.icon}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced Emergency Notifications */}
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
                      <h2 className="text-2xl font-bold text-gray-900">Emergency Alerts</h2>
                      <div className="ml-auto bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                        {emergenciesToShow.length} Active
                      </div>
                    </div>
                    
                    {emergenciesToShow.length === 0 ? (
                      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="text-6xl mb-4">✅</div>
                        <p className="text-xl text-gray-500 font-medium">No active emergencies</p>
                        <p className="text-gray-400 mt-2">System monitoring for new alerts</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {emergenciesToShow.map((e, index) => (
                          <div 
                            key={e._id} 
                            className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-all duration-300"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                  <p className="font-bold text-gray-900 text-lg">
                                    {e.victimName || e.userName || "SOS User"}
                                  </p>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    e.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    e.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                                    e.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {e.status || 'pending'}
                                  </span>
                                </div>
                                <p className="text-gray-600 mb-1">
                                  📍 {e.location?.address || e.userLocation || "Location not available"}
                                </p>
                                <p className="text-gray-600 mb-1">
                                  📞 {e.victimPhone || "Phone not provided"}
                                </p>
                                <p className="text-gray-600 mb-1">
                                  🚨 {e.emergencyType || "SOS Alert"}
                                </p>
                                <p className="text-gray-400 text-sm">
                                  ⏰ {new Date(e.createdAt || e.time || Date.now()).toLocaleString()}
                                </p>
                              </div>
                              <div className="text-3xl animate-bounce">🚨</div>
                            </div>

                            <div className="border-t pt-4">
                              <div className="flex items-center gap-3 mb-3">
                                {e.status === 'pending' ? (
                                  <select
                                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    defaultValue=""
                                    onChange={async (ev) => {
                                      if (ev.target.value) {
                                        const volunteerId = ev.target.value;
                                        try {
                                          setAssigning(true);
                                          const backendUrl = await getBackendUrl();
                                          
                                          console.log(`🎯 Assigning volunteer ${volunteerId} to alert ${e._id}`);
                                          console.log(`📡 Backend URL: ${backendUrl}`);
                                          
                                          const response = await fetch(`${backendUrl}/api/emergency-alerts/${e._id}/assign-volunteer`, {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ volunteerId })
                                          });

                                          console.log(`📡 Response status: ${response.status}`);

                                          if (response.ok) {
                                            const result = await response.json();
                                            console.log(`✅ Assignment successful:`, result);
                                            alert("✅ Volunteer assigned successfully!");
                                            fetchEmergencies(); // Refresh emergency list
                                            fetchVolunteers(); // Also refresh volunteers to update availability
                                          } else {
                                            const errorText = await response.text();
                                            console.error(`❌ Assignment failed:`, errorText);
                                            
                                            let error;
                                            try {
                                              error = JSON.parse(errorText);
                                            } catch (e) {
                                              error = { message: errorText };
                                            }
                                            
                                            alert("❌ Assignment failed: " + (error.message || `Server error (${response.status})`));
                                          }
                                        } catch (error) {
                                          console.error("Error assigning volunteer:", error);
                                          alert("❌ Network error: " + error.message);
                                        } finally {
                                          setAssigning(false);
                                        }
                                        ev.target.value = "";
                                      }
                                    }}
                                    disabled={assigning}
                                  >
                                    <option value="">🎯 {assigning ? 'Assigning...' : 'Select Volunteer to Assign'}</option>
                                    {volunteersToUse.map(v => (
                                      <option key={v._id} value={v._id}>
                                        👤 {v.name} ({v.shelter || 'No shelter'}) - {v.isAvailable === false ? '🔴 Busy' : '🟢 Available'}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 text-gray-500">
                                    ✅ Already assigned
                                  </div>
                                )}
                              </div>

                              {e.assignedVolunteer || e.status === 'assigned' ? (
                                <div className="bg-green-50 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="text-sm text-green-700 font-medium">✅ Volunteer Assigned:</div>
                                    <button
                                      onClick={async () => {
                                        if (window.confirm('Are you sure you want to unassign this volunteer?')) {
                                          try {
                                            const backendUrl = await getBackendUrl();
                                            const response = await fetch(`${backendUrl}/api/emergency-alerts/${e._id}/unassign-volunteer`, {
                                              method: 'POST',
                                              headers: { 'Content-Type': 'application/json' }
                                            });
                                            
                                            if (response.ok) {
                                              alert('✅ Volunteer unassigned successfully!');
                                              fetchEmergencies();
                                              fetchVolunteers();
                                            } else {
                                              alert('❌ Failed to unassign volunteer');
                                            }
                                          } catch (error) {
                                            alert('❌ Error: ' + error.message);
                                          }
                                        }
                                      }}
                                      className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
                                    >
                                      🔄 Unassign
                                    </button>
                                  </div>
                                  {e.assignedVolunteer && (
                                    <div className="bg-white rounded-lg p-3 border border-green-200">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {e.assignedVolunteer.name?.charAt(0)?.toUpperCase() || "V"}
                                          </div>
                                          <div>
                                            <div className="font-semibold text-gray-900">{e.assignedVolunteer.name}</div>
                                            <div className="text-sm text-gray-600">{e.assignedVolunteer.email}</div>
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <div className="text-sm text-gray-600">📍 {e.assignedVolunteer.shelter || "No shelter"}</div>
                                          <div className="text-sm font-medium text-green-600">
                                            📞 {e.assignedVolunteer.phone || "No phone"}
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            Assigned: {new Date(e.assignedAt).toLocaleString()}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ) : e.status === 'pending' ? (
                                <div className="bg-yellow-50 rounded-lg p-3 flex items-center justify-between">
                                  <div className="text-sm text-yellow-700">⏳ Awaiting volunteer assignment</div>
                                  <div className="text-xs text-gray-500">Use dropdown above to assign</div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Volunteer Status Overview */}
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                      <h2 className="text-2xl font-bold text-gray-900">Volunteer Status Overview</h2>
                      <div className="ml-auto bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                        {volunteersToUse.length} Total
                      </div>
                    </div>
                    
                    {volunteersToUse.length === 0 ? (
                      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="text-6xl mb-4">👥</div>
                        <p className="text-xl text-gray-500 font-medium">No volunteers registered</p>
                        <p className="text-gray-400 mt-2">Register volunteers to enable manual assignments</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {volunteersToUse.map((v, index) => (
                          <div 
                            key={v._id} 
                            className={`bg-white rounded-xl shadow-lg p-4 border-l-4 ${
                              v.isAvailable === false ? 'border-red-500' : 'border-green-500'
                            } hover:shadow-xl transition-all duration-300`}
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                                  v.isAvailable === false ? 'bg-red-500' : 'bg-green-500'
                                }`}>
                                  {v.name?.charAt(0)?.toUpperCase() || "V"}
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">{v.name}</div>
                                  <div className="text-sm text-gray-500">{v.email}</div>
                                </div>
                              </div>
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                v.isAvailable === false ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                              }`}>
                                {v.isAvailable === false ? '🔴 Busy' : '🟢 Available'}
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">
                              <div>📍 {v.shelter || 'No shelter assigned'}</div>
                              <div>📞 {v.phone || 'No phone'}</div>
                              {v.isAvailable === false && v.currentTask && (
                                <div className="mt-2 text-xs text-red-600">
                                  🚨 Currently assigned to task
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Enhanced Volunteers Tab */}
              {activeTab === "volunteers" && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">Volunteer Management</h2>
                    <div className="ml-auto bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                      {volunteers.length} Active
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Volunteer</th>
                            <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Age</th>
                            <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Shelter</th>
                            <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Current Tasks</th>
                            <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {volunteers.map((v, index) => (
                            <tr key={v._id} className="hover:bg-gray-50 transition-colors duration-200">
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {v.name?.charAt(0)?.toUpperCase() || "V"}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-gray-900">{v.name}</div>
                                    <div className="text-sm text-gray-500">{v.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-6 text-gray-900">{v.age || "-"}</td>
                              <td className="px-8 py-6">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                  🏠 {v.shelter || "-"}
                                </span>
                              </td>
                              <td className="px-8 py-6">
                                <div className="max-w-xs">
                                  {renderTasks(v.tasks) === "No tasks yet" ? (
                                    <span className="text-gray-400 italic">No tasks assigned</span>
                                  ) : (
                                    <span className="text-gray-900 text-sm">{renderTasks(v.tasks)}</span>
                                  )}
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <div className="flex gap-2">
                                  <button
                                    className="px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg text-sm"
                                    onClick={() => openManualAssignModal(v)}
                                  >
                                    📋 Assign Task
                                  </button>
                                  <button
                                    className="px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg text-sm"
                                    onClick={() => deleteVolunteer(v._id)}
                                  >
                                    🗑️ Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {volunteers.length === 0 && (
                            <tr>
                              <td colSpan={5} className="text-center py-12">
                                <div className="text-6xl mb-4">👥</div>
                                <p className="text-xl text-gray-500 font-medium">No volunteers registered yet</p>
                                <p className="text-gray-400 mt-2">Volunteers will appear here once registered</p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Task Approvals Tab */}
              {activeTab === "tasks" && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">Task Approval Center</h2>
                    <div className="ml-auto bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium">
                      {pendingApprovalCount} Pending
                    </div>
                  </div>

                  {!hasProofTasks ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                      <div className="text-6xl mb-4">✅</div>
                      <p className="text-xl text-gray-500 font-medium">No tasks pending approval</p>
                      <p className="text-gray-400 mt-2">All submitted tasks have been reviewed</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {volunteers.map(volunteer => 
                        volunteer.tasks?.filter(task => task?.proof).map(task => {
                          const baseUrl = backendBaseUrl || (typeof window !== 'undefined' ? window.location.origin : "");
                          const proofLink = task.proofUrl
                            ? (task.proofUrl.startsWith('http')
                                ? task.proofUrl
                                : `${baseUrl}/${task.proofUrl.replace(/^\//, '')}`)
                            : null;

                          return (
                          <div key={task.id} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-500 hover:shadow-xl transition-all duration-300">
                            {/* Volunteer Info */}
                            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {volunteer.name?.charAt(0)?.toUpperCase() || "V"}
                              </div>
                              <div>
                                <div className="font-bold text-gray-900">{volunteer.name}</div>
                                <div className="text-sm text-gray-500">{volunteer.email}</div>
                              </div>
                            </div>

                            {/* Task Details */}
                            <div className="mb-4">
                              <h3 className="font-bold text-lg text-gray-900 mb-2">{task.task}</h3>
                              <p className="text-gray-600 text-sm mb-3">{task.description || "No description"}</p>
                              
                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="font-medium mr-2">📍 Location:</span>
                                  {volunteer.shelter}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="font-medium mr-2">📅 Assigned:</span>
                                  {new Date(task.assignedAt).toLocaleDateString()}
                                </div>
                                <div className="flex items-center text-sm">
                                  <span className="font-medium mr-2">Status:</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    task.status === "Completed" ? "bg-green-100 text-green-800" :
                                    task.status === "Pending Approval" ? "bg-amber-100 text-amber-800" :
                                    "bg-gray-100 text-gray-800"
                                  }`}>
                                    {task.status}
                                  </span>
                                </div>
                                {proofLink && (
                                  <div className="mt-3 space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-600">
                                      <span className="font-medium">📎 Proof:</span>
                                      <a
                                        href={proofLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 hover:text-blue-800 font-medium underline"
                                      >
                                        Open in new tab
                                      </a>
                                      <a
                                        href={proofLink}
                                        download
                                        className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium"
                                      >
                                        ⬇️ Download
                                      </a>
                                      {task.proofLocation && (
                                        <span className="text-xs text-gray-500">
                                          📍 {task.proofLocation.lat?.toFixed(5)}, {task.proofLocation.lng?.toFixed(5)}
                                        </span>
                                      )}
                                    </div>
                                    {task.proofMimeType?.startsWith('image') ? (
                                      <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                        <img
                                          src={proofLink}
                                          alt={`Proof for ${task.task}`}
                                          className="w-full h-56 object-cover"
                                        />
                                      </div>
                                    ) : (
                                      <div className="text-xs text-gray-500">Preview not available for this file type.</div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Approval Actions */}
                            {task.status === "Pending Approval" && (
                              <div className="flex gap-3">
                                <button
                                  onClick={async () => {
                                    if (!window.confirm(`Approve task "${task.task}" for ${volunteer.name}?`)) return;
                                    try {
                                      const backendUrl = await getBackendUrl();
                                      const response = await fetch(`${backendUrl}/api/tasks/${task.id}/approve`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ volunteerEmail: volunteer.email })
                                      });

                                      if (!response.ok) {
                                        const errorText = await response.text();
                                        console.error('❌ Approval failed:', errorText);
                                        alert('❌ Failed to approve task');
                                        return;
                                      }

                                      alert('✅ Task approved successfully!');
                                      await fetchVolunteers();
                                    } catch (err) {
                                      console.error(err);
                                      alert('❌ Error approving task');
                                    }
                                  }}
                                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
                                >
                                  ✅ Approve Task
                                </button>
                                <button
                                  onClick={() => {
                                    alert("Rejection feature can be added - task will remain in Pending Approval state");
                                  }}
                                  className="px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
                                >
                                  ❌ Reject
                                </button>
                              </div>
                            )}

                            {task.status === "Completed" && (
                              <div className="bg-green-50 rounded-lg p-3 text-center">
                                <span className="text-green-700 font-medium">✅ Task Completed & Approved</span>
                              </div>
                            )}
                          </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Enhanced Shelters Tab */}
              {activeTab === "shelters" && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">Shelter Management</h2>
                    <div className="ml-auto bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                      {shelters.length} Available
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Shelter</th>
                            <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">District</th>
                            <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Address</th>
                            <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Contact</th>
                            <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {shelters.map((s, index) => (
                            <tr key={s.id} className="hover:bg-gray-50 transition-colors duration-200">
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                                    🏠
                                  </div>
                                  <div className="font-semibold text-gray-900">{s.name}</div>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                  📍 {s.district}
                                </span>
                              </td>
                              <td className="px-8 py-6 text-gray-900 max-w-xs">{s.address}</td>
                              <td className="px-8 py-6">
                                <div className="space-y-1">
                                  <div className="text-sm text-gray-900">📞 {s.phone}</div>
                                  <div className="text-sm text-gray-600">📧 {s.email}</div>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <div className="flex gap-2">
                                  <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                                    ✏️ Edit
                                  </button>
                                  <button 
                                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg" 
                                    onClick={() => deleteShelter(s.id)}
                                  >
                                    🗑️ Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {shelters.length === 0 && (
                            <tr>
                              <td colSpan={5} className="text-center py-12">
                                <div className="text-6xl mb-4">🏠</div>
                                <p className="text-xl text-gray-500 font-medium">No shelters available</p>
                                <p className="text-gray-400 mt-2">Add shelters to manage emergency housing</p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              </main>

              {/* Enhanced Assign Modal */}
              {showModal && selectedVolunteer && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
                  <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg transform transition-all duration-300 scale-100">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                        🎯
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Assign Task</h3>
                      <p className="text-gray-600">Coordinate volunteer response</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {selectedVolunteer.name?.charAt(0)?.toUpperCase() || "V"}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{selectedVolunteer.name}</div>
                          <div className="text-sm text-gray-600">{selectedVolunteer.shelter}</div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                        <div className="text-sm text-gray-600 mb-1">Task Assignment:</div>
                        <div className="font-medium text-gray-900">{selectedTask}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <button 
                        className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors duration-200 font-medium"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className={`flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium transform hover:scale-105 shadow-lg ${
                          assigning ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={confirmAssignTask}
                        disabled={assigning}
                      >
                        {assigning ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Assigning...
                          </span>
                        ) : (
                          "✅ Confirm Assignment"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
        )}

        {/* Manual Task Assignment Modal */}
        {showManualAssignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">📋</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Assign Manual Task</h3>
                  <p className="text-gray-600">To: {selectedVolunteer?.name}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter task title..."
                    value={manualTaskData.task}
                    onChange={(e) => setManualTaskData({...manualTaskData, task: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter task description..."
                    rows={3}
                    value={manualTaskData.description}
                    onChange={(e) => setManualTaskData({...manualTaskData, description: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={() => {
                    setShowManualAssignModal(false);
                    setManualTaskData({ volunteer: "", task: "", description: "" });
                  }}
                  disabled={assigning}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50"
                  onClick={assignManualTask}
                  disabled={assigning || !manualTaskData.task.trim()}
                >
                  {assigning ? "Assigning..." : "Assign Task"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default AdminDashboard;