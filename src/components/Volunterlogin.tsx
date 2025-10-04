import React, { useEffect, useState } from "react";
import { LayoutDashboard, Users, Book, ClipboardList, Bell, Menu, X, Upload, FileText, CheckCircle } from "lucide-react";

// ProgressCard component with enhanced styling
const ProgressCard = ({ title, count, total, color, emoji, bgGradient }) => {
  const progressPercent = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="relative overflow-hidden rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-5`}></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">{emoji} {title}</h3>
          <div className="text-2xl font-bold text-gray-900">{count}/{total}</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ 
              width: `${progressPercent}%`, 
              background: `linear-gradient(90deg, ${color}, ${color}dd)` 
            }}
          ></div>
        </div>
        <div className="mt-2 text-right text-sm font-medium text-gray-600">{progressPercent}% Complete</div>
      </div>
    </div>
  );
};

const VolunteerSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [proofFiles, setProofFiles] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const email = localStorage.getItem("userEmail");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/tasks?email=${email}`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (email) fetchTasks();
  }, [email]);

  const completedCount = tasks.filter(t => t.status === "Completed").length;
  const pendingCount = tasks.length - completedCount;

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    setProofFiles(prev => ({ ...prev, [index]: file }));
  };

  const handleCompleteTask = async (e, taskId) => {
    e.preventDefault();
    const taskIndex = tasks.findIndex(t => t._id === taskId);
    const file = proofFiles[taskIndex];
    if (!file) return alert("Please select a proof file!");

    const formData = new FormData();
    formData.append("proof", file);
    formData.append("status", "Completed");

    try {
      await fetch(`http://localhost:5000/api/tasks/complete/${taskId}`, {
        method: 'POST',
        body: formData
      });
      alert("Task marked complete and proof uploaded!");
      fetchTasks(); // refresh tasks
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task.");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Enhanced Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="relative p-6 border-b border-gray-700">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="relative">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              🌟 Volunteer Hub
            </h2>
            <p className="text-sm text-gray-300 mt-1">Welcome back, {localStorage.getItem("username") || "Volunteer"}!</p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-700 transition-colors lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Enhanced Navigation */}
        <nav className="flex flex-col mt-4 px-4 space-y-2">
          <a href="/volunteer-login" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:shadow-lg hover:scale-105">
            <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-white/20 transition-colors">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <span className="font-medium">Dashboard</span>
          </a>
          
          <a href="/volunteer-map" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:shadow-lg hover:scale-105">
            <div className="p-2 rounded-lg bg-green-500/20 group-hover:bg-white/20 transition-colors">
              <Users className="h-4 w-4" />
            </div>
            <span className="font-medium">Join Volunteer</span>
          </a>
          
          <a href="/volunteers" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 transition-all duration-200 hover:shadow-lg hover:scale-105">
            <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-white/20 transition-colors">
              <Book className="h-4 w-4" />
            </div>
            <span className="font-medium">Available Shelters</span>
          </a>
          
          <a href="/volunteer-tasks" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-amber-600 hover:to-amber-700 transition-all duration-200 hover:shadow-lg hover:scale-105">
            <div className="p-2 rounded-lg bg-amber-500/20 group-hover:bg-white/20 transition-colors">
              <ClipboardList className="h-4 w-4" />
            </div>
            <span className="font-medium">My Tasks</span>
          </a>
          
          <a href="/" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 transition-all duration-200 hover:shadow-lg hover:scale-105 mt-auto">
            <div className="p-2 rounded-lg bg-red-500/20 group-hover:bg-white/20 transition-colors">
              <Bell className="h-4 w-4" />
            </div>
            <span className="font-medium">Logout</span>
          </a>
        </nav>

        {/* Quick Stats in Sidebar */}
        <div className="mt-8 p-4">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-gray-700">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Quick Overview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Tasks:</span>
                <span className="font-semibold">{tasks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Completed:</span>
                <span className="font-semibold text-green-400">{completedCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Pending:</span>
                <span className="font-semibold text-amber-400">{pendingCount}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                📝 Daily Progress Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6 space-y-6">
          {/* Progress Cards */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Today's Progress Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProgressCard 
                title="Tasks Completed" 
                count={completedCount} 
                total={tasks.length} 
                color="#10b981" 
                emoji="✅"
                bgGradient="from-green-400 to-green-600"
              />
              <ProgressCard 
                title="Tasks Pending" 
                count={pendingCount} 
                total={tasks.length} 
                color="#f59e0b" 
                emoji="⏳"
                bgGradient="from-amber-400 to-amber-600"
              />
            </div>
          </section>

          {/* My Tasks Section */}
          <section className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                🗂 My Active Tasks
              </h2>
            </div>
            
            <div className="p-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading tasks...</span>
                </div>
              ) : tasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <p className="text-gray-600 text-lg">No tasks assigned yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tasks.map((task, index) => (
                    <div key={index} className="group bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.task}</h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              <strong>Shelter:</strong> {task.shelterName || "Not assigned"}
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <strong>Assigned:</strong> {task.assignedAt || "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.status === "Completed" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {task.status === "Completed" ? "✅ Completed" : "⏳ Pending"}
                        </div>
                      </div>

                      {task.proofUrl && (
                        <div className="mb-4">
                          <a 
                            href={`http://localhost:5000/${task.proofUrl}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                          >
                            <FileText className="h-4 w-4" />
                            View Submitted Proof
                          </a>
                        </div>
                      )}

                      {task.shelterName && task.status !== "Completed" && (
                        <div className="border-t border-gray-200 pt-4">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Upload className="h-5 w-5 text-gray-400" />
                              <span className="text-sm font-medium text-gray-700">Upload Proof of Completion</span>
                            </div>
                            <input 
                              type="file" 
                              accept="image/*,application/pdf" 
                              onChange={(e) => handleFileChange(e, index)} 
                              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                            />
                            <button 
                              onClick={(e) => handleCompleteTask(e, task._id)}
                              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                            >
                              <CheckCircle className="h-5 w-5" />
                              Mark as Complete & Upload Proof
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Rules and Tips Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Volunteer Rules */}
            <section className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  📋 Volunteer Guidelines
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {[
                    "📅 Always check your assigned tasks daily",
                    "⏰ Maintain punctuality while reporting to shelters",
                    "🤝 Respect shelter staff and follow their instructions",
                    "⚠️ Report issues or emergencies to coordinators immediately",
                    "✅ Mark completed tasks in the dashboard",
                    "🧼 Maintain hygiene and safety standards",
                    "📌 Attend volunteer meetings and training sessions"
                  ].map((rule, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Important Tips */}
            <section className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  💡 Important Tips
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {[
                    "📊 Use the dashboard to track your task progress",
                    "🔔 Check notifications for updates on shelters and events",
                    "📞 Communicate promptly with coordinators",
                    "💪 Stay motivated and encourage other volunteers",
                    "🛡️ Follow all safety protocols during activities"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VolunteerSidebar;