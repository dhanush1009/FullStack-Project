import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userLocation: { type: String, required: true },
  time: { type: Date, default: Date.now },
  assignedVolunteers: { type: [String], default: [] }
});

export default mongoose.model("Emergency", emergencySchema);
