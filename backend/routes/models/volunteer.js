import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  shelter: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
});

export default mongoose.model("Volunteer", volunteerSchema);
