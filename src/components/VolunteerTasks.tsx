import React, { useEffect, useState } from "react";
import BackButton from "./BackButton";

const VolunteerDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [proofFiles, setProofFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("userEmail"); // logged-in volunteer email

  // Fetch tasks from backend
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/tasks?email=${email}`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) fetchTasks();
  }, [email]);

  // Handle file selection
  const handleFileChange = (e, taskId) => {
    setProofFiles((prev) => ({ ...prev, [taskId]: e.target.files[0] }));
  };

  // Submit completion request
  const submitCompletion = async (taskId) => {
    const file = proofFiles[taskId];
    if (!window.confirm("Are you sure you want to submit this task completion?")) return;

    const formData = new FormData();
    formData.append("email", email);
    if (file) formData.append("proof", file);

    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}/submit`, {
        method: "POST",
        body: formData,
      });
      fetchTasks(); // refresh tasks
      setProofFiles((prev) => ({ ...prev, [taskId]: null }));
    } catch (err) {
      console.error("Error submitting completion:", err);
    }
  };

  // Count tasks by status
  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const pendingApprovalCount = tasks.filter((t) => t.status === "Pending Approval").length;
  const pendingCount = tasks.length - completedCount - pendingApprovalCount;

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

          {/* Pending Approval */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-3xl font-bold text-amber-600">{pendingApprovalCount}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                ⏳
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-red-600">{pendingCount}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                🔄
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
                  {task.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {task.description || "No description available"}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    📍 <span className="ml-2">{task.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    🗓 <span className="ml-2">Assigned: {new Date(task.assignedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {task.proof && (
                  <div className="mb-4">
                    <a
                      href={`http://localhost:5000/uploads/${task.proof}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      🔗 View Proof File
                    </a>
                  </div>
                )}

                {/* File Upload + Submit */}
                {task.status === "Pending" && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, task.id)}
                        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                                   file:rounded-lg file:border-0 file:text-sm file:font-medium 
                                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 
                                   transition-colors"
                      />
                      <button
                        onClick={() => submitCompletion(task.id)}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 
                                   hover:from-green-600 hover:to-green-700 text-white 
                                   font-medium py-3 px-4 rounded-xl transition-all duration-200 
                                   shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        ✅ Submit Completion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;
