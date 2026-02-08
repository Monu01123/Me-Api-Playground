# Deploy Backend to Render - Step-by-Step Guide

## 📋 Prerequisites

- ✅ GitHub repository created: https://github.com/Monu01123/Me-Api-Playground.git
- ✅ MongoDB Atlas database configured
- ✅ Code pushed to GitHub

## 🚀 Deployment Steps

### Step 1: Create Render Account

1. Go to https://render.com
2. Click **"Get Started for Free"**
3. Sign up with:
   - GitHub account (recommended - easier integration)
   - OR email/password

### Step 2: Create New Web Service

1. **After logging in**, click **"New +"** button (top right)
2. Select **"Web Service"**
3. Click **"Build and deploy from a Git repository"**
4. Click **"Next"**

### Step 3: Connect GitHub Repository

1. Click **"Connect account"** under GitHub
2. Authorize Render to access your GitHub
3. You'll see a list of your repositories
4. Find **"Me-Api-Playground"** and click **"Connect"**

### Step 4: Configure Web Service

Fill in the following settings:

#### Basic Settings
- **Name:** `me-api-playground-backend` (or your choice)
  - This will be part of your URL: `https://me-api-playground-backend.onrender.com`
- **Region:** Choose closest to you (e.g., Singapore, Oregon)
- **Branch:** `main`
- **Root Directory:** `backend`
  - ⚠️ **IMPORTANT:** Type `backend` here (this tells Render where your backend code is)

#### Build & Deploy Settings
- **Runtime:** `Node`
- **Build Command:** 
  ```bash
  npm install
  ```
- **Start Command:**
  ```bash
  npm start
  ```

#### Instance Type
- **Free** (select the free tier)
  - Note: Free tier sleeps after 15 minutes of inactivity

### Step 5: Add Environment Variables

Scroll down to **"Environment Variables"** section and click **"Add Environment Variable"**

Add these **3 variables**:

1. **Variable 1:**
   - Key: `NODE_ENV`
   - Value: `production`

2. **Variable 2:**
   - Key: `PORT`
   - Value: `5000`

3. **Variable 3:**
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://monumeena0112_db_user:r00doOby5QPekwx9@cluster0.rqsejff.mongodb.net/?retryWrites=true&w=majority`
   - ⚠️ **Use your actual MongoDB Atlas connection string**

### Step 6: Deploy

1. Click **"Create Web Service"** button at the bottom
2. Render will start building your application
3. You'll see the build logs in real-time

**Build process takes 2-5 minutes:**
- Installing dependencies
- Starting the server
- Health checks

### Step 7: Verify Deployment

Once deployment is complete (status shows **"Live"**):

1. **Copy your service URL** (e.g., `https://me-api-playground-backend.onrender.com`)

2. **Test the health endpoint:**
   - Open in browser: `https://your-service-name.onrender.com/health`
   - Should return:
     ```json
     {
       "status": "OK",
       "message": "Server is running",
       "timestamp": "..."
     }
     ```

3. **Test the profile endpoint:**
   - Open: `https://your-service-name.onrender.com/api/profile`
   - Should return your profile data

### Step 8: Seed Production Database (if needed)

If your production database is empty:

1. In Render dashboard, go to your service
2. Click **"Shell"** tab (top menu)
3. Run:
   ```bash
   npm run seed
   ```

---

## 🔧 Troubleshooting

### Build Failed?

**Check Build Logs:**
1. In Render dashboard, click on your service
2. Go to **"Logs"** tab
3. Look for error messages

**Common Issues:**

1. **"Cannot find module"**
   - Make sure `Root Directory` is set to `backend`
   - Check that `package.json` is in the backend folder

2. **"MongoDB connection failed"**
   - Verify `MONGODB_URI` environment variable is correct
   - Check MongoDB Atlas Network Access allows all IPs (0.0.0.0/0)
   - Verify database user has correct permissions

3. **"Port already in use"**
   - Make sure `PORT` environment variable is set to `5000`
   - Render automatically assigns a port, your app should use `process.env.PORT`

### Service Not Starting?

1. Check **"Events"** tab for deployment status
2. Check **"Logs"** tab for runtime errors
3. Verify all environment variables are set correctly

### MongoDB Connection Issues?

1. **Go to MongoDB Atlas:**
   - Database Access → Verify user exists and has permissions
   - Network Access → Verify 0.0.0.0/0 is allowed

2. **Test connection string locally:**
   ```bash
   # Update your local .env with production MONGODB_URI
   npm run seed
   ```

---

## 📝 After Deployment

### 1. Save Your Backend URL

Your backend is now live at:
```
https://your-service-name.onrender.com
```

**Example endpoints:**
- Health: `https://your-service-name.onrender.com/health`
- Profile: `https://your-service-name.onrender.com/api/profile`
- Projects: `https://your-service-name.onrender.com/api/projects`
- Search: `https://your-service-name.onrender.com/api/search?q=react`

### 2. Update Frontend Configuration

You'll need this URL when deploying your frontend to Vercel.

### 3. Update README.md

Add your live backend URL to the README:
```markdown
**Live URLs:**
- Frontend: [To be deployed on Vercel]
- Backend API: https://your-service-name.onrender.com
```

---

## ⚠️ Important Notes

### Free Tier Limitations

- **Sleeps after 15 minutes** of inactivity
- First request after sleep takes **30-60 seconds** to wake up
- **750 hours/month** of runtime (enough for one service)

### Keeping Service Awake (Optional)

Use a service like **UptimeRobot** or **Cron-job.org** to ping your health endpoint every 10 minutes:
```
https://your-service-name.onrender.com/health
```

### Monitoring

- **Logs:** View real-time logs in Render dashboard
- **Metrics:** Check CPU, memory usage in "Metrics" tab
- **Events:** See deployment history in "Events" tab

---

## ✅ Deployment Checklist

- [ ] Render account created
- [ ] GitHub repository connected
- [ ] Web service created with correct settings
- [ ] Root directory set to `backend`
- [ ] All environment variables added
- [ ] Service deployed successfully (status: Live)
- [ ] Health endpoint tested and working
- [ ] Profile endpoint tested and working
- [ ] Backend URL saved for frontend deployment
- [ ] README updated with live URL

---

## 🎯 Next Step: Deploy Frontend to Vercel

Once your backend is deployed and working, you can deploy the frontend to Vercel.

Would you like a guide for deploying the frontend to Vercel next?

---

## 📞 Need Help?

- **Render Docs:** https://render.com/docs
- **Render Community:** https://community.render.com
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com

**Good luck with your deployment!** 🚀
