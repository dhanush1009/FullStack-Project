// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import twilio from "twilio";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import fetch from "node-fetch";
import net from "net";
import fs from "fs";
// Simple shelter lookup function for coordinates
const getShelterById = (id) => {
  const shelters = [
    { id: 12, name: "Trichy Corporation Shelter", location: { lat: 10.7905, lng: 78.7047 } },
    { id: 13, name: "Rock Fort Relief Center", location: { lat: 10.8155, lng: 78.6900 } },
    { id: 14, name: "Salem Corporation Shelter", location: { lat: 11.6643, lng: 78.1460 } },
    { id: 15, name: "Govt. Hospital Relief Center", location: { lat: 11.6532, lng: 78.1588 } },
    { id: 16, name: "Tirunelveli Corporation Shelter", location: { lat: 8.7139, lng: 77.7567 } },
    { id: 17, name: "Govt. College Shelter", location: { lat: 8.7289, lng: 77.7456 } },
    { id: 18, name: "Cuddalore Relief Camp 1", location: { lat: 11.7361, lng: 79.7686 } },
    { id: 19, name: "Cuddalore Relief Camp 2", location: { lat: 11.746, lng: 79.764 } },
    { id: 20, name: "Cyclone Relief Center", location: { lat: 11.735, lng: 79.765 } },
    { id: 21, name: "Nagapattinam Relief Camp 1", location: { lat: 10.763, lng: 79.843 } },
    { id: 22, name: "Nagapattinam Relief Camp 2", location: { lat: 10.765, lng: 79.84 } },
    { id: 23, name: "Cyclone Shelter", location: { lat: 10.758, lng: 79.842 } },
    { id: 24, name: "Thoothukudi Relief Camp 1", location: { lat: 8.805, lng: 78.15 } },
    { id: 25, name: "Thoothukudi Relief Camp 2", location: { lat: 8.81, lng: 78.145 } },
    { id: 26, name: "Kanyakumari Relief Camp 1", location: { lat: 8.0883, lng: 77.5385 } },
    { id: 27, name: "Kanyakumari Relief Camp 2", location: { lat: 8.09, lng: 77.54 } },
    { id: 28, name: "Vellore Fort Shelter", location: { lat: 12.9165, lng: 79.1325 } },
    { id: 29, name: "CMC Hospital Relief Center", location: { lat: 12.9259, lng: 79.1364 } },
    { id: 30, name: "Erode Corporation Shelter", location: { lat: 11.3410, lng: 77.7172 } },
    { id: 31, name: "Govt. College Shelter", location: { lat: 11.3524, lng: 77.7268 } },
    { id: 32, name: "Tiruppur Corporation Shelter", location: { lat: 11.1085, lng: 77.3411 } },
    { id: 33, name: "Textile Park Relief Center", location: { lat: 11.0975, lng: 77.3398 } },
    { id: 34, name: "Thanjavur Palace Shelter", location: { lat: 10.7870, lng: 79.1378 } },
    { id: 35, name: "Govt. Medical College Shelter", location: { lat: 10.7905, lng: 79.1378 } },
    { id: 36, name: "Dindigul Corporation Shelter", location: { lat: 10.3673, lng: 77.9803 } },
    { id: 37, name: "Rock Fort Relief Center", location: { lat: 10.3624, lng: 77.9734 } },
    { id: 38, name: "Karur Corporation Shelter", location: { lat: 10.9601, lng: 78.0766 } },
    { id: 39, name: "Ramanathapuram Relief Center", location: { lat: 9.3647, lng: 78.8378 } },
    { id: 40, name: "Coastal Shelter", location: { lat: 9.3712, lng: 78.8456 } },
    { id: 41, name: "Virudhunagar Corporation Shelter", location: { lat: 9.5810, lng: 77.9624 } },
    { id: 42, name: "Pudukkottai Palace Shelter", location: { lat: 10.3833, lng: 78.8000 } },
    { id: 43, name: "Sivaganga Relief Center", location: { lat: 9.8433, lng: 78.4809 } },
    { id: 44, name: "Theni Corporation Shelter", location: { lat: 10.0104, lng: 77.4776 } },
    { id: 45, name: "Namakkal Fort Shelter", location: { lat: 11.2189, lng: 78.1677 } },
    { id: 46, name: "Dharmapuri Corporation Shelter", location: { lat: 12.1211, lng: 78.1582 } },
    { id: 47, name: "Krishnagiri Corporation Shelter", location: { lat: 12.5186, lng: 78.2137 } },
    { id: 48, name: "Ariyalur Relief Center", location: { lat: 11.1401, lng: 79.0782 } },
    { id: 49, name: "Perambalur Shelter", location: { lat: 11.2324, lng: 78.8800 } },
    { id: 50, name: "Ooty Hill Station Shelter", location: { lat: 11.4102, lng: 76.6950 } },
    { id: 51, name: "Coonoor Relief Center", location: { lat: 11.3524, lng: 76.7963 } },
    { id: 52, name: "Tiruvannamalai Temple Shelter", location: { lat: 12.2253, lng: 79.0747 } },
    { id: 53, name: "Viluppuram Corporation Shelter", location: { lat: 11.9401, lng: 79.4861 } },
    { id: 54, name: "Kallakurichi Relief Center", location: { lat: 11.7390, lng: 78.9597 } },
    { id: 55, name: "Tirupathur Shelter", location: { lat: 12.4961, lng: 78.5730 } },
    { id: 56, name: "Ranipet Corporation Shelter", location: { lat: 12.9249, lng: 79.3308 } },
    { id: 57, name: "Tenkasi Relief Center", location: { lat: 8.9579, lng: 77.3152 } },
    { id: 58, name: "Tirupattur Shelter", location: { lat: 12.4961, lng: 78.5730 } },
    { id: 59, name: "Chengalpattu Corporation Shelter", location: { lat: 12.6922, lng: 79.9768 } },
    { id: 60, name: "Mahabalipuram Relief Center", location: { lat: 12.6269, lng: 80.1932 } },
    { id: 61, name: "Kanchipuram Temple Shelter", location: { lat: 12.8342, lng: 79.7036 } },
    { id: 62, name: "Tiruvallur Corporation Shelter", location: { lat: 13.1434, lng: 79.9098 } },
  ];

  return shelters.find(s => s.id.toString() === id.toString());
};

import { v4 as uuidv4 } from "uuid";
import { createServer } from "http";
import { Server } from "socket.io";
import User from "./userModel.js";
import emergencyRoutes, { setTransporter, setTwilioClient } from "./routes/emergencyRoutes.js";
import Volunteer from "./routes/models/volunteer.js";
import EmergencyAlert from "./routes/models/EmergencyAlert.js";
import Emergency from "./routes/models/Emergency.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.resolve('./backend/uploads')));

// --- MongoDB connection ---
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://sdhanush1009_db_user:Dhanush%402005@cluster0.9f0wcxu.mongodb.net/Disaster-Management?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Atlas connected successfully!");
    console.log("📊 Database: Disaster-Management");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("💡 Check: 1) Password is correct, 2) IP whitelist allows access");
  });

// --- Nodemailer transporter (FIXED CONFIGURATION) ---
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || EMAIL_USER;

// IMPORTANT: Use service: 'gmail' for Gmail accounts
const transporter = nodemailer.createTransport({
  service: 'gmail', // This automatically sets correct host and port
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email configuration error:", error.message);
    console.error("⚠️  Please check:");
    console.error("   1. EMAIL_USER is set correctly in .env");
    console.error("   2. EMAIL_PASS is your App Password (not regular password)");
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

// --- Twilio client ---
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

let client;
if (twilioAccountSid && twilioAuthToken) {
  client = twilio(twilioAccountSid, twilioAuthToken);
  console.log("✅ Twilio SMS configured");
} else {
  console.log("⚠️ Twilio credentials not configured - SMS features disabled");
  client = null;
}
// Set transporter and Twilio client for emergency routes
setTransporter(transporter);
if (client) {
  setTwilioClient(client);
}
// --- Multer setup for file uploads ---
const uploadsDir = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// --- Volunteer schema ---
// REMOVED - Now using the model from routes/models/volunteer.js

// --- Emergency schema ---
// REMOVED - Now using EmergencyAlert model from routes/models/EmergencyAlert.js

// --- Signup API ---
app.post("/api/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    console.log("=" .repeat(50));
    console.log(`📝 NEW SIGNUP REQUEST`);
    console.log(`👤 Name: ${name}`);
    console.log(`📧 Email: ${email}`);
    console.log(`🎭 Role: ${role}`);
    console.log(`🔗 MongoDB Status:`, mongoose.connection.readyState === 1 ? "✅ Connected" : "❌ Disconnected");
    console.log("=" .repeat(50));

    // Validate required fields
    if (!name || !email || !password || !role) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ msg: "All fields (name, email, password, role) are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("❌ Invalid email format");
      return res.status(400).json({ msg: "Please enter a valid email address" });
    }

    // Validate password strength
    if (password.length < 6) {
      console.log("❌ Password too short");
      return res.status(400).json({ msg: "Password must be at least 6 characters long" });
    }

    // Validate role
    if (!["user", "volunteer", "admin"].includes(role)) {
      console.log("❌ Invalid role");
      return res.status(400).json({ msg: "Invalid role selected" });
    }

    // Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      console.log(`❌ User already exists: ${email}`);
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password and create user
    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log("📦 Creating user object...");
    const user = new User({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      password: hashedPassword, 
      role 
    });
    
    console.log("💾 Saving to MongoDB Atlas...");
    await user.save();
    console.log(`✅ User saved to database!`);
    console.log(`📊 User ID: ${user._id}`);
    console.log(`📧 Email: ${user.email}`);
    console.log(`🎭 Role: ${user.role}`);
    console.log(`🗄️  Collection: users`);
    console.log(`🌍 Database: ${mongoose.connection.db.databaseName}`);
    console.log("=" .repeat(50));
    
    res.status(201).json({ 
      msg: "Account created successfully! You can now log in.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("=" .repeat(50));
    console.error("❌ SIGNUP ERROR:");
    console.error("Error message:", err.message);
    console.error("Error code:", err.code);
    console.error("Full error:", err);
    console.error("=" .repeat(50));
    
    // Handle duplicate key error (in case unique constraint fails)
    if (err.code === 11000) {
      return res.status(400).json({ msg: "User already exists" });
    }
    
    res.status(500).json({ msg: "Server error during signup. Please try again." });
  }
});

// --- Login API ---
app.post("/api/login", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (email === "aravinthl266@gmail.com" && password === "Arvind@l123") {
      if (role !== "admin") return res.status(403).json({ msg: "You are not admin" });
      return res.status(200).json({ msg: "Admin login successful", name: "Admin", role: "admin" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });
    if (user.role !== role) return res.status(403).json({ msg: `You are not a ${role}` });

    res.status(200).json({ 
      msg: "Login successful", 
      name: user.name, 
      role: user.role,
      email: user.email,
      userId: user._id
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// --- Volunteer APIs ---
app.post("/api/volunteers", async (req, res) => {
  const { name, age, shelter, email } = req.body;
  if (!name || !shelter) return res.status(400).json({ msg: "Name and shelter required" });

  try {
    // Get shelter coordinates from shelter data
    const shelterData = getShelterById(shelter);
    if (!shelterData) {
      return res.status(400).json({ msg: "Invalid shelter selected" });
    }

    const volunteer = new Volunteer({
      name,
      age: age ? Number(age) : undefined,
      shelter,
      email,
      coordinates: {
        lat: shelterData.location.lat,
        lng: shelterData.location.lng
      }
    });
    await volunteer.save();
    console.log(`✅ Volunteer created: ${name} at shelter: ${shelterData.name} with coordinates: ${shelterData.location.lat}, ${shelterData.location.lng}`);

    // Emit real-time event for new volunteer
    io.emit('volunteerCreated', {
      id: volunteer._id,
      name: volunteer.name,
      email: volunteer.email,
      shelter: shelterData.name,
      age: volunteer.age,
      coordinates: volunteer.coordinates,
      createdAt: volunteer.createdAt
    });

    res.status(201).json({ msg: "Volunteer saved", volunteer });
  } catch (err) {
    console.error("❌ Error creating volunteer:", err);
    res.status(500).json({ msg: "Failed to save volunteer" });
  }
});

app.get("/api/volunteers", async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });

    const formatted = volunteers.map((vol) => {
      const volObj = vol.toObject();
      if (Array.isArray(volObj.tasks)) {
        volObj.tasks = volObj.tasks.map((task) => {
          if (task && typeof task === "object") {
            return {
              ...task,
              proofUrl: task.proof ? `/uploads/${task.proof}` : null
            };
          }
          return task;
        });
      }
      return volObj;
    });

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching volunteers", err);
    res.status(500).json({ msg: "Failed to fetch volunteers" });
  }
});

app.get("/api/volunteers/email/:email", async (req, res) => {
  try {
    const volunteer = await Volunteer.findOne({ email: req.params.email });
    if (!volunteer) return res.status(404).json({ msg: "Volunteer not found" });
    res.json(volunteer);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch volunteer" });
  }
});

app.delete("/api/volunteers/:id", async (req, res) => {
  try {
    const deleted = await Volunteer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Volunteer not found" });
    res.status(200).json({ msg: "Volunteer deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete volunteer" });
  }
});

// --- Assign task to volunteer ---
app.post("/api/volunteers/:id/assign-task", async (req, res) => {
  const { task, description, assignedByName, assignedByEmail } = req.body;

  if (!task) return res.status(400).json({ msg: "Task is required" });
  if (!assignedByEmail) return res.status(400).json({ msg: "Admin email is required" });

  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.status(404).json({ msg: "Volunteer not found" });

    const exists = volunteer.tasks.find((t) => t.task === task);
    if (exists) return res.status(400).json({ msg: "Task already assigned" });

    const newTask = {
      id: uuidv4(),
      task,
      description,
      assignedAt: new Date(),
      completed: false,
      status: "Pending",
      location: volunteer?.shelter || null,
      shelter: volunteer?.shelter || null,
      victimName: null,
      victimPhone: null,
      emergencyType: null,
      estimatedResponseTime: null,
      emergencyId: null,
      isEmergencyTask: false,
      proof: null,
      completionRequestedAt: null,
      approvedAt: null,
      rejectionReason: null,
      assignedBy: {
        name: assignedByName || "Admin",
        email: assignedByEmail
      }
    };

    await Volunteer.findByIdAndUpdate(
      req.params.id,
      {
        $push: { tasks: newTask },
        $set: { lastActive: new Date(), isAvailable: false, currentTask: newTask.id }
      },
      { runValidators: false }
    );

    // Re-fetch volunteer to ensure latest data
    const updatedVolunteer = await Volunteer.findById(req.params.id);

    if (!updatedVolunteer) {
      return res.status(404).json({ msg: "Volunteer not found after update" });
    }

    if (updatedVolunteer.email) {
      try {
        await transporter.sendMail({
          from: `"Disaster Alert" <${EMAIL_USER}>`,
          to: updatedVolunteer.email,
          subject: "✅ New Task Assigned",
          text: `Hi ${updatedVolunteer.name},\n\nYou have been assigned a new task: "${task}"\n\nDescription: ${description || 'N/A'}\nLocation: ${updatedVolunteer.shelter}\nTime: ${new Date().toLocaleString()}\n\nBest regards,\nDisaster Relief Team`,
          html: `
            <h2>New Task Assignment</h2>
            <p>Hi <strong>${updatedVolunteer.name}</strong>,</p>
            <p>You have been assigned a new task:</p>
            <ul>
              <li><strong>Task:</strong> ${task}</li>
              <li><strong>Description:</strong> ${description || 'N/A'}</li>
              <li><strong>Location:</strong> ${updatedVolunteer.shelter}</li>
              <li><strong>Assigned at:</strong> ${new Date().toLocaleString()}</li>
            </ul>
            <p>Best regards,<br>Disaster Relief Team</p>
          `,
        });
        console.log(`✅ Task assignment email sent to ${volunteer.email}`);
      } catch (emailError) {
        console.error("❌ Failed to send task assignment email:", emailError.message);
      }
    }

    // Real-time notification for connected volunteer dashboard
    try {
      const ioInstance = req.app.get('io');
      if (ioInstance) {
        ioInstance.to(updatedVolunteer.email.toLowerCase()).emit('taskAssigned', {
          volunteerEmail: updatedVolunteer.email.toLowerCase(),
          task: newTask
        });
      }
    } catch (socketError) {
      console.error('⚠️ Failed to emit taskAssigned event:', socketError.message);
    }

    res.status(200).json({ msg: "Task assigned successfully", volunteer: updatedVolunteer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to assign task" });
  }
});

// --- Submit task proof ---
app.post("/api/tasks/:taskId/submit", upload.single("proof"), async (req, res) => {
  const { email, latitude, longitude } = req.body;
  const { taskId } = req.params;

  if (!email) {
    return res.status(400).json({ msg: "Volunteer email is required" });
  }

  if (!req.file) {
    return res.status(400).json({ msg: "Proof file is required" });
  }

  const latNum = latitude !== undefined ? parseFloat(latitude) : NaN;
  const lngNum = longitude !== undefined ? parseFloat(longitude) : NaN;

  if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) {
    return res.status(400).json({ msg: "Valid latitude and longitude are required" });
  }

  try {
    const updatedVolunteer = await Volunteer.findOneAndUpdate(
      { email, 'tasks.id': taskId },
      {
        $set: {
          'tasks.$.status': "Pending Approval",
          'tasks.$.completed': false,
          'tasks.$.proof': req.file.filename,
          'tasks.$.proofOriginalName': req.file.originalname,
          'tasks.$.proofMimeType': req.file.mimetype,
          'tasks.$.proofSize': req.file.size,
          'tasks.$.proofLocation': {
            lat: latNum,
            lng: lngNum
          },
          'tasks.$.completionRequestedAt': new Date(),
          'tasks.$.rejectionReason': null,
          'tasks.$.updatedAt': new Date()
        }
      },
      { new: true, runValidators: false }
    );

    if (!updatedVolunteer) {
      return res.status(404).json({ msg: "Task not found" });
    }

    const updatedTask = updatedVolunteer.tasks.find((t) => t.id === taskId);

    const ioInstance = req.app.get('io');
    if (ioInstance) {
      ioInstance.to(email.toLowerCase()).emit('taskUpdated', {
        taskId,
        status: "Pending Approval",
        volunteerEmail: email.toLowerCase()
      });
    }

    res.status(200).json({ msg: "Proof submitted, waiting for admin approval", task: updatedTask });
  } catch (err) {
    console.error("Failed to submit proof", err);
    res.status(500).json({ msg: "Failed to submit proof" });
  }
});

const formatStatus = (value) => {
  if (!value) return null;
  return value
    .toString()
    .trim()
    .replace(/[-_]+/g, ' ')
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

app.post("/api/tasks/:taskId/update-status", async (req, res) => {
  const { email, status, proof } = req.body;
  const { taskId } = req.params;

  if (!email) {
    return res.status(400).json({ msg: "Volunteer email is required" });
  }

  try {
    const formattedStatus = formatStatus(status);
    const statusLower = formattedStatus ? formattedStatus.toLowerCase() : null;

    const update = {
      $set: {
        'tasks.$.updatedAt': new Date()
      }
    };

    if (formattedStatus) {
      update.$set['tasks.$.status'] = formattedStatus;
      update.$set['tasks.$.completed'] = statusLower === 'completed';

      if (statusLower === 'pending approval') {
        update.$set['tasks.$.completionRequestedAt'] = new Date();
      }

      if (statusLower === 'completed') {
        update.$set['tasks.$.approvedAt'] = new Date();
        update.$set.isAvailable = true;
        update.$set.currentTask = null;
      }
    }

    if (proof !== undefined) {
      update.$set['tasks.$.proof'] = proof;
    }

    const updatedVolunteer = await Volunteer.findOneAndUpdate(
      { email, 'tasks.id': taskId },
      update,
      { new: true, runValidators: false }
    );

    if (!updatedVolunteer) {
      return res.status(404).json({ msg: "Task not found" });
    }

    const updatedTask = updatedVolunteer.tasks.find((t) => t.id === taskId);

    const ioInstance = req.app.get('io');
    if (ioInstance) {
      ioInstance.to(email.toLowerCase()).emit('taskUpdated', {
        taskId,
        status: formattedStatus,
        volunteerEmail: email.toLowerCase()
      });
    }

    res.json({ msg: "Task status updated", task: updatedTask });
  } catch (err) {
    console.error("Failed to update task status", err);
    res.status(500).json({ msg: "Failed to update task status" });
  }
});

// --- Admin approve task ---
app.post("/api/tasks/:taskId/approve", async (req, res) => {
  const { volunteerEmail } = req.body;
  const { taskId } = req.params;

  if (!volunteerEmail) {
    return res.status(400).json({ msg: "Volunteer email is required" });
  }

  try {
    const updatedVolunteer = await Volunteer.findOneAndUpdate(
      { email: volunteerEmail, 'tasks.id': taskId },
      {
        $set: {
          'tasks.$.status': "Completed",
          'tasks.$.completed': true,
          'tasks.$.approvedAt': new Date(),
          'tasks.$.rejectionReason': null,
          'tasks.$.updatedAt': new Date(),
          isAvailable: true,
          currentTask: null
        }
      },
      { new: true, runValidators: false }
    );

    if (!updatedVolunteer) {
      return res.status(404).json({ msg: "Task not found" });
    }

    const approvedTask = updatedVolunteer.tasks.find((t) => t.id === taskId);

    if (updatedVolunteer.email) {
      try {
        await transporter.sendMail({
          from: `"Disaster Alert" <${EMAIL_USER}>`,
          to: updatedVolunteer.email,
          subject: "✅ Task Approved!",
          text: `Hi ${updatedVolunteer.name},\n\nYour task "${approvedTask.task}" has been approved and marked as completed!\n\nThank you for your service.\n\nBest regards,\nDisaster Relief Team`,
        });
        console.log(`✅ Approval email sent to ${updatedVolunteer.email}`);
      } catch (emailError) {
        console.error("❌ Failed to send approval email:", emailError.message);
      }
    }

    const ioInstance = req.app.get('io');
    if (ioInstance) {
      ioInstance.to(updatedVolunteer.email.toLowerCase()).emit('taskUpdated', {
        taskId,
        status: "Completed",
        volunteerEmail: updatedVolunteer.email.toLowerCase()
      });
    }

    res.status(200).json({ msg: "Task approved and marked as completed", task: approvedTask });
  } catch (err) {
    console.error("Failed to approve task", err);
    res.status(500).json({ msg: "Failed to approve task" });
  }
});

app.post("/api/tasks/:taskId/reject", async (req, res) => {
  const { volunteerEmail, reason } = req.body;
  const { taskId } = req.params;

  if (!volunteerEmail) {
    return res.status(400).json({ msg: "Volunteer email is required" });
  }

  try {
    const rejectionReason = reason && reason.trim() ? reason.trim() : "No reason provided";
    const updatedVolunteer = await Volunteer.findOneAndUpdate(
      { email: volunteerEmail, 'tasks.id': taskId },
      {
        $set: {
          'tasks.$.status': "Rejected",
          'tasks.$.completed': false,
          'tasks.$.rejectionReason': rejectionReason,
          'tasks.$.approvedAt': null,
          'tasks.$.updatedAt': new Date()
        }
      },
      { new: true, runValidators: false }
    );

    if (!updatedVolunteer) {
      return res.status(404).json({ msg: "Task not found" });
    }

    const rejectedTask = updatedVolunteer.tasks.find((t) => t.id === taskId);

    if (updatedVolunteer.email) {
      try {
        await transporter.sendMail({
          from: `"Disaster Alert" <${EMAIL_USER}>`,
          to: updatedVolunteer.email,
          subject: "⚠️ Task Review Update",
          text: `Hi ${updatedVolunteer.name},\n\nYour task "${rejectedTask.task}" was not approved. Reason: ${rejectionReason}.\n\nPlease review the feedback and resubmit if needed.\n\nBest regards,\nDisaster Relief Team`,
        });
        console.log(`✅ Rejection email sent to ${updatedVolunteer.email}`);
      } catch (emailError) {
        console.error("❌ Failed to send rejection email:", emailError.message);
      }
    }

    const ioInstance = req.app.get('io');
    if (ioInstance) {
      ioInstance.to(updatedVolunteer.email.toLowerCase()).emit('taskUpdated', {
        taskId,
        status: "Rejected",
        volunteerEmail: updatedVolunteer.email.toLowerCase()
      });
    }

    res.status(200).json({ msg: "Task rejected", task: rejectedTask });
  } catch (err) {
    console.error("Failed to reject task", err);
    res.status(500).json({ msg: "Failed to reject task" });
  }
});

// --- Get tasks ---
app.get("/api/tasks", async (req, res) => {
  const { email } = req.query;
  try {
    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) return res.json([]);

    const allTasks = volunteer.tasks.map((t) => ({
      id: t.id,
      task: t.task,
      title: t.task,
      description: t.description || "",
      status: t.status || (t.completed ? "Completed" : "Pending"),
      proof: t.proof || null,
      proofOriginalName: t.proofOriginalName || null,
      proofMimeType: t.proofMimeType || null,
      proofSize: t.proofSize || null,
      proofLocation: t.proofLocation || null,
      proofUrl: t.proof ? `/uploads/${t.proof}` : null,
      location: t.location || volunteer.shelter,
      assignedAt: t.assignedAt,
      assignedBy: t.assignedBy || null,
      victimName: t.victimName || null,
      victimPhone: t.victimPhone || null,
      emergencyType: t.emergencyType || null,
      shelter: t.shelter || volunteer.shelter,
      estimatedResponseTime: t.estimatedResponseTime || null,
      emergencyId: t.emergencyId || null,
      isEmergencyTask: Boolean(t.isEmergencyTask),
      completionRequestedAt: t.completionRequestedAt || null,
      approvedAt: t.approvedAt || null,
      rejectionReason: t.rejectionReason || null
    }));

    res.json(allTasks);
  } catch (err) {
    console.error(err);
    res.json([]);
  }
});

// --- Emergency APIs ---
app.post("/emergencies", async (req, res) => {
  const { userName, userLocation, lat, lng } = req.body;
  try {
    const emergency = new Emergency({ userName, userLocation });
    await emergency.save();

    // Auto-assign nearest volunteer if coordinates are provided
    let assignedVolunteerName = null;
    try {
      const allVolunteers = await Volunteer.find();
      console.log(`Found ${allVolunteers.length} volunteers for emergency assignment`);

      if (allVolunteers.length > 0) {
        if (typeof lat === "number" && typeof lng === "number") {
          console.log(`Searching for nearest volunteer to coordinates: ${lat}, ${lng}`);
          let best = null;
          let volunteersWithCoordinates = 0;

          for (const v of allVolunteers) {
            if (v.coordinates && typeof v.coordinates.lat === "number" && typeof v.coordinates.lng === "number") {
              volunteersWithCoordinates++;
              const dLat = v.coordinates.lat - lat;
              const dLng = v.coordinates.lng - lng;
              const dist2 = dLat * dLat + dLng * dLng;
              console.log(`Volunteer ${v.name} distance: ${Math.sqrt(dist2)}`);
              if (!best || dist2 < best.dist2) best = { v, dist2 };
            }
          }

          if (best) {
            assignedVolunteerName = best.v.name;
            console.log(`Selected nearest volunteer: ${assignedVolunteerName}`);
          } else {
            console.log(`No volunteers found with valid coordinates. Found ${volunteersWithCoordinates} volunteers with coordinates`);
          }
        }

        if (!assignedVolunteerName) {
          assignedVolunteerName = allVolunteers[0].name; // fallback to first volunteer
          console.log(`Using fallback volunteer: ${assignedVolunteerName}`);
        }

        if (!emergency.assignedVolunteers) emergency.assignedVolunteers = [];
        if (assignedVolunteerName && !emergency.assignedVolunteers.includes(assignedVolunteerName)) {
          emergency.assignedVolunteers.push(assignedVolunteerName);
          await emergency.save();
          console.log(`Emergency assigned to volunteer: ${assignedVolunteerName}`);

          const volunteer = await Volunteer.findOne({ name: assignedVolunteerName });
          if (volunteer?.email) {
            console.log(`Sending emergency assignment email to ${volunteer.email}`);
            // Create a task for the volunteer so it shows on their dashboard
            const taskTitle = `Emergency response for ${userLocation}`;
            const exists = volunteer.tasks.find((t) => t.task === taskTitle);
            if (!exists) {
              volunteer.tasks.push({
                id: uuidv4(),
                task: taskTitle,
                description: `Assist ${userName || "the user"} at ${userLocation}`,
                assignedAt: new Date(),
                completed: false,
                status: "Pending",
              });
              await volunteer.save();
              console.log(`Task created for volunteer: ${taskTitle}`);

              // Calculate distance for real-time update
              // const distance = Math.sqrt(
              //   Math.pow(volunteer.coordinates.lat - lat, 2) +
              //   Math.pow(volunteer.coordinates.lng - lng, 2)
              // );

              // Emit real-time event for emergency assignment
              io.emit('emergencyAssigned', {
                emergencyId: emergency._id,
                emergencyLocation: userLocation,
                emergencyUser: userName,
                assignedVolunteer: {
                  id: volunteer._id,
                  name: volunteer.name,
                  email: volunteer.email,
                  phone: volunteer.phone,
                  shelter: volunteer.shelter,
                  coordinates: volunteer.coordinates,
                  // distance: Math.round(distance * 100) / 100 // Round to 2 decimal places
                },
                assignedAt: new Date()
              });
            }

            try {
              await transporter.sendMail({
                from: `"Disaster Alert" <${EMAIL_USER}>`,
                to: volunteer.email,
                subject: "🚨 Emergency Auto-Assignment",
                text: `Hi ${volunteer.name},\n\nYou have been auto-assigned to an emergency near you.\n\nLocation: ${userLocation}\nUser: ${userName}\nTime: ${new Date(emergency.time).toLocaleString()}\n\nPlease respond immediately.`,
              });
              console.log(`✅ Emergency assignment email sent to ${volunteer.email}`);
            } catch (emailError) {
              console.error("❌ Failed to send emergency assignment email:", emailError.message);
            }
          } else {
            console.log(`Volunteer ${assignedVolunteerName} has no email address`);
          }
        } else {
          console.log(`Volunteer ${assignedVolunteerName} already assigned to this emergency`);
        }
      } else {
        console.log("No volunteers found in database");
      }
    } catch (error) {
      console.error("❌ Error in emergency auto-assignment:", error.message);
    }

    res.status(201).json({ msg: "Emergency reported", emergency });
  } catch (err) {
    res.status(500).json({ msg: "Failed to report emergency" });
  }
});

app.get("/emergencies", async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({ time: -1 });
    res.json(emergencies);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch emergencies" });
  }
});

app.post("/emergencies/:id/assign-volunteer", async (req, res) => {
  const { volunteerName } = req.body;
  try {
    const emergency = await Emergency.findById(req.params.id);
    if (!emergency) return res.status(404).json({ msg: "Emergency not found" });

    if (!emergency.assignedVolunteers) emergency.assignedVolunteers = [];
    if (!emergency.assignedVolunteers.includes(volunteerName)) {
      emergency.assignedVolunteers.push(volunteerName);
      await emergency.save();
    }

    const volunteer = await Volunteer.findOne({ name: volunteerName });
    if (!volunteer) return res.status(404).json({ msg: "Volunteer not found" });
    if (!volunteer.email) return res.status(400).json({ msg: "Volunteer email missing" });

    // Ensure the volunteer gets a task entry so it shows on their dashboard
    const taskTitle = `Emergency response for ${emergency.userLocation}`;
    const exists = volunteer.tasks.find((t) => t.task === taskTitle);
    if (!exists) {
      volunteer.tasks.push({
        id: uuidv4(),
        task: taskTitle,
        description: `Assist ${emergency.userName || "the user"} at ${emergency.userLocation}`,
        assignedAt: new Date(),
        completed: false,
        status: "Pending",
      });
      await volunteer.save();
    }

    try {
      await transporter.sendMail({
        from: `"Disaster Alert" <${EMAIL_USER}>`,
        to: volunteer.email,
        subject: "🚨 Emergency Task Assigned",
        text: `Hi ${volunteer.name},\n\nYou have been assigned to help with an emergency!\n\nLocation: ${emergency.userLocation}\nUser: ${emergency.userName}\nTime: ${new Date(emergency.time).toLocaleString()}\n\nPlease respond as soon as possible.\n\nBest regards,\nDisaster Relief Team`,
        html: `
          <h2 style="color: red;">🚨 Emergency Assignment</h2>
          <p>Hi <strong>${volunteer.name}</strong>,</p>
          <p>You have been assigned to help with an emergency!</p>
          <ul>
            <li><strong>Location:</strong> ${emergency.userLocation}</li>
            <li><strong>User in need:</strong> ${emergency.userName}</li>
            <li><strong>Time reported:</strong> ${new Date(emergency.time).toLocaleString()}</li>
          </ul>
          <p><strong>Please respond as soon as possible.</strong></p>
          <p>Best regards,<br>Disaster Relief Team</p>
        `,
      });
      console.log(`✅ Emergency assignment email sent to ${volunteer.email}`);
    } catch (emailError) {
      console.error("❌ Failed to send emergency email:", emailError.message);
    }

    res.status(200).json({ msg: "Volunteer assigned and notified", volunteer: volunteer.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to assign volunteer" });
  }
});

app.get("/emergencies/:id/volunteers", async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);
    if (!emergency) return res.status(404).json({ msg: "Emergency not found" });
    res.status(200).json(emergency.assignedVolunteers || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch volunteers" });
  }
});

