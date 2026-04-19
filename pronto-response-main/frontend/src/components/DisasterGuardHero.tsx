import React, { useEffect, useState } from "react";
import Header from "@/components/Header";

import { useNavigate } from "react-router-dom";  // <-- import useNavigate
import {
  AlertTriangle,
  BatteryCharging,
  MapPin,
  Phone,
  Home,
  UserCheck,
  CloudRain,
  Zap,
} from "lucide-react";

const tips = [
  { icon: AlertTriangle, text: "⚠️ Stay calm and listen to emergency broadcasts." },
  { icon: BatteryCharging, text: "🔋 Keep your mobile devices charged and have backup power." },
  { icon: MapPin, text: "🗺️ Know your evacuation routes and safe zones." },
  { icon: Phone, text: "📞 Have emergency contacts saved and accessible." },
  { icon: Home, text: "🧰 Prepare an emergency kit with essentials: water, food, medicines." },
  { icon: UserCheck, text: "👵 Check on neighbors, especially elderly and disabled persons." },
  { icon: CloudRain, text: "🌧️ Stay indoors during storms or floods, away from windows." },
  { icon: Zap, text: "⚡ Avoid using elevators during earthquakes or fires." },
];

const DisasterSafetySimple = () => {
  const [visible, setVisible] = useState([]);
  const navigate = useNavigate(); // <-- useNavigate instance

  useEffect(() => {
    tips.forEach((_, i) => setTimeout(() => setVisible(v => [...v, i]), i * 150));
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-16 bg-[#d6d5c9] text-gray-900"
      // #d6d5c9 is a nice light cement color
    >
      <div className="bg-white rounded-xl p-8 max-w-5xl w-full shadow-md">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Disaster Safety Precautions
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map(({ icon: Icon, text }, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center p-4 rounded-lg border border-gray-300 bg-white transition-opacity duration-500 ${
                visible.includes(idx) ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <Icon className="text-gray-700 w-10 h-10 mb-3" />
              <p className="text-center font-medium text-gray-800">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/get-prepared")}  // <-- navigation here
            className="px-8 py-3 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Get Prepared Now
          </button>
        </div>
          <Header />
      </div>
    </div>
  );
};

export default DisasterSafetySimple;
  