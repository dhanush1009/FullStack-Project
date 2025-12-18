import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb://localhost:27017/volunteersdb";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  shelter: { type: String, required: true },
  email: { type: String, required: true },
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

app.post("/api/volunteers", async (req, res) => {
  const { name, age, shelter, email } = req.body;

  if (!name || !age || !shelter || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const volunteer = new Volunteer({ name, age, shelter, email });
    await volunteer.save();
    res.status(201).json({ message: "Volunteer registered successfully." });
  } catch (error) {
    console.error("Error saving volunteer:", error);
    res.status(500).json({ message: "Server error." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
