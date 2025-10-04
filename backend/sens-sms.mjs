import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());               // Enable CORS for all origins (for development)
app.use(express.json());       // Parse JSON bodies

// Twilio client setup
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// POST endpoint to send emergency SMS
app.post('/send-sms', async (req, res) => {
  const { to, latitude, longitude } = req.body;

  // Basic validation
  if (!to) {
    return res.status(400).json({ error: 'Missing "to" in request body' });
  }

  try {
    // Default coordinates if not provided
    const lat = latitude || '12.9716';
    const lng = longitude || '77.5946';

    // Construct the SMS message
    const fullMessage = `🚨 Emergency Alert! 🚨
Help needed urgently!

Location: MG Road, Bangalore, Karnataka, India
Coordinates: Lat=12.9716, Lon=77.5946
Contact: 7339486437
`;  

    // Send SMS via Twilio
    const message = await client.messages.create({
      from: '+17753638196',   // Your Twilio number
      to: to,                 // Recipient's number
      body: fullMessage
    });

    // Respond with success
    res.json({
      success: true,
      sid: message.sid,
      message: 'Emergency SMS sent with location information'
    });

  } catch (error) {
    console.error('Twilio error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
