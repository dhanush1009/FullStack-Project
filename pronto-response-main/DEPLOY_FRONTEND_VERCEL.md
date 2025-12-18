# 🚀 Frontend Deployment to Vercel - Quick Guide

## ✅ Prerequisites
- ✅ Backend deployed to Render (from Step 2)
- ✅ Backend URL: `https://disaster-backend.onrender.com`
- ✅ GitHub repository: dhanush1009/FullStack-Project

---

## 📦 Step 1: Prepare Frontend for Vercel

### Already Done! ✅
- vercel.json configuration created
- API config updated to use environment variables
- Code ready to deploy

---

## 🎨 Step 2: Deploy to Vercel

### Method 1: Using Vercel Dashboard (Recommended)

#### 2.1 Sign Up/Login
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your repositories

#### 2.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Find and select: **dhanush1009/FullStack-Project**
3. Click **"Import"**

#### 2.3 Configure Project
**Framework Preset:** Vite

**Root Directory:** 
- Click **"Edit"**
- Enter: `pronto-response-main`
- Click **"Continue"**

**Build Settings:**
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

#### 2.4 Add Environment Variable
Click **"Environment Variables"** section:

**Name:** `VITE_API_URL`

**Value:** `https://disaster-backend.onrender.com`

(Replace with your actual Render backend URL from Step 2)

Click **"Add"**

#### 2.5 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://disaster-frontend.vercel.app`

---

### Method 2: Using Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project
cd "C:\Users\sdhan\Downloads\Disaster system (3)\Disaster system\pronto-response-main"

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# Set up and deploy? Yes
# Which scope? Select your account
# Link to existing project? No
# Project name? disaster-frontend
# Directory? ./
# Override settings? No

# Add environment variable
vercel env add VITE_API_URL production
# Paste: https://disaster-backend.onrender.com

# Deploy to production
vercel --prod
```

---

## 🔧 Step 3: Update Backend CORS

After deployment, you need to allow your Vercel frontend to access the backend.

### 3.1 Update Backend CORS Configuration

In your Render backend dashboard:

1. Go to your backend service: **disaster-backend**
2. Click **"Environment"** tab
3. Add new environment variable:

**Name:** `FRONTEND_URL`

**Value:** `https://disaster-frontend.vercel.app`

(Use your actual Vercel URL)

### 3.2 Or Update server.js Directly

Add your Vercel URL to CORS origins in `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:8081',
    'https://disaster-frontend.vercel.app'  // Add your Vercel URL
  ],
  credentials: true
}));
```

Then commit and push:
```bash
git add .
git commit -m "Add Vercel URL to CORS"
git push origin main
```

Render will automatically redeploy your backend.

---

## ✅ Step 4: Test Your Deployment

### 4.1 Test Backend
Visit: `https://disaster-backend.onrender.com/api/health`

Should return:
```json
{"status": "OK"}
```

**Note:** First request may take 30-60 seconds as the free tier spins up.

### 4.2 Test Frontend
1. Visit your Vercel URL: `https://disaster-frontend.vercel.app`
2. Open browser console (F12) to check for errors
3. Try to register a new user
4. Check MongoDB Atlas to verify data was saved

### 4.3 Full Flow Test
1. ✅ Register as a user
2. ✅ Login with credentials
3. ✅ Send an SOS alert
4. ✅ Check volunteer dashboard
5. ✅ Verify data in MongoDB Atlas

---

## 📱 Your Deployed URLs

- **Frontend (Vercel):** `https://disaster-frontend.vercel.app`
- **Backend (Render):** `https://disaster-backend.onrender.com`
- **Database:** MongoDB Atlas ✅

---

## 🎯 Quick Checklist

- [ ] Backend deployed to Render
- [ ] Backend URL copied
- [ ] Signed up/logged in to Vercel
- [ ] Imported GitHub repository
- [ ] Set root directory to `pronto-response-main`
- [ ] Added `VITE_API_URL` environment variable
- [ ] Deployed frontend
- [ ] Updated backend CORS with Vercel URL
- [ ] Tested registration and login
- [ ] Verified MongoDB connection

---

## 🔄 Redeploying After Changes

### Automatic Deployment
Vercel automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will detect the changes and rebuild automatically! 🎉

### Manual Redeploy
1. Go to Vercel dashboard
2. Select your project
3. Click **"Deployments"**
4. Click **"Redeploy"** on the latest deployment

---

## ⚠️ Common Issues

### Issue: "Failed to fetch" errors
**Solution:** Check CORS settings in backend - make sure Vercel URL is allowed

### Issue: Backend is slow
**Solution:** Normal for Render free tier - first request takes 30-60 seconds

### Issue: Build fails on Vercel
**Solution:** 
- Check build logs for specific error
- Verify `vercel.json` is in the root directory
- Make sure `VITE_API_URL` is set in environment variables

### Issue: API calls not working
**Solution:**
- Open browser console (F12)
- Check Network tab for failed requests
- Verify `VITE_API_URL` environment variable is correct
- Make sure backend is running (visit backend URL)

---

## 💰 Cost

**100% FREE! 🎉**

- ✅ Vercel: Free tier includes unlimited bandwidth
- ✅ Render: Free tier for backend (spins down after 15 min)
- ✅ MongoDB Atlas: Free 512MB
- ✅ No credit card required!

---

## 🚀 Ready to Deploy?

1. **Backend:** Follow Step 2 from the main guide
2. **Frontend:** Follow this guide above
3. **Test:** Use your deployed URLs!

Your disaster management system will be live and accessible worldwide! 🌍✨
