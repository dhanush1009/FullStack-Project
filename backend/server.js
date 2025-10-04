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
import User from "./userModel.js";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// --- MongoDB connection ---
mongoose
  .connect("mongodb://localhost:27017/disasterApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error", err));

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
    console.error("   3. 2-Step Verification is enabled on your Google account");
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

// --- Twilio client ---
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// --- Multer setup for file uploads ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// --- Volunteer schema ---
const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  shelter: { type: String, required: true },
  email: String,
  lat: { type: Number, default: null },
  lng: { type: Number, default: null },
  tasks: [
    {
      id: String,
      task: String,
      description: String,
      assignedAt: Date,
      completed: Boolean,
      status: String, // "Pending", "Pending Approval", "Completed"
      proof: String, // uploaded file name
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
const Volunteer = mongoose.model("Volunteer", volunteerSchema);

// --- Emergency schema ---
const emergencySchema = new mongoose.Schema({
  userName: String,
  userLocation: String,
  time: { type: Date, default: Date.now },
  assignedVolunteers: [String],
});
const Emergency = mongoose.model("Emergency", emergencySchema);

// --- Signup API ---
app.post("/api/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (email === "aravinthl266@gmail.com")
      return res.status(400).json({ msg: "Admin cannot signup" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ msg: "User created" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
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

    res.status(200).json({ msg: "Login successful", name: user.name, role: user.role });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// --- Volunteer APIs ---
app.post("/api/volunteers", async (req, res) => {
  const { name, age, shelter, email } = req.body;
  if (!name || !shelter) return res.status(400).json({ msg: "Name and shelter required" });
  try {
    const volunteer = new Volunteer({ name, age, shelter, email });
    await volunteer.save();
    res.status(201).json({ msg: "Volunteer saved", volunteer });
  } catch (err) {
    res.status(500).json({ msg: "Failed to save volunteer" });
  }
});

app.get("/api/volunteers", async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (err) {
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
  const { task, description } = req.body;
  if (!task) return res.status(400).json({ msg: "Task is required" });

  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.status(404).json({ msg: "Volunteer not found" });

    const exists = volunteer.tasks.find((t) => t.task === task);
    if (exists) return res.status(400).json({ msg: "Task already assigned" });

    volunteer.tasks.push({
      id: uuidv4(),
      task,
      description,
      assignedAt: new Date(),
      completed: false,
      status: "Pending",
    });

    await volunteer.save();

    if (volunteer.email) {
      try {
        await transporter.sendMail({
          from: `"Disaster Alert" <${EMAIL_USER}>`,
          to: volunteer.email,
          subject: "✅ New Task Assigned",
          text: `Hi ${volunteer.name},\n\nYou have been assigned a new task: "${task}"\n\nDescription: ${description || 'N/A'}\nLocation: ${volunteer.shelter}\nTime: ${new Date().toLocaleString()}\n\nBest regards,\nDisaster Relief Team`,
          html: `
            <h2>New Task Assignment</h2>
            <p>Hi <strong>${volunteer.name}</strong>,</p>
            <p>You have been assigned a new task:</p>
            <ul>
              <li><strong>Task:</strong> ${task}</li>
              <li><strong>Description:</strong> ${description || 'N/A'}</li>
              <li><strong>Location:</strong> ${volunteer.shelter}</li>
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

    res.status(200).json({ msg: "Task assigned successfully", volunteer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to assign task" });
  }
});

// --- Submit task proof ---
app.post("/api/tasks/:taskId/submit", upload.single("proof"), async (req, res) => {
  const { email } = req.body;
  const { taskId } = req.params;
  try {
    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) return res.status(404).json({ msg: "Volunteer not found" });

    const task = volunteer.tasks.find((t) => t.id === taskId);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    task.proof = req.file ? req.file.filename : null;
    task.status = "Pending Approval";
    await volunteer.save();

    res.status(200).json({ msg: "Proof submitted, waiting for admin approval" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to submit proof" });
  }
});

// --- Admin approve task ---
app.post("/api/tasks/:taskId/approve", async (req, res) => {
  const { volunteerEmail } = req.body;
  const { taskId } = req.params;
  try {
    const volunteer = await Volunteer.findOne({ email: volunteerEmail });
    if (!volunteer) return res.status(404).json({ msg: "Volunteer not found" });

    const task = volunteer.tasks.find((t) => t.id === taskId);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    task.status = "Completed";
    task.completed = true;
    await volunteer.save();

    // Send approval email to volunteer
    if (volunteer.email) {
      try {
        await transporter.sendMail({
          from: `"Disaster Alert" <${EMAIL_USER}>`,
          to: volunteer.email,
          subject: "✅ Task Approved!",
          text: `Hi ${volunteer.name},\n\nYour task "${task.task}" has been approved and marked as completed!\n\nThank you for your service.\n\nBest regards,\nDisaster Relief Team`,
        });
        console.log(`✅ Approval email sent to ${volunteer.email}`);
      } catch (emailError) {
        console.error("❌ Failed to send approval email:", emailError.message);
      }
    }

    res.status(200).json({ msg: "Task approved and marked as completed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to approve task" });
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
      title: t.task,
      description: t.description || "",
      status: t.status || (t.completed ? "Completed" : "Pending"),
      proof: t.proof || null,
      location: volunteer.shelter,
      assignedAt: t.assignedAt,
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
      if (allVolunteers.length > 0) {
        if (typeof lat === "number" && typeof lng === "number") {
          let best = null;
          for (const v of allVolunteers) {
            if (typeof v.lat === "number" && typeof v.lng === "number") {
              const dLat = v.lat - lat;
              const dLng = v.lng - lng;
              const dist2 = dLat * dLat + dLng * dLng;
              if (!best || dist2 < best.dist2) best = { v, dist2 };
            }
          }
          if (best) assignedVolunteerName = best.v.name;
        }
        if (!assignedVolunteerName) {
          assignedVolunteerName = allVolunteers[0].name; // fallback
        }

        if (!emergency.assignedVolunteers) emergency.assignedVolunteers = [];
        if (assignedVolunteerName && !emergency.assignedVolunteers.includes(assignedVolunteerName)) {
          emergency.assignedVolunteers.push(assignedVolunteerName);
          await emergency.save();

          const volunteer = await Volunteer.findOne({ name: assignedVolunteerName });
          if (volunteer?.email) {
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
            }
            try {
              await transporter.sendMail({
                from: `"Disaster Alert" <${EMAIL_USER}>`,
                to: volunteer.email,
                subject: "🚨 Emergency Auto-Assignment",
                text: `Hi ${volunteer.name},\n\nYou have been auto-assigned to an emergency near you.\n\nLocation: ${userLocation}\nUser: ${userName}\nTime: ${new Date(emergency.time).toLocaleString()}\n\nPlease respond immediately.`,
              });
            } catch (_) {}
          }
        }
      }
    } catch (_) {}

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
  const { to } = req.body;
  if (!to) return res.status(400).json({ error: 'Missing "to" in request' });

  const fullMessage = `🚨 Emergency Alert! 🚨
Help needed urgently!
Location: Tamil Nadu
Coordinates: Lat=12.9716, Lon=77.5946
Help me as soon as possible`;

  try {
    const message = await client.messages.create({
      from: "+17753638196",
      to: to,
      body: fullMessage,
    });
    res.json({ success: true, sid: message.sid });
  } catch (error) {
    console.error("Twilio error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- Send confirmation email ---
app.post("/api/send-confirmation", async (req, res) => {
  const { name, email, shelter, age } = req.body;
  if (!name || !email || !shelter) return res.status(400).json({ msg: "Missing fields" });

  try {
    await transporter.sendMail({
      from: `"Disaster Relief Team" <${EMAIL_USER}>`,
      to: email,
      subject: "✅ Volunteer Registration Confirmation",
      text: `Hi ${name},\n\nThank you for registering as a volunteer!\n\nRegistration Details:\n- Name: ${name}\n- Shelter: ${shelter}\n- Age: ${age}\n\nWe appreciate your willingness to help during disasters.\n\nBest regards,\nDisaster Relief Team`,
      html: `
        <h2>Welcome to the Disaster Relief Team!</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for registering as a volunteer!</p>
        <h3>Registration Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
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
    const emergency = new Emergency({ userName, userLocation });
    await emergency.save();

    const mailOptions = {
      from: `"Disaster Alert" <${EMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: "🚨 Emergency Help Needed!",
      text: `Emergency Alert!\n\nUser: ${userName || "Unknown"}\nLocation: ${userLocation || "Not provided"}\nReported at: ${new Date(emergency.time).toLocaleString()}\n\nPlease take immediate action.`,
      html: `
        <h2 style="color: red;">🚨 Emergency Alert!</h2>
        <p><strong>User:</strong> ${userName || "Unknown"}</p>
        <p><strong>Location:</strong> ${userLocation || "Not provided"}</p>
        <p><strong>Reported at:</strong> ${new Date(emergency.time).toLocaleString()}</p>
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

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email configured for: ${EMAIL_USER}`);
  console.log(`👤 Admin email: ${ADMIN_EMAIL}`);
});