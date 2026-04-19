import React, { useState } from 'react';

const EmergencyAlert = () => {
  const [formData, setFormData] = useState({
    victimName: '',
    victimPhone: '',
    victimEmail: '',
    emergencyType: 'medical',
    description: '',
    location: {
      lat: 11.5,
      lng: 79.5,
      address: 'Tamil Nadu, India'
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5001/api/emergency-alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ ${data.message}`);
        if (data.data?.assignedVolunteer) {
          setMessage(`✅ ${data.message}\n🚑 Volunteer ${data.data.assignedVolunteer.name} has been assigned!\n📞 Contact: ${data.data.assignedVolunteer.phone}\n📧 Email: ${data.data.assignedVolunteer.email}\n📍 Distance: ${data.data.assignedVolunteer.distance} km`);
        } else {
          setMessage(`✅ ${data.message}\n⏳ Alert is pending - waiting for available volunteers.`);
        }

        // Reset form
        setFormData({
          victimName: '',
          victimPhone: '',
          victimEmail: '',
          emergencyType: 'medical',
          description: '',
          location: {
            lat: 11.5,
            lng: 79.5,
            address: 'Tamil Nadu, India'
          }
        });
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Failed to send emergency alert. Please try again.');
      console.error('Emergency alert error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🚨</div>
        <h2 className="text-2xl font-bold text-red-600">Emergency Alert</h2>
        <p className="text-gray-600">Get immediate help from nearby volunteers</p>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          message.includes('✅')
            ? 'bg-green-100 text-green-800 border border-green-300'
            : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          <div className="whitespace-pre-line">{message}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            name="victimName"
            value={formData.victimName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            name="victimPhone"
            value={formData.victimPhone}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="victimEmail"
            value={formData.victimEmail}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Emergency Type *
          </label>
          <select
            name="emergencyType"
            value={formData.emergencyType}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="medical">Medical Emergency</option>
            <option value="fire">Fire</option>
            <option value="flood">Flood</option>
            <option value="earthquake">Earthquake</option>
            <option value="accident">Accident</option>
            <option value="security">Security Threat</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Describe your emergency situation..."
          />
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-center">
            <div className="text-yellow-600 mr-2">📍</div>
            <div className="text-sm text-yellow-800">
              <strong>Location:</strong> {formData.location.address}
              <br />
              <span className="text-xs">Coordinates: {formData.location.lat}, {formData.location.lng}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Sending Alert...
            </div>
          ) : (
            '🚨 Send Emergency Alert'
          )}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        * Required fields. Your location will be automatically detected.
      </div>
    </div>
  );
};

export default EmergencyAlert;
