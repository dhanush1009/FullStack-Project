import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { toast } from "sonner"; // notifications

const districts = [
  {
    district: "Chennai",
    shelters: [
      { id: 1, name: "Chennai Corporation Shelter", address: "123 Anna Salai, Chennai", phone: "+91 7339486437", urgency: "High", tasks: ["Clear debris", "Distribute relief kits", "Assist medical team"] },
      { id: 2, name: "Red Cross Relief Center", address: "45 Gandhi Nagar, Chennai", phone: "+91 7339486437", urgency: "Medium", tasks: ["Help at food counters", "Transport relief materials"] },
      { id: 3, name: "Govt. School Shelter", address: "K.K. Nagar, Chennai", phone: "+91 7339486437", urgency: "High", tasks: ["Set up temporary beds", "Support elderly evacuees"] },
      { id: 4, name: "Community Hall Shelter", address: "Perambur, Chennai", phone: "+91 7339486437", urgency: "Low", tasks: ["Organize donation supplies", "Assist in cooking food"] },
      { id: 5, name: "College Auditorium Shelter", address: "T. Nagar, Chennai", phone: "+91 7339486437", urgency: "Medium", tasks: ["Coordinate transport", "Guide new arrivals"] },
    ],
  },
  {
    district: "Cuddalore",
    shelters: [
      { id: 6, name: "Cuddalore Relief Camp 1", address: "Silver Beach Road, Cuddalore", phone: "+91 7339486437", urgency: "High", tasks: ["Evacuate residents", "Distribute food packets"] },
      { id: 7, name: "Cuddalore Relief Camp 2", address: "Old Town Hall, Cuddalore", phone: "+91 7339486437", urgency: "Medium", tasks: ["Set up beds", "Assist children"] },
      { id: 8, name: "Cuddalore Govt. School Shelter", address: "Main Road, Cuddalore", phone: "+91 7339486437", urgency: "Low", tasks: ["Organize blankets", "Cook meals"] },
      { id: 9, name: "Seashore Relief Camp", address: "Beach Road, Cuddalore", phone: "+91 7339486437", urgency: "High", tasks: ["Evacuate coastal families", "First aid support"] },
      { id: 10, name: "Cyclone Relief Center", address: "Port Area, Cuddalore", phone: "+91 7339486437", urgency: "Medium", tasks: ["Unload supplies", "Assist elderly"] },
    ],
  },
  {
    district: "Nagapattinam",
    shelters: [
      { id: 11, name: "Nagapattinam Relief Camp 1", address: "Harbor Road, Nagapattinam", phone: "+91 7339486437", urgency: "High", tasks: ["Assist rescue boats", "Distribute water"] },
      { id: 12, name: "Nagapattinam Relief Camp 2", address: "Town Hall, Nagapattinam", phone: "+91 7339486437", urgency: "Medium", tasks: ["Help transport goods", "Support elderly"] },
      { id: 13, name: "Govt. School Shelter", address: "Main Road, Nagapattinam", phone: "+91 7339486437", urgency: "High", tasks: ["Set up beds", "Assist medical team"] },
      { id: 14, name: "Fishing Village Relief", address: "Coastline, Nagapattinam", phone: "+91 7339486437", urgency: "Medium", tasks: ["Deliver food kits", "Organize shelter"] },
      { id: 15, name: "Cyclone Shelter", address: "Seashore Road, Nagapattinam", phone: "+91 7339486437", urgency: "Low", tasks: ["Help in cooking", "Manage donations"] },
    ],
  },
  {
    district: "Thoothukudi",
    shelters: [
      { id: 16, name: "Thoothukudi Relief Camp 1", address: "Beach Road, Thoothukudi", phone: "+91 7339486437", urgency: "High", tasks: ["Evacuate residents", "Rescue operations"] },
      { id: 17, name: "Thoothukudi Relief Camp 2", address: "Old Harbor Area, Thoothukudi", phone: "+91 7339486437", urgency: "Medium", tasks: ["Distribute food", "Organize beds"] },
      { id: 18, name: "Govt. College Shelter", address: "Main Street, Thoothukudi", phone: "+91 7339486437", urgency: "Low", tasks: ["Help with cooking", "Arrange donations"] },
      { id: 19, name: "Fishing Community Relief", address: "Seashore, Thoothukudi", phone: "+91 7339486437", urgency: "High", tasks: ["Assist fishing families", "Distribute relief kits"] },
      { id: 20, name: "Cyclone Safe Shelter", address: "Coastline Road, Thoothukudi", phone: "+91 7339486437", urgency: "Medium", tasks: ["Unload supplies", "First aid support"] },
    ],
  },
  {
    district: "Kanyakumari",
    shelters: [
      { id: 21, name: "Kanyakumari Relief Camp 1", address: "Near Beach, Kanyakumari", phone: "+91 7339486437", urgency: "High", tasks: ["Evacuate coastal residents", "Distribute kits"] },
      { id: 22, name: "Kanyakumari Relief Camp 2", address: "Town Hall, Kanyakumari", phone: "+91 7339486437", urgency: "Medium", tasks: ["Assist elderly", "Guide arrivals"] },
      { id: 23, name: "Govt. School Shelter", address: "Main Road, Kanyakumari", phone: "+91 7339486437", urgency: "Low", tasks: ["Organize beds", "Help cooking"] },
      { id: 24, name: "Cyclone Shelter", address: "Seashore Road, Kanyakumari", phone: "+91 7339486437", urgency: "High", tasks: ["Assist rescue teams", "Manage donations"] },
      { id: 25, name: "Fishing Village Relief", address: "Harbor Side, Kanyakumari", phone: "+91 7339486437", urgency: "Medium", tasks: ["Deliver supplies", "Assist children"] },
    ],
  },
];

