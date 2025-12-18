import React from "react";
import { allDistrictsShelters } from "../data/allShelters";
import { MapPin, Phone, Mail, Navigation } from "lucide-react";

const ShelterList = () => {
  const allShelters = allDistrictsShelters.flatMap((district) =>
    district.shelters.map((shelter) => ({
      ...shelter,
      district: district.district,
    }))
  );

  const copyPhoneNumber = (phone: string) => {
    navigator.clipboard.writeText(phone);
    alert("📞 Phone number copied!");
  };

  const sendEmail = (email: string) => {
    window.open(`mailto:${email}?subject=Shelter Inquiry`);
  };

  const getDirections = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
  };

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🏠 Available Shelters Across Tamil Nadu
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We have <span className="font-bold text-blue-600">{allShelters.length} shelters</span> across{" "}
            <span className="font-bold text-blue-600">{allDistrictsShelters.length} districts</span> ready to provide
            safety and support during emergencies.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-blue-500">
            <div className="text-4xl font-bold text-blue-600">{allShelters.length}</div>
            <div className="text-gray-600 mt-2">Total Shelters</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-green-500">
            <div className="text-4xl font-bold text-green-600">{allDistrictsShelters.length}</div>
            <div className="text-gray-600 mt-2">Districts Covered</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-purple-500">
            <div className="text-4xl font-bold text-purple-600">
              {allShelters.reduce((sum, s) => sum + (s.capacity || 0), 0).toLocaleString()}
            </div>
            <div className="text-gray-600 mt-2">Total Capacity</div>
          </div>
        </div>

        {/* Shelters by District */}
        <div className="space-y-8">
          {allDistrictsShelters.map((district) => (
            <div key={district.district} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* District Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <MapPin className="h-6 w-6" />
                  {district.district}
                  <span className="ml-auto bg-white/20 px-4 py-1 rounded-full text-sm">
                    {district.shelters.length} {district.shelters.length === 1 ? "Shelter" : "Shelters"}
                  </span>
                </h3>
              </div>

              {/* Shelter Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {district.shelters.map((shelter) => (
                  <div
                    key={shelter.id}
                    className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    {/* Shelter Name */}
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-2">
                      <span className="text-blue-600">🏛️</span>
                      {shelter.name}
                    </h4>

                    {/* Address */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span>{shelter.address}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{shelter.phone}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4 text-purple-500 flex-shrink-0" />
                        <span className="truncate">{shelter.email}</span>
                      </div>

                      {shelter.capacity && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-orange-500">👥</span>
                          <span>Capacity: {shelter.capacity} people</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyPhoneNumber(shelter.phone)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        title="Copy Phone"
                      >
                        <Phone className="h-3 w-3" />
                        Copy
                      </button>
                      <button
                        onClick={() => sendEmail(shelter.email)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        title="Send Email"
                      >
                        <Mail className="h-3 w-3" />
                        Email
                      </button>
                      <button
                        onClick={() => getDirections(shelter.location.lat, shelter.location.lng)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                        title="Get Directions"
                      >
                        <Navigation className="h-3 w-3" />
                        Go
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">Need Help Finding a Shelter?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Use our interactive map to find the nearest shelter based on your current location
          </p>
          <a
            href="/find-shelter"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg"
          >
            🗺️ View Interactive Map
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShelterList;
