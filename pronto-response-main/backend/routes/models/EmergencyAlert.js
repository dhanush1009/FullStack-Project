import mongoose from "mongoose";

const emergencyAlertSchema = new mongoose.Schema({
  victimName: { type: String, required: true },
  victimPhone: { type: String, required: true },
  victimEmail: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true }
  },
  emergencyType: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer', default: null },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  createdAt: { type: Date, default: Date.now },
  assignedAt: { type: Date, default: null },
  completedAt: { type: Date, default: null },
  estimatedResponseTime: { type: Number, default: null }, // in minutes
  actualResponseTime: { type: Number, default: null }, // in minutes
  notes: { type: String, default: '' }
});

export default mongoose.model("EmergencyAlert", emergencyAlertSchema);
