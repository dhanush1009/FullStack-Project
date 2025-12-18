import React, { useState, useEffect } from "react";
import { 
  AlertTriangle, 
  Phone, 
  Mail, 
  MapPin, 
  Shield, 
  Clock, 
  Users, 
  Zap,
  CheckCircle,
  Camera,
  Battery,
  Wifi
} from "lucide-react";

const CallHelpFresh = () => {
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSendEmail = () => {
    if (!navigator.geolocation) {
      alert("⚠ Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const userLocation = `📍 Lat: ${lat.toFixed(5)}, Lon: ${lng.toFixed(5)}`;
        try {
          const response = await fetch(
            "http://localhost:5001/send-emergency-email",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userName: "User Name",
                userLocation,
                lat,
              }),
            }
          );

          if (response.ok) {
            alert("✅ Emergency email sent successfully!");
            // Emergency reported successfully - staying on current page
          } else {
            const data = await response.json().catch(() => ({} as any));
            alert(`❌ Failed to send emergency email${data?.error ? `: ${data.error}` : ""}`);
          }
        } catch (error) {
          alert("❌ Error sending email.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        alert("❌ Could not get your location.");
        console.error(error);
        setLoading(false);
      }
    );
  };

  const emergencyContacts = [
    { name: "Police", number: "100", icon: Shield, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Ambulance", number: "108", icon: Users, color: "text-red-600", bg: "bg-red-100" },
    { name: "Fire Department", number: "101", icon: Zap, color: "text-orange-600", bg: "bg-orange-100" },
    { name: "Women Helpline", number: "1091", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
    { name: "Disaster Management", number: "1078", icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-100" }
  ];

  const safetyTips = [
    { icon: Battery, text: "Keep your phone charged & carry a power bank" },
    { icon: MapPin, text: "Share location with family or friends" },
    { icon: Shield, text: "Stay in a safe, visible, and populated area" },
    { icon: Camera, text: "Take photos/videos for evidence if possible" },
    { icon: CheckCircle, text: "Avoid risky shortcuts or isolated places" },
    { icon: Wifi, text: "Stay connected to emergency services" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Animated Emergency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 animate-pulse opacity-50"></div>
        <div className="relative flex items-center justify-center">
          <div className="flex items-center gap-2 animate-bounce">
            <AlertTriangle className="text-yellow-300" size={24} />
            <span className="font-bold text-lg">EMERGENCY HELP PORTAL - ACT FAST & STAY SAFE</span>
            <AlertTriangle className="text-yellow-300" size={24} />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="h-full w-4 bg-yellow-400 opacity-30 animate-pulse"></div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">System Active</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={16} />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-red-600 font-medium">
              <AlertTriangle size={16} />
              <span>Emergency Response Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <Shield className="text-red-600" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Emergency Help & Safety Center
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get immediate assistance, send your location to our emergency response team, 
            and access life-saving safety resources when you need them most.
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Emergency Action Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-100">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white bg-opacity-20 rounded-full animate-pulse">
                  <AlertTriangle size={24} />
                </div>
                <h2 className="text-2xl font-bold">Immediate Emergency Response</h2>
              </div>
              <p className="text-red-100">Critical situation? Get help now with one click.</p>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-4 animate-bounce">
                  <Mail className="text-red-600" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Send Emergency Alert</h3>
                <p className="text-gray-600">
                  Instantly send your location and emergency details to our response team
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={20} />
                  What happens when you click:
                </h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Your exact GPS location is captured securely</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Emergency alert sent to response team</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Location data used only for this emergency</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Response team will coordinate assistance</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleSendEmail}
                disabled={loading}
                className={`w-full py-4 px-6 text-white font-bold text-lg rounded-2xl transition-all transform ${
                  loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:scale-105 shadow-xl hover:shadow-2xl"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending Emergency Alert...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Mail size={20} />
                    Send Emergency Alert Now
                    <Zap size={20} />
                  </span>
                )}
              </button>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800 text-center font-medium">
                  <Phone className="inline mr-1" size={12} />
                  Also call emergency services: 112 for immediate assistance
                </p>
              </div>
            </div>
          </div>

          {/* Safety Guidelines Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <div className="flex items-center gap-3">
                <Shield size={24} />
                <h2 className="text-2xl font-bold">Safety Guidelines</h2>
              </div>
              <p className="text-blue-100 mt-2">Essential safety tips for emergency situations</p>
            </div>

            <div className="p-8">
              <div className="grid gap-4 mb-8">
                {safetyTips.map((tip, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <tip.icon className="text-blue-600" size={20} />
                    </div>
                    <span className="text-gray-700 font-medium">{tip.text}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Shield className="text-green-600" size={20} />
                  Remember: Stay Calm & Stay Safe
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  In any emergency situation, your safety is the top priority. Follow these guidelines, 
                  stay in contact with authorities, and wait for professional help to arrive.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts Section removed as requested to keep only the SOS button */}
      </div>
    </div>
  );
};

export default CallHelpFresh;