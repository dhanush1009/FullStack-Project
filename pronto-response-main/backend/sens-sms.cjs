
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

client.messages
  .create({
    body: 'Hello from Twilio via ChatGPT!',
    from: '+1234567890',   // your Twilio number
    to: '+917339486437'    // destination number
  })
  .then(message => console.log('Message sent with SID:', message.sid))
  .catch(error => console.error('Error sending message:', error));