const urgencyColors = {
  High: "bg-red-600",
  Medium: "bg-yellow-500",
  Low: "bg-green-600",
};

export default function Volunteers() {
  const [interestedList, setInterestedList] = useState([]);
  const navigate = useNavigate();

  const handleInterest = (shelter) => {
    if (!interestedList.includes(shelter.id)) {
      setInterestedList([...interestedList, shelter.id]);
      toast.success(`✅ You have shown interest in helping at ${shelter.name}`);
      navigate("/volunteer-map");
    } else {
      toast.warning(`⚠ You already expressed interest for ${shelter.name}`);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-red-700">
        🚨 Volunteer Assignments - Tamil Nadu
      </h1>
      {districts.map((districtData, idx) => (
        <div key={idx} className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-5">
            📍 {districtData.district}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districtData.shelters.map((shelter) => (
              <div
                key={shelter.id}
                className="bg-white shadow-lg rounded-lg p-6 border-t-4 transition hover:shadow-2xl hover:scale-[1.02]"
                style={{
                  borderTopColor:
                    shelter.urgency === "High"
                      ? "#dc2626"
                      : shelter.urgency === "Medium"
                      ? "#f59e0b"
                      : "#16a34a",
                }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-gray-800">
                    {shelter.name}
                  </h3>
                  <span
                    className={`text-white text-sm px-3 py-1 rounded-full ${urgencyColors[shelter.urgency]}`}
                  >
                    {shelter.urgency} Urgency
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{shelter.address}</p>
                <p className="text-gray-600 mb-4">📞 {shelter.phone}</p>
                <ul className="list-disc pl-5 text-gray-700 mb-4">
                  {shelter.tasks.map((task, i) => (
                    <li
                      key={i}
                      className={
                        shelter.urgency === "High" ? "font-semibold text-red-700" : ""
                      }
                    >
                      {task}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleInterest(shelter)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  🙋 I’m Interested
                </button>
              </div>
            ))}
          </div>
        </div>
       
      ))}
    </div>
  );
}
