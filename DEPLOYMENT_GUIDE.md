# 🚀 Deployment Guide - Disaster Management System

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Frontend Deployment](#frontend-deployment)
4. [Backend Deployment](#backend-deployment)
5. [Database Setup](#database-setup)
6. [Environment Variables](#environment-variables)
7. [Testing Checklist](#testing-checklist)

---

## 🔧 Prerequisites

### Required Software
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: v6.0 or higher (local or MongoDB Atlas)
- **Git**: Latest version

### Required Accounts
- **Gmail Account** (for email notifications)
  - Enable 2-Step Verification
  - Generate App Password
- **Twilio Account** (for SMS alerts)
  - Account SID
  - Auth Token
  - Phone number
- **MongoDB Atlas** (for cloud database - optional)

---

## 💻 Local Development Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd pronto-response-main
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev
```

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (see Environment Variables section)
# Start the server (runs on http://localhost:5000)
npm start
```

### 4. MongoDB Setup (Local)
```bash
# Install MongoDB locally
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB service
# Windows: net start MongoDB
# Mac/Linux: sudo systemctl start mongod

# Verify connection
mongosh
```

---

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

#### Step 1: Prepare for Deployment
```bash
# Build the project
npm run build

# Test the build locally
npm run preview
```

#### Step 2: Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Step 3: Configure Environment Variables in Vercel
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add: `VITE_API_URL=https://your-backend-url.com`

### Option 2: Netlify

#### Deploy via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

#### Configure Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Environment variables**: Add `VITE_API_URL`

### Option 3: GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

---

## 🖥️ Backend Deployment

### Option 1: Railway (Recommended)

#### Step 1: Prepare Backend
```bash
cd backend

# Ensure package.json has start script
# "scripts": { "start": "node server.js" }
```

#### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set root directory to `/backend`
5. Add environment variables (see below)
6. Deploy!

#### Step 3: Add MongoDB
1. In Railway project, click "New" → "Database" → "MongoDB"
2. Copy connection string
3. Update `MONGODB_URI` in environment variables

### Option 2: Render

#### Step 1: Create Web Service
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### Step 2: Add Environment Variables
Add all variables from `.env` file in Render dashboard

#### Step 3: Add MongoDB
1. Create new MongoDB instance in Render
2. Copy connection string
3. Update `MONGODB_URI`

### Option 3: Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
cd backend
heroku create your-app-name

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password
heroku config:set TWILIO_ACCOUNT_SID=your-sid
heroku config:set TWILIO_AUTH_TOKEN=your-token

# Deploy
git push heroku main
```

### Option 4: VPS (DigitalOcean, AWS, etc.)

```bash
# SSH into your server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
# Follow MongoDB installation guide for your OS

# Clone repository
git clone <your-repo-url>
cd pronto-response-main/backend

# Install dependencies
npm install

# Install PM2 for process management
sudo npm install -g pm2

# Create .env file
nano .env
# (Paste your environment variables)

# Start with PM2
pm2 start server.js --name disaster-backend
pm2 startup
pm2 save

# Setup Nginx reverse proxy (optional)
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/default
# Configure proxy to localhost:5000
sudo systemctl restart nginx
```

---

## 🗄️ Database Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)

#### Step 1: Create Cluster
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up / Log in
3. Create a new cluster (Free tier available)
4. Choose region closest to your users

#### Step 2: Configure Access
1. Database Access → Add New Database User
   - Username: `admin`
   - Password: (generate strong password)
   - Role: `Atlas Admin`

2. Network Access → Add IP Address
   - Add `0.0.0.0/0` (allow from anywhere)
   - Or add specific IPs for security

#### Step 3: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with your database password
5. Update `MONGODB_URI` in your environment variables

Example:
```
mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/disasterApp?retryWrites=true&w=majority
```

### Option 2: Local MongoDB

```bash
# Install MongoDB
# Windows: Download installer from mongodb.com
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Connection string for local:
MONGODB_URI=mongodb://localhost:27017/disasterApp
```

---

## 🔐 Environment Variables

### Frontend (.env)
```env
# API Base URL (update after backend deployment)
VITE_API_URL=http://localhost:5000

# For production:
# VITE_API_URL=https://your-backend-url.com
```

### Backend (.env)
```env
# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/disasterApp
# Or for Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/disasterApp

# Server Configuration
PORT=5000
NODE_ENV=production

# Twilio Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token-here
TWILIO_PHONE_NUMBER=+1234567890

# Optional
ADMIN_EMAIL=aravinthl266@gmail.com
LATITUDE=12.9716
LONGITUDE=77.5946
```

### How to Get Gmail App Password
1. Go to Google Account Settings
2. Security → 2-Step Verification (enable if not enabled)
3. App passwords → Select app: Mail, Select device: Other
4. Generate and copy the 16-digit password
5. Use this password in `EMAIL_PASS`

### How to Get Twilio Credentials
1. Sign up at [twilio.com](https://www.twilio.com)
2. Dashboard → Account Info
3. Copy Account SID and Auth Token
4. Get a phone number from Twilio Console

---

## ✅ Testing Checklist

### Pre-Deployment Tests

#### Frontend
- [ ] `npm run build` completes without errors
- [ ] `npm run preview` shows working application
- [ ] All routes are accessible
- [ ] Forms submit correctly
- [ ] Maps load properly
- [ ] Responsive design works on mobile

#### Backend
- [ ] Server starts without errors
- [ ] MongoDB connection successful
- [ ] All API endpoints respond correctly
- [ ] Email sending works
- [ ] SMS sending works (if configured)
- [ ] File uploads work
- [ ] CORS configured for frontend domain

### Post-Deployment Tests

#### Authentication
- [ ] User signup works
- [ ] User login works
- [ ] Volunteer login works
- [ ] Admin login works (aravinthl266@gmail.com / Arvind@l123)
- [ ] Role-based redirects work

#### Emergency System
- [ ] SOS button sends emergency alerts
- [ ] Email notifications sent to admin
- [ ] SMS alerts sent (if configured)
- [ ] Emergency appears in admin dashboard
- [ ] Auto-assignment of volunteers works

#### Volunteer Management
- [ ] Volunteer registration works
- [ ] Volunteers appear in admin dashboard
- [ ] Task assignment works
- [ ] Email notifications sent to volunteers
- [ ] Task submission with proof upload works
- [ ] Admin can approve tasks

#### Shelter System
- [ ] Shelter map loads correctly
- [ ] All 25 shelters display
- [ ] Shelter details are accurate
- [ ] Contact information is correct

#### General
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Toast notifications appear
- [ ] Data persists in database
- [ ] Real-time updates work

---

## 🔄 Update & Maintenance

### Updating Frontend
```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Build and deploy
npm run build
vercel --prod  # or your deployment method
```

### Updating Backend
```bash
# Pull latest changes
git pull origin main

# Install new dependencies
cd backend
npm install

# Restart server
pm2 restart disaster-backend  # if using PM2
# or redeploy on Railway/Render
```

### Database Backup (MongoDB Atlas)
1. Go to Atlas Dashboard
2. Clusters → ... → Create Snapshot
3. Schedule automatic backups in settings

### Database Backup (Local)
```bash
# Backup
mongodump --db disasterApp --out ./backup

# Restore
mongorestore --db disasterApp ./backup/disasterApp
```

---

## 🐛 Troubleshooting

### Common Issues

#### Frontend can't connect to backend
- Check `VITE_API_URL` is correct
- Verify CORS is configured in backend
- Check backend is running and accessible

#### Email not sending
- Verify Gmail App Password is correct
- Check 2-Step Verification is enabled
- Ensure EMAIL_USER and EMAIL_PASS are set

#### MongoDB connection failed
- Check connection string format
- Verify IP whitelist in Atlas
- Ensure MongoDB service is running (local)

#### SMS not sending
- Verify Twilio credentials
- Check phone number format (+1234567890)
- Ensure Twilio account has credits

#### Build errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`
- Check Node.js version: `node --version`

---

## 📊 Performance Optimization

### Frontend
```bash
# Analyze bundle size
npm run build -- --mode analyze

# Optimize images in /public
# Use WebP format
# Compress images before upload
```

### Backend
```javascript
// Add compression middleware
import compression from 'compression';
app.use(compression());

// Add rate limiting
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);
```

### Database
```javascript
// Add indexes for better query performance
volunteerSchema.index({ email: 1 });
emergencySchema.index({ time: -1 });
```

---

## 🔒 Security Best Practices

1. **Never commit .env files** - Add to .gitignore
2. **Use strong passwords** - For database and admin accounts
3. **Enable HTTPS** - Use SSL certificates (Let's Encrypt)
4. **Sanitize inputs** - Prevent XSS and SQL injection
5. **Rate limiting** - Prevent DDoS attacks
6. **Regular updates** - Keep dependencies updated
7. **Backup regularly** - Database and code backups
8. **Monitor logs** - Check for suspicious activity

---

## 📞 Support

For deployment issues or questions:
- Check documentation: README.md, PROJECT_SUMMARY.md
- Review error logs in deployment platform
- Check MongoDB Atlas logs
- Contact admin: aravinthl266@gmail.com

---

**🎉 Your disaster management system is now ready for deployment!**
