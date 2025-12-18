import React, { useEffect, useState } from "react";
import Header from "@/components/Header";

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const storedVolunteers = JSON.parse(localStorage.getItem("volunteers")) || [];
    setVolunteers(storedVolunteers);
  }, []);

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('hero-emergency.jpg')" }}
    >
      {/* Overlay to lighten background */}
      <div className="absolute inset-0 bg-white bg-opacity-40"></div>

      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white shadow-md rounded-b-lg relative">
        <Header />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mt-6 mb-10 drop-shadow-md relative z-10 font-sans">
        📋 Registered Volunteers 🦸‍♂️🦸‍♀️
      </h1>

      {volunteers.length === 0 ? (
        <p className="text-center text-gray-800 text-lg italic mt-20 relative z-10 font-sans">
          ❌ No volunteers have registered yet.
        </p>
      ) : (
        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 relative z-10">
          {volunteers.map((volunteer, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              title={`Volunteer: ${volunteer.name}`}
            >
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-2 truncate font-sans">
                  🧑 {volunteer.name}
                </h2>
                <p className="text-gray-800 text-sm mb-1 font-sans">
                  <span className="font-semibold">🎂 Age:</span> {volunteer.age}
                </p>
                <p className="text-gray-800 text-sm break-words font-sans">
                  <span className="font-semibold">🏠 Shelter:</span> {volunteer.shelter}
                </p>
              </div>
              <div className="mt-4 text-right text-gray-700 text-xs select-none font-sans">
                🆔 #{index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VolunteerList;
