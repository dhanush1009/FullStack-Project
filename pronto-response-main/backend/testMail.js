import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

async function testMail() {
  const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
  const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
  const SMTP_SECURE = String(process.env.SMTP_SECURE || "true").toLowerCase() === "true";
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || EMAIL_USER;

  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  try {
    let info = await transporter.sendMail({
      from: `"Test" <${EMAIL_USER}>`,
      to: ADMIN_EMAIL, // send to yourself
      subject: "Hello from Nodemailer",
      text: "This is a test email to verify SMTP connection.",
    });
    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending test email:", error);
  }
}

testMail();
