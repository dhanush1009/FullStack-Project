# 🚀 Quick Deployment Guide - Render.com (Free Tier)

## ✅ What You Already Have Set Up
- ✅ MongoDB Atlas connected and working
- ✅ Backend running on port 5003
- ✅ Frontend running on port 8081
- ✅ GitHub repository: dhanush1009/FullStack-Project

---

## 📦 Step 1: Prepare Your Code for Deployment

### 1.1 Create Backend Start Script
Already exists in `backend/start-server.js` ✅

### 1.2 Update Backend for Production
Create `backend/.env.production` file:
```env
# MongoDB Atlas (Production)
MONGODB_URI=mongodb+srv://sdhanush1009_db_user:Dhanush%402005@cluster0.9f0wcxu.mongodb.net/Disaster-Management

# Email Configuration
EMAIL_USER=sdhanush1009@gmail.com
EMAIL_PASS=lapwwfmugouczkuy

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Server Configuration
PORT=5003
NODE_ENV=production
```

### 1.3 Commit and Push Changes
```bash
cd "C:\Users\sdhan\Downloads\Disaster system (3)\Disaster system\pronto-response-main"

git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

---

## 🖥️ Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to [https://render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repositories

### 2.2 Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: **dhanush1009/FullStack-Project**
3. Configure the service:

**Basic Settings:**
- **Name**: `disaster-management-backend`
- **Region**: `Singapore` (or closest to you)
- **Branch**: `main`
- **Root Directory**: `pronto-response-main/backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node start-server.js`

**Instance Type:**
- **Free** (0.1 CPU, 512 MB RAM)

### 2.3 Set Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:
```
MONGODB_URI = your_mongodb_atlas_connection_string
EMAIL_USER = your_email@gmail.com
EMAIL_PASS = your_gmail_app_password
TWILIO_ACCOUNT_SID = your_twilio_account_sid
TWILIO_AUTH_TOKEN = your_twilio_auth_token
TWILIO_PHONE_NUMBER = your_twilio_phone_number
PORT = 5003
NODE_ENV = production
```

### 2.4 Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Copy your backend URL: `https://disaster-management-backend.onrender.com`

---

## 🎨 Step 3: Deploy Frontend to Render

### 3.1 Update Frontend API URL

Create `pronto-response-main/.env.production`:
```env
VITE_API_URL=https://disaster-management-backend.onrender.com
```

Update `src/utils/apiConfig.js`:
```javascript
const getApiUrl = () => {
  // Production: Use environment variable
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://disaster-management-backend.onrender.com';
  }
  
  // Development: Auto-detect port
  return getBackendUrl();
};

export const API_URL = getApiUrl();
```

### 3.2 Commit Frontend Changes
```bash
git add .
git commit -m "Add production API URL"
git push origin main
```

### 3.3 Create Frontend Web Service
1. Click **"New +"** → **"Static Site"**
2. Connect same repository: **dhanush1009/FullStack-Project**
3. Configure:

**Basic Settings:**
- **Name**: `disaster-management-frontend`
- **Branch**: `main`
- **Root Directory**: `pronto-response-main`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

**Environment Variables:**
```
VITE_API_URL = https://disaster-management-backend.onrender.com
```

### 3.4 Deploy
1. Click **"Create Static Site"**
2. Wait 5-10 minutes
3. Your app will be live at: `https://disaster-management-frontend.onrender.com`

---

## 🔧 Step 4: Update Backend CORS

After deployment, update backend CORS to allow your frontend domain:

In `backend/server.js`, update CORS configuration:
```javascript
const cors = require("cors");

app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:8081',
    'https://disaster-management-frontend.onrender.com'
  ],
  credentials: true
}));
```

Commit and push:
```bash
git add .
git commit -m "Update CORS for production"
git push origin main
```

Render will automatically redeploy your backend.

---

## ✅ Step 5: Test Your Deployment

### 5.1 Test Backend
Visit: `https://disaster-management-backend.onrender.com/api/health`

Should return:
```json
{
  "status": "OK",
  "timestamp": "2025-12-18T..."
}
```

### 5.2 Test Frontend
1. Visit: `https://disaster-management-frontend.onrender.com`
2. Try to register a new user
3. Check MongoDB Atlas to verify data was saved

### 5.3 Test Full Flow
1. Register as a user
2. Login
3. Send an SOS alert
4. Check that email notifications work
5. Verify data in MongoDB Atlas

---

## ⚠️ Important Notes

### Free Tier Limitations
- **Backend**: Spins down after 15 minutes of inactivity
- **First request**: May take 30-60 seconds to wake up
- **Build time**: Up to 10 minutes

### Keeping Backend Active
To prevent spin-down, use a service like **UptimeRobot**:
1. Sign up at [uptimerobot.com](https://uptimerobot.com)
2. Add monitor: `https://disaster-management-backend.onrender.com/api/health`
3. Check every 5 minutes

### MongoDB Atlas Security
Your MongoDB connection string is already configured with URL-encoded password ✅

### Email & SMS
- Gmail app password is already set up ✅
- Twilio credentials need to be added to environment variables

---

## 🎯 Quick Deployment Checklist

- [ ] Push code to GitHub
- [ ] Create Render account
- [ ] Deploy backend to Render
- [ ] Add environment variables to backend
- [ ] Copy backend URL
- [ ] Update frontend with backend URL
- [ ] Deploy frontend to Render
- [ ] Update backend CORS settings
- [ ] Test registration and login
- [ ] Verify MongoDB Atlas connection
- [ ] Set up UptimeRobot (optional)

---

## 📱 Your Deployed URLs

After deployment:
- **Frontend**: `https://disaster-management-frontend.onrender.com`
- **Backend**: `https://disaster-management-backend.onrender.com`
- **Database**: Already configured with MongoDB Atlas ✅

---

## 🆘 Troubleshooting

### Backend won't start
- Check Render logs for errors
- Verify environment variables are set correctly
- Make sure MongoDB Atlas IP whitelist includes `0.0.0.0/0`

### Frontend can't connect to backend
- Check CORS settings in backend
- Verify `VITE_API_URL` environment variable
- Check browser console for errors

### MongoDB connection failed
- Verify password is URL-encoded (`@` → `%40`)
- Check MongoDB Atlas network access settings
- Confirm connection string is correct

### Slow performance
- Normal for free tier - first request takes time
- Use UptimeRobot to keep backend active

---

## 🚀 Ready to Deploy?

Run these commands:
```bash
cd "C:\Users\sdhan\Downloads\Disaster system (3)\Disaster system\pronto-response-main"
git add .
git commit -m "Ready for deployment"
git push origin main
```

Then follow Steps 2-5 above! 🎉
