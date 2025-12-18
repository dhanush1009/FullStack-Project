import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: false },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  shelter: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  isAvailable: { type: Boolean, default: true },
  currentTask: { type: mongoose.Schema.Types.ObjectId, ref: 'EmergencyAlert', default: null },
  registeredAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now },
  tasks: { type: Array, default: [] }
});

export default mongoose.model("Volunteer", volunteerSchema);