// --- Send SMS ---
app.post("/send-sms", async (req, res) => {
  const { to, userName, userPhone, userLocation, lat, lng } = req.body;
  if (!to) return res.status(400).json({ error: 'Missing "to" in request' });

  if (!client) {
    console.log("❌ SMS requested but Twilio not configured");
    return res.status(503).json({ error: 'SMS service not available - Twilio not configured' });
  }

  // Create personalized message with user details
  const fullMessage = `🚨 EMERGENCY SOS ALERT! 🚨
${userName ? `Name: ${userName}` : 'Emergency Contact Needed'}
${userPhone ? `Phone: ${userPhone}` : ''}
${userLocation ? `Location: ${userLocation}` : `Coordinates: Lat=${lat || 'Unknown'}, Lng=${lng || 'Unknown'}`}

IMMEDIATE ASSISTANCE REQUIRED!
Please respond as soon as possible.

- Emergency Alert System`;

  try {
    const message = await client.messages.create({
      from: "+17753638196",
      to: to,
      body: fullMessage,
    });
    console.log(`✅ Emergency SMS sent to ${to} - SID: ${message.sid}`);
    res.json({ success: true, sid: message.sid, message: "SMS sent successfully" });
  } catch (error) {
    console.error("Twilio error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- Send confirmation email ---
app.post("/api/send-confirmation", async (req, res) => {
  const { name, email, shelter, age, phone } = req.body;
  if (!name || !email || !shelter) return res.status(400).json({ msg: "Missing fields" });

  try {
    await transporter.sendMail({
      from: `"Disaster Relief Team" <${EMAIL_USER}>`,
      to: email,
      subject: "✅ Volunteer Registration Confirmation",
      text: `Hi ${name},\n\nThank you for registering as a volunteer!\n\nRegistration Details:\n- Name: ${name}\n- Phone: ${phone}\n- Shelter: ${shelter}\n- Age: ${age}\n\nWe appreciate your willingness to help during disasters.\n\nBest regards,\nDisaster Relief Team`,
      html: `
        <h2>Welcome to the Disaster Relief Team!</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for registering as a volunteer!</p>
        <h3>Registration Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Shelter:</strong> ${shelter}</li>
          <li><strong>Age:</strong> ${age}</li>
        </ul>
        <p>We appreciate your willingness to help during disasters.</p>
        <p>Best regards,<br><strong>Disaster Relief Team</strong></p>
      `,
    });
    console.log(`✅ Confirmation email sent to ${email}`);
    res.status(200).json({ msg: "Confirmation sent" });
  } catch (err) {
    console.error("❌ Failed to send confirmation email:", err.message);
    res.status(500).json({ msg: "Failed to send email", error: err.message });
  }
});

// --- Send emergency email to admin ---
app.post("/send-emergency-email", async (req, res) => {
  try {
    const { userName, userLocation } = req.body;

    // Create a basic emergency record for tracking
    const emergency = new EmergencyAlert({
      victimName: userName || "Unknown",
      victimPhone: "Not provided",
      victimEmail: "emergency@system.local",
      location: {
        lat: 12.9716, // Default coordinates
        lng: 77.5946,
        address: userLocation || "Not specified"
      },
      emergencyType: "General",
      description: `Emergency reported by ${userName || "unknown user"} at ${userLocation || "unknown location"}`
    });

    await emergency.save();

    const mailOptions = {
      from: `"Disaster Alert" <${EMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: "🚨 Emergency Help Needed!",
      text: `Emergency Alert!\n\nUser: ${userName || "Unknown"}\nLocation: ${userLocation || "Not provided"}\nReported at: ${new Date().toLocaleString()}\n\nPlease take immediate action.`,
      html: `
        <h2 style="color: red;">🚨 Emergency Alert!</h2>
        <p><strong>User:</strong> ${userName || "Unknown"}</p>
        <p><strong>Location:</strong> ${userLocation || "Not provided"}</p>
        <p><strong>Reported at:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Please take immediate action.</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Emergency email sent to admin: ${ADMIN_EMAIL}`);
    res.status(200).json({ message: "Emergency email sent & stored successfully", emergency });
  } catch (error) {
    console.error("❌ Failed to send emergency email:", error.message);
    res.status(500).json({ message: "Failed to send emergency email", error: error.message });
  }
});

// --- Simple SOS Alert endpoint (no automatic assignment) ---
app.post("/api/sos-alert", async (req, res) => {
  try {
    const { userLocation, lat, lng, userName, timestamp } = req.body;
    
    if (!userLocation || !lat || !lng) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required location data" 
      });
    }

    // Create a simple emergency alert without automatic assignment
    const emergencyAlert = new EmergencyAlert({
      victimName: userName || "SOS User",
      victimPhone: "Not provided",
      victimEmail: "sos@emergency.local",
      location: {
        lat: lat,
        lng: lng,
        address: userLocation
      },
      emergencyType: "SOS Alert",
      description: `Emergency SOS alert received from location: ${userLocation}`,
      priority: "high",
      status: "pending" // Will be manually assigned by admin
    });

    await emergencyAlert.save();
    console.log(`🚨 SOS Alert received and saved: ${emergencyAlert._id}`);

    // Send notification to admin via email
    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"Disaster Alert" <${EMAIL_USER}>`,
          to: ADMIN_EMAIL,
          subject: "🚨 NEW SOS ALERT - Manual Assignment Required",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="margin: 0; font-size: 28px;">🚨 NEW SOS ALERT</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px;">Manual volunteer assignment required</p>
              </div>
              <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 10px 10px;">
                <h2 style="color: #333; margin-top: 0;">SOS Alert Details</h2>
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
                  <p><strong>Alert ID:</strong> ${emergencyAlert._id}</p>
                  <p><strong>Location:</strong> ${userLocation}</p>
                  <p><strong>Coordinates:</strong> ${lat}, ${lng}</p>
                  <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                  <p><strong>Status:</strong> Pending Assignment</p>
                </div>
                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                  <p style="margin: 0; color: #92400e;"><strong>Action Required:</strong> Please log into the admin dashboard to assign a volunteer to this SOS alert.</p>
                </div>
              </div>
            </div>
          `,
        });
        console.log(`✅ SOS alert email sent to admin: ${ADMIN_EMAIL}`);
      } catch (emailError) {
        console.error("❌ Failed to send SOS alert email:", emailError.message);
      }
    }

    // Emit real-time event for admin dashboard
    io.emit('newSOSAlert', {
      alertId: emergencyAlert._id,
      location: userLocation,
      coordinates: { lat, lng },
      timestamp: new Date(),
      status: 'pending'
    });

    res.status(200).json({
      success: true,
      message: "SOS alert received and logged successfully",
      alertId: emergencyAlert._id,
      status: "pending"
    });

  } catch (error) {
    console.error("❌ SOS Alert error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process SOS alert",
      error: error.message
    });
  }
});

// --- Health check endpoint (legacy path) ---
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 5000
  });
});

// --- Test data creation endpoint (for debugging) ---
app.post("/api/create-test-volunteer", async (req, res) => {
  try {
    // Check if test volunteer already exists
    const existingVolunteer = await Volunteer.findOne({ email: "test.volunteer@example.com" });
    if (existingVolunteer) {
      return res.json({
        success: true,
        message: "Test volunteer already exists",
        volunteer: existingVolunteer
      });
    }

    const testVolunteer = new Volunteer({
      name: "Test Volunteer",
      age: 25,
      email: "test.volunteer@example.com",
      phone: "+917339486437",
      shelter: "1", // Chennai Corporation Shelter
      coordinates: {
        lat: 13.0635,
        lng: 80.2297
      },
      isAvailable: true
    });

    await testVolunteer.save();
    console.log(`✅ Test volunteer created: ${testVolunteer._id}`);
    console.log(`📍 Volunteer coordinates:`, testVolunteer.coordinates);

    res.json({
      success: true,
      message: "Test volunteer created",
      volunteer: testVolunteer
    });
  } catch (error) {
    console.error("❌ Failed to create test volunteer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create test volunteer",
      error: error.message
    });
  }
});

// --- Legacy tasks endpoint for volunteer dashboard ---
app.get("/api/tasks", async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }

    console.log(`📋 Legacy tasks endpoint - fetching for email: ${email}`);

    // Find the volunteer by email
    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) {
      console.log(`❌ Volunteer not found with email: ${email}`);
      
      // Debug: List all volunteers
      const allVolunteers = await Volunteer.find({}, 'name email');
      console.log(`📊 Available volunteers in database:`, allVolunteers.map(v => ({ name: v.name, email: v.email })));
      
      return res.status(200).json([]); // Return empty array instead of error
    }

    console.log(`✅ Found volunteer: ${volunteer.name} (${volunteer._id})`);

    // Find all emergency alerts assigned to this volunteer
    const assignedAlerts = await EmergencyAlert.find({ 
      assignedVolunteer: volunteer._id 
    })
    .populate('assignedVolunteer', 'name email phone')
    .sort({ assignedAt: -1 });

    console.log(`📊 Found ${assignedAlerts.length} assigned tasks for ${email}`);
    
    if (assignedAlerts.length > 0) {
      console.log(`📋 Alert details:`, assignedAlerts.map(a => ({
        id: a._id,
        type: a.emergencyType,
        status: a.status,
        victim: a.victimName,
        assignedVolunteer: a.assignedVolunteer
      })));
    } else {
      // Debug: Check all emergency alerts
      const allAlerts = await EmergencyAlert.find({}, 'emergencyType status assignedVolunteer victimName');
      console.log(`📊 Total emergency alerts in database: ${allAlerts.length}`);
      console.log(`📊 All alerts:`, allAlerts.map(a => ({
        id: a._id,
        type: a.emergencyType,
        status: a.status,
        assignedVolunteer: a.assignedVolunteer,
        victim: a.victimName
      })));
    }

    // Transform the data to match the volunteer dashboard format
    const tasks = assignedAlerts.map(alert => ({
      id: alert._id,
      title: `${alert.emergencyType} - ${alert.victimName}`,
      description: alert.description || `Emergency assistance needed for ${alert.victimName}`,
      location: alert.location?.address || alert.userLocation || 'Location not specified',
      status: alert.status === 'assigned' ? 'Pending' : 
              alert.status === 'in_progress' ? 'In Progress' : 
              alert.status === 'completed' ? 'Completed' : 'Pending',
      assignedAt: alert.assignedAt || alert.createdAt,
      emergencyType: alert.emergencyType,
      victimName: alert.victimName,
      victimPhone: alert.victimPhone,
      victimEmail: alert.victimEmail,
      estimatedResponseTime: alert.estimatedResponseTime
    }));

    return res.status(200).json(tasks);

  } catch (error) {
    console.error('❌ Error in legacy tasks endpoint:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// --- Debug endpoint to check volunteer-user matching ---
app.get("/api/debug/volunteer-user-match/:email", async (req, res) => {
  try {
    const { email } = req.params;
    
    console.log(`🔍 Debug: Checking volunteer-user match for: ${email}`);
    
    // Check user account
    const user = await User.findOne({ email });
    console.log(`👤 User account:`, user ? { id: user._id, name: user.name, email: user.email, role: user.role } : 'Not found');
    
    // Check volunteer profile
    const volunteer = await Volunteer.findOne({ email });
    console.log(`👷 Volunteer profile:`, volunteer ? { id: volunteer._id, name: volunteer.name, email: volunteer.email } : 'Not found');
    
    // Check assigned alerts
    if (volunteer) {
      const assignedAlerts = await EmergencyAlert.find({ assignedVolunteer: volunteer._id });
      console.log(`🚨 Assigned alerts: ${assignedAlerts.length}`);
    }
    
    res.json({
      email,
      user: user ? { id: user._id, name: user.name, email: user.email, role: user.role } : null,
      volunteer: volunteer ? { id: volunteer._id, name: volunteer.name, email: volunteer.email } : null,
      assignedAlerts: volunteer ? await EmergencyAlert.countDocuments({ assignedVolunteer: volunteer._id }) : 0
    });
    
  } catch (error) {
    console.error('Debug endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// --- Use emergency routes ---
app.use("/api", emergencyRoutes);

// --- HTTP Server and Socket.IO Setup ---
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080", // Frontend URL
    methods: ["GET", "POST"]
  }
});

// Expose Socket.IO instance to routes
app.set('io', io);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('🔗 Client connected:', socket.id);

  socket.on('registerVolunteer', (email) => {
    if (!email) return;
    const room = email.toString().toLowerCase();
    socket.join(room);
    console.log(`📡 Volunteer socket joined room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// --- Auto-detect available port and start server ---

const isPortAvailable = (port) => {
  return new Promise((resolve) => {
    const testServer = net.createServer();
    
    testServer.listen(port, () => {
      testServer.close(() => {
        resolve(true);
      });
    });
    
    testServer.on('error', () => {
      resolve(false);
    });
  });
};

const findAvailablePort = async (startPort) => {
  let currentPort = startPort;
  
  while (currentPort < startPort + 100) { // Try up to 100 ports
    const available = await isPortAvailable(currentPort);
    if (available) {
      return currentPort;
    }
    console.log(`⚠️  Port ${currentPort} is already in use, trying port ${currentPort + 1}...`);
    currentPort++;
  }
  
  throw new Error(`No available ports found between ${startPort} and ${startPort + 99}`);
};

const startServer = async () => {
  try {
    const startPort = process.env.PORT ? parseInt(process.env.PORT) : 5000;
    const availablePort = await findAvailablePort(startPort);
    
    server.listen(availablePort, () => {
      console.log(`🚀 Server successfully started on http://localhost:${availablePort}`);
      if (availablePort !== startPort) {
        console.log(`📍 Note: Originally tried port ${startPort}, but it was in use`);
      }
      console.log(`📧 Email configured for: ${EMAIL_USER}`);
      console.log(`👤 Admin email: ${ADMIN_EMAIL}`);
      console.log(`🔗 Socket.IO server ready for real-time updates`);
      console.log(`🔄 Server will automatically find available ports if needed`);
      
      // Save current port to config file for frontend reference
      const serverConfig = {
        port: availablePort,
        url: `http://localhost:${availablePort}`,
        startTime: new Date().toISOString(),
        originalPort: startPort
      };
      
      try {
        fs.writeFileSync('./server-config.json', JSON.stringify(serverConfig, null, 2));
        console.log(`📝 Server configuration saved to server-config.json`);
      } catch (error) {
        console.log(`⚠️  Could not save server config: ${error.message}`);
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Health check endpoint for auto-detection
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    port: server.address()?.port || 'unknown',
    timestamp: new Date().toISOString(),
    message: 'Disaster Management Backend Server is running'
  });
});

// Start the server
startServer();

// --- Simple proxy to avoid CORS in dev for radio-browser ---
app.get('/proxy/radio-stations', async (req, res) => {
  try {
    const url = 'https://de1.api.radio-browser.info/json/stations/bycountryexact/India?tag=news';
    const response = await fetch(url, { headers: { 'User-Agent': 'EmergencyRadioApp/1.0' } });
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json(data);
  } catch (e) {
    return res.status(500).json({ error: 'proxy_failed', message: e.message });
  }
});