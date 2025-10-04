import express from "express";
import nodemailer from "nodemailer";
import dns from "dns/promises";

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Simple email format validation function
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Function to check if email domain has MX records
async function domainHasMX(email) {
  const domain = email.split("@")[1];
  try {
    const mxRecords = await dns.resolveMx(domain);
    return mxRecords && mxRecords.length > 0;
  } catch (err) {
    return false;
  }
}

router.post("/send-confirmation", async (req, res) => {
  const { name, email, shelter, age } = req.body;

  if (!name || !email || !shelter) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email address format" });
  }

  const hasMX = await domainHasMX(email);
  if (!hasMX) {
    return res.status(400).json({ message: "Email domain does not exist or cannot receive emails" });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Volunteer Registration Confirmation",
    text: `Hi ${name},\n\nThank you for registering as a volunteer at ${shelter}.\nYour age: ${age}\nWe appreciate your support!\n\nBest regards,\nDisaster Relief Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Confirmation email sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

export default router;
