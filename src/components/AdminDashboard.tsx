      import React, { useState, useEffect } from "react";

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

        // modal/assign state
        const [assigning, setAssigning] = useState(false);
        const [showModal, setShowModal] = useState(false);
        const [selectedVolunteer, setSelectedVolunteer] = useState(null);
        const [selectedTask, setSelectedTask] = useState("");
        const [selectedEmergency, setSelectedEmergency] = useState(null);

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

        /* -------------------- Fetching -------------------- */
        const fetchEmergencies = async () => {
          try {
            const res = await fetch("http://localhost:5000/emergencies");
            const data = await res.json();
            const formatted = Array.isArray(data) ? data.reverse() : [];
            setEmergencies(formatted);
          } catch (err) {
            console.error("fetchEmergencies:", err);
          }
        };

        const fetchVolunteers = async () => {
          try {
            const res = await fetch("http://localhost:5000/api/volunteers");
            const data = await res.json();
            const formatted = Array.isArray(data) ? data : [];
            setVolunteers(formatted);
          } catch (err) {
            console.error("fetchVolunteers:", err);
          }
        };

        useEffect(() => {
          fetchEmergencies();
          fetchVolunteers();
          const interval = setInterval(fetchEmergencies, 5000); // refresh emergencies
          return () => clearInterval(interval);
        }, []);

        /* -------------------- Volunteer Actions -------------------- */
        const deleteVolunteer = async (id) => {
          if (!window.confirm("Are you sure you want to delete this volunteer?")) return;
          try {
            const res = await fetch(`http://localhost:5000/api/volunteers/${id}`, { method: "DELETE" });
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
          if (!selectedVolunteer || !selectedTask) return;
          setAssigning(true);
          try {
            const isDemoVolunteers = volunteers.length === 0;
            const isDemoEmergencies = emergencies.length === 0;

            // If running in demo mode (no backend data), just simulate success
            if (isDemoVolunteers) {
              await new Promise(r => setTimeout(r, 600));
              alert("✅ Task assigned! (demo mode)");
              setAssigning(false);
              setShowModal(false);
              setSelectedVolunteer(null);
              setSelectedTask("");
              setSelectedEmergency(null);
              return;
            }

            const res1 = await fetch(`http://localhost:5000/api/volunteers/${selectedVolunteer._id}/assign-task`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ task: selectedTask }),
            });
            const data1 = await res1.json();
            if (!res1.ok) {
              alert("❌ " + (data1.msg || "Failed to assign"));
              setAssigning(false);
              return;
            }

            if (selectedEmergency) {
              await fetch(`http://localhost:5000/emergencies/${selectedEmergency}/assign-volunteer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ volunteerName: data1.volunteer.name }),
              });
              await fetch(`http://localhost:5000/api/send-confirmation`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: data1.volunteer.name,
                  email: data1.volunteer.email,
                  shelter: data1.volunteer.shelter,
                }),
              });
            }

            alert("✅ Task assigned!");
            await fetchVolunteers();
            await fetchEmergencies();
          } catch (err) {
            console.error("confirmAssignTask:", err);
            alert("❌ Failed to assign task");
          } finally {
            setAssigning(false);
            setShowModal(false);
            setSelectedVolunteer(null);
            setSelectedTask("");
            setSelectedEmergency(null);
          }
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

        const emergenciesToShow = emergencies.length > 0 ? emergencies : demoEmergencies;
        const volunteersToUse = volunteers.length > 0 ? volunteers : demoVolunteers;

        const stats = [
          { id: 1, title: "Active Alerts", value: emergenciesToShow.length, icon: "🚨", bg: "from-red-500 to-red-600", color: "text-red-50" },
          { id: 2, title: "Safe Zones", value: districtsData.length, icon: "🛡️", bg: "from-green-500 to-green-600", color: "text-green-50" },
          { id: 3, title: "Volunteers", value: volunteersToUse.length, icon: "👥", bg: "from-blue-500 to-blue-600", color: "text-blue-50" },
          { id: 4, title: "Shelters", value: shelters.length, icon: "🏠", bg: "from-purple-500 to-purple-600", color: "text-purple-50" },
        ];

        const tabConfig = {
          dashboard: { icon: "📊", label: "Dashboard" },
          volunteers: { icon: "👥", label: "Volunteers" },
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
                                  <p className="font-bold text-gray-900 text-lg">{e.userName}</p>
                                </div>
                                <p className="text-gray-600 mb-1">📍 {e.userLocation}</p>
                                <p className="text-gray-400 text-sm">⏰ {new Date(e.time).toLocaleString()}</p>
                              </div>
                              <div className="text-3xl animate-bounce">🚨</div>
                            </div>

                            <div className="border-t pt-4">
                              <div className="flex items-center gap-3 mb-3">
                                <select
                                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  defaultValue=""
                                  onChange={ev => {
                                    if (ev.target.value) {
                                      openAssignModal(ev.target.value, `Help ${e.userName} at ${e.userLocation}`, e._id);
                                      ev.target.value = "";
                                    }
                                  }}
                                >
                                  <option value="">🎯 Assign Volunteer</option>
                                  {volunteersToUse.map(v => (
                                    <option key={v._id} value={v._id}>
                                      👤 {v.name} ({v.shelter})
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {e.assignedVolunteers?.length > 0 ? (
                                <div className="bg-green-50 rounded-lg p-3">
                                  <div className="text-sm text-green-700 font-medium mb-1">✅ Volunteers Assigned:</div>
                                  <div className="text-sm text-green-600">
                                    {e.assignedVolunteers
                                      .filter(name => volunteersToUse.some(v => v.name === name))
                                      .join(", ")}
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-yellow-50 rounded-lg p-3">
                                  <div className="text-sm text-yellow-700">⏳ Awaiting volunteer assignment</div>
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
                                <button
                                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                  onClick={() => deleteVolunteer(v._id)}
                                >
                                  🗑️ Delete
                                </button>
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
            </main>
          </div>
        );
      };

      export default AdminDashboard;