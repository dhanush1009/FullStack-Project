import React from "react";
import { Link } from "react-router-dom";
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

// Images URLs (You can replace these with your own)
const tipImages = {
  AlertTriangle: "https://cdn-icons-png.flaticon.com/512/564/564619.png",
  BatteryCharging:
    "https://cdn-icons-png.flaticon.com/512/1680/1680480.png",
  MapPin: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  Phone: "https://cdn-icons-png.flaticon.com/512/597/597177.png",
  Home: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
  UserCheck: "https://cdn-icons-png.flaticon.com/512/3079/3079197.png",
  CloudRain: "https://cdn-icons-png.flaticon.com/512/414/414974.png",
  Zap: "https://cdn-icons-png.flaticon.com/512/2921/2921829.png",
};

const detailedTips = [
  {
    icon: AlertTriangle,
    title: "⚠️ Stay Calm & Alert",
    description:
      "During any disaster, keep calm and follow instructions from official emergency broadcasts and local authorities. 🧘‍♂️📻",
    imageKey: "AlertTriangle",
  },
  {
    icon: BatteryCharging,
    title: "🔋 Keep Devices Charged",
    description:
      "Ensure your mobile phones, power banks, and radios are fully charged. Carry backup batteries or solar chargers if possible. 🔌☀️",
    imageKey: "BatteryCharging",
  },
  {
    icon: MapPin,
    title: "🗺️ Know Your Evacuation Routes",
    description:
      "Familiarize yourself with safe routes and evacuation points in your area to quickly leave if necessary. 🏃‍♀️🏃‍♂️",
    imageKey: "MapPin",
  },
  {
    icon: Phone,
    title: "📞 Save Emergency Contacts",
    description:
      "Keep a list of important numbers like local emergency services, hospitals, and family members for quick access. 📱📇",
    imageKey: "Phone",
  },
  {
    icon: Home,
    title: "🏠 Prepare an Emergency Kit",
    description:
      "Stock essentials like drinking water, non-perishable food, first aid supplies, flashlights, and important documents. 🎒💧🍫",
    imageKey: "Home",
  },
  {
    icon: UserCheck,
    title: "🤝 Help Vulnerable People",
    description:
      "Check on elderly, disabled, or children neighbors and ensure they have support during emergencies. ❤️👵👶",
    imageKey: "UserCheck",
  },
  {
    icon: CloudRain,
    title: "🌧️ Stay Indoors During Storms",
    description:
      "Avoid going outside during heavy storms or floods to stay safe from debris, lightning, and fast water. 🏡⚡🌊",
    imageKey: "CloudRain",
  },
  {
    icon: Zap,
    title: "⚡ Avoid Using Elevators",
    description:
      "During earthquakes or fires, use stairs instead of elevators to prevent getting trapped. 🚶‍♂️🚶‍♀️",
    imageKey: "Zap",
  },
];

const faqs = [
  {
    question: "❓ What should be included in an emergency kit?",
    answer:
      "Water (one gallon per person per day), non-perishable food, flashlight, batteries, first aid supplies, medications, important documents, cash, and a portable phone charger. 🎒💡💊",
  },
  {
    question: "❓ How often should I update my emergency contacts?",
    answer:
      "Review and update your emergency contacts every 6 months or whenever there is a change in contact information. 📅📞",
  },
  {
    question: "❓ How can I stay informed during disasters?",
    answer:
      "Use multiple sources such as radio, official government apps, weather alerts, and local news channels to stay updated. 📻📲📰",
  },
];

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 text-gray-900 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-800">
          🛡️ Disaster Safety — Learn More
        </h1>

        {/* Detailed Tips Section with Images */}
        <div className="grid gap-12 md:grid-cols-2 mb-16">
          {detailedTips.map(({ icon: Icon, title, description, imageKey }, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 flex gap-6 items-center shadow-md animate-fadeIn"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <img
                src={tipImages[imageKey]}
                alt={title}
                className="w-20 h-20 rounded-xl object-contain flex-shrink-0"
                loading="lazy"
              />
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-gray-800 flex items-center gap-2">
                  <Icon className="text-gray-600 w-6 h-6" />
                  {title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* General Preparedness Overview */}
        <section className="mb-16 px-6 py-10 bg-white rounded-3xl shadow-md max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            📝 General Disaster Preparedness Tips
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
            Preparing ahead can save lives. Make a family communication plan, learn basic first aid, keep important documents accessible, and stay aware of local risks. Regularly practice drills at home and in your community to ensure everyone knows what to do. 👨‍👩‍👧‍👦🩹📋
          </p>
        </section>

        {/* FAQ Section */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            ❓ Frequently Asked Questions
          </h2>
          <dl className="space-y-6">
            {faqs.map(({ question, answer }, idx) => (
              <div
                key={idx}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md animate-fadeIn"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <dt className="text-xl font-semibold text-gray-900 mb-2">
                  {question}
                </dt>
                <dd className="text-gray-700 leading-relaxed">{answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-center text-gray-600 italic text-sm max-w-md mx-auto">
            🛡️ Staying informed and prepared reduces panic and increases your chances of safety.
          </p>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            to="/index"
            className="inline-block bg-gray-800 hover:bg-gray-900 px-12 py-4 rounded-full text-xl font-bold text-white shadow-lg transition focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50 mr-4"
          >
            🏠 Back to Home
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default LearnMore;
