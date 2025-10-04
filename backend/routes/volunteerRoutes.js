import express from "express";
import Volunteer from "../models/Volunteer.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, age, email, shelter } = req.body;

    if (!name || !age || !email || !shelter) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Optional: check if volunteer already registered by email
    const existing = await Volunteer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const volunteer = new Volunteer({ name, age, email, shelter });
    await volunteer.save();

    res.status(201).json({ message: "Volunteer registered successfully." });
  } catch (error) {
    console.error("Error saving volunteer:", error);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
