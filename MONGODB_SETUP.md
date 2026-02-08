# Quick Start Guide - MongoDB Atlas Setup

## Current Status

✅ **Backend Server:** Ready (waiting for MongoDB connection)  
✅ **Frontend Server:** Running on http://localhost:3000  
❌ **Database:** Not connected (needs MongoDB Atlas setup)

---

## Step 1: Create MongoDB Atlas Account (5 minutes)

1. **Go to MongoDB Atlas:**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up with email or Google account (FREE)

2. **Create a Free Cluster:**
   - Choose **M0 Sandbox** (FREE tier)
   - Select a cloud provider (AWS recommended)
   - Choose a region closest to you
   - Click **Create Cluster** (takes 3-5 minutes)

---

## Step 2: Configure Database Access

1. **Create Database User:**
   - In Atlas dashboard, click **Database Access** (left sidebar)
   - Click **Add New Database User**
   - Choose **Password** authentication
   - Username: `meapi_user` (or your choice)
   - Password: Click **Autogenerate Secure Password** and **COPY IT**
   - User Privileges: **Read and write to any database**
   - Click **Add User**

2. **Save your credentials:**
   ```
   Username: meapi_user
   Password: [paste the copied password here]
   ```

---

## Step 3: Configure Network Access

1. **Allow Access from Anywhere:**
   - Click **Network Access** (left sidebar)
   - Click **Add IP Address**
   - Click **Allow Access from Anywhere** (0.0.0.0/0)
   - Click **Confirm**
   - Wait for status to become **Active**

---

## Step 4: Get Connection String

1. **Get your connection string:**
   - Go to **Database** (left sidebar)
   - Click **Connect** on your cluster
   - Choose **Connect your application**
   - Driver: **Node.js**, Version: **4.1 or later**
   - Copy the connection string (looks like this):
   ```
   mongodb+srv://meapi_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

2. **Replace `<password>` with your actual password**

---

## Step 5: Update Backend Configuration

1. **Open your backend `.env` file:**
   ```
   File: c:\Users\monum\OneDrive\Desktop\Projects\Assignments\8 assignment\backend\.env
   ```

2. **Update the MONGODB_URI:**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb+srv://meapi_user:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/me-api-playground?retryWrites=true&w=majority
   ```
   
   **Important:** Replace `YOUR_PASSWORD_HERE` with your actual password!

3. **Save the file**

---

## Step 6: Restart Backend & Seed Database

1. **The backend will auto-restart** (nodemon is watching for changes)
   - Check the terminal - you should see: `MongoDB Connected: cluster0...`

2. **Seed the database** (in a new terminal):
   ```bash
   cd "c:\Users\monum\OneDrive\Desktop\Projects\Assignments\8 assignment\backend"
   npm run seed
   ```

---

## Step 7: Open the App

1. **Open your browser and go to:**
   ```
   http://localhost:3000
   ```

2. **You should see:**
   - Profile page with your information
   - Navigation bar with Profile, Projects, Search
   - All data loaded from MongoDB

---

## Troubleshooting

### Backend still not connecting?
- Check that password in `.env` has no special characters that need escaping
- Make sure there are no spaces in the connection string
- Verify Network Access shows 0.0.0.0/0 as Active

### Frontend shows errors?
- Make sure backend is running (check terminal)
- Check browser console (F12) for errors
- Verify `REACT_APP_API_URL=http://localhost:5000` in frontend/.env

### Need help?
- Check backend terminal for error messages
- Check frontend terminal for compilation errors
- Verify MongoDB Atlas cluster is running (green status)

---

## Quick Commands Reference

```bash
# Start backend (if not running)
cd "c:\Users\monum\OneDrive\Desktop\Projects\Assignments\8 assignment\backend"
npm run dev

# Start frontend (if not running)
cd "c:\Users\monum\OneDrive\Desktop\Projects\Assignments\8 assignment\frontend"
npm start

# Seed database
cd "c:\Users\monum\OneDrive\Desktop\Projects\Assignments\8 assignment\backend"
npm run seed

# Test backend API
Invoke-WebRequest -Uri http://localhost:5000/health -UseBasicParsing
Invoke-WebRequest -Uri http://localhost:5000/api/profile -UseBasicParsing
```

---

**Next:** After setup is complete, you can update your profile data in `backend/data/profile-data.json` and re-run `npm run seed`!
