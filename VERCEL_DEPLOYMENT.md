# Deploy Frontend to Vercel - Step-by-Step Guide

## 📋 Prerequisites

- ✅ Backend deployed on Render
- ✅ Backend URL available (e.g., `https://me-api-playground-backend.onrender.com`)
- ✅ GitHub repository: https://github.com/Monu01123/Me-Api-Playground.git
- ✅ Frontend code in `frontend/` directory

## 🚀 Deployment Steps

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub account

### Step 2: Import Project

1. After logging in, you'll see the Vercel dashboard
2. Click **"Add New..."** button (top right)
3. Select **"Project"**
4. You'll see **"Import Git Repository"** section
5. Find **"Me-Api-Playground"** repository
6. Click **"Import"**

### Step 3: Configure Project

#### Framework Preset
- Vercel should **auto-detect** "Create React App"
- If not, select **"Create React App"** from dropdown

#### Root Directory
- Click **"Edit"** next to Root Directory
- Type: `frontend`
- ⚠️ **IMPORTANT:** This tells Vercel where your frontend code is

#### Build and Output Settings
These should be auto-filled, but verify:
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Install Command:** `npm install`

### Step 4: Add Environment Variables

This is the **MOST IMPORTANT** step!

1. Expand **"Environment Variables"** section
2. Click **"Add"** or the input field

Add this variable:

- **Name:** `REACT_APP_API_URL`
- **Value:** `https://your-backend-url.onrender.com`
  - ⚠️ Replace with your actual Render backend URL
  - ⚠️ **NO trailing slash!**
  - Example: `https://me-api-playground-backend.onrender.com`

3. Leave **"Environment"** as: `Production, Preview, and Development` (all selected)

### Step 5: Deploy

1. Click **"Deploy"** button
2. Vercel will start building your application
3. You'll see the build logs in real-time

**Build process takes 1-3 minutes:**
- Installing dependencies
- Building React app
- Optimizing assets
- Deploying to CDN

### Step 6: Verify Deployment

Once deployment is complete (you'll see confetti 🎉):

1. **Click "Visit"** or copy the deployment URL
   - Format: `https://me-api-playground.vercel.app` or similar

2. **Test the application:**
   - **Profile page** should load with your data
   - **Projects page** should show projects with skill filter
   - **Search page** should work

3. **Check browser console** (F12):
   - Should see no errors
   - API calls should go to your Render backend URL

### Step 7: Test All Features

Visit your deployed app and test:

- ✅ **Profile Page** (`/`)
  - Shows your name, email, bio
  - Displays education, skills, work experience
  - Social links work

- ✅ **Projects Page** (`/projects`)
  - Lists all projects
  - Skill filter dropdown works
  - Filtering by skill shows correct projects

- ✅ **Search Page** (`/search`)
  - Search box works
  - Returns results from profile, projects, skills

---

## 🔧 Troubleshooting

### Frontend Shows "Failed to fetch" or API Errors?

**Check Environment Variable:**
1. In Vercel dashboard, go to your project
2. Click **"Settings"** tab
3. Click **"Environment Variables"** (left sidebar)
4. Verify `REACT_APP_API_URL` is set correctly
5. If you change it, you need to **redeploy**:
   - Go to **"Deployments"** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

**Check Backend CORS:**
Your backend should allow requests from your Vercel domain. The current CORS config allows all origins, so this should work.

### Build Failed?

**Common Issues:**

1. **"Cannot find module"**
   - Make sure `Root Directory` is set to `frontend`
   - Check that `package.json` is in the frontend folder

2. **"Build script not found"**
   - Verify `package.json` has `"build": "react-scripts build"`

3. **"Out of memory"**
   - This is rare on Vercel, but if it happens:
   - Go to Settings → Environment Variables
   - Add: `NODE_OPTIONS` = `--max_old_space_size=4096`

### Blank Page After Deployment?

1. **Check browser console** (F12) for errors
2. **Common causes:**
   - `REACT_APP_API_URL` not set correctly
   - Backend not responding (check Render deployment)
   - CORS issues (check backend logs)

### API Calls Failing?

1. **Open browser DevTools** (F12)
2. Go to **"Network"** tab
3. Refresh the page
4. Look for API calls (should go to your Render URL)
5. Click on failed requests to see error details

**If API calls go to wrong URL:**
- Environment variable might be wrong
- Redeploy after fixing

---

## 📝 After Deployment

### 1. Save Your Frontend URL

Your frontend is now live at:
```
https://your-project-name.vercel.app
```

### 2. Custom Domain (Optional)

Want a custom domain like `myportfolio.com`?

1. Go to **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain
4. Follow DNS configuration instructions

### 3. Update README.md

Update your README with live URLs:

```markdown
**Live URLs:**
- Frontend: https://your-project-name.vercel.app
- Backend API: https://your-backend-url.onrender.com

**Resume:** [Your resume link]
```

### 4. Commit and Push README Changes

```bash
git add README.md
git commit -m "Update README with live deployment URLs"
git push origin main
```

---

## ⚙️ Vercel Features

### Automatic Deployments

Every time you push to GitHub:
- Vercel automatically builds and deploys
- You get a preview URL for each commit
- Main branch deploys to production

### Preview Deployments

- Every pull request gets its own preview URL
- Test changes before merging
- Share preview links with others

### Analytics (Optional)

- Go to **"Analytics"** tab
- See visitor stats, performance metrics
- Available on free tier with limits

### Logs

- Go to **"Deployments"** tab
- Click on any deployment
- View build logs and runtime logs

---

## 🎯 Deployment Checklist

- [ ] Vercel account created with GitHub
- [ ] Project imported from GitHub
- [ ] Root directory set to `frontend`
- [ ] Environment variable `REACT_APP_API_URL` added with Render backend URL
- [ ] Project deployed successfully
- [ ] Visited deployment URL - site loads
- [ ] Profile page works and shows data
- [ ] Projects page works with filtering
- [ ] Search page works
- [ ] No console errors in browser
- [ ] Frontend URL saved
- [ ] README.md updated with live URLs
- [ ] Changes pushed to GitHub

---

## 🔄 Making Updates

### To update your deployed app:

1. **Make changes locally**
2. **Test locally:**
   ```bash
   cd frontend
   npm start
   ```
3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
4. **Vercel automatically deploys** (takes 1-2 minutes)
5. **Visit your site** to see changes

---

## 📊 Final Testing

After both deployments are complete:

### Test Complete Flow:

1. **Visit your Vercel URL**
2. **Open browser DevTools** (F12)
3. **Go to Network tab**
4. **Navigate through all pages:**
   - Profile → Should fetch from Render backend
   - Projects → Should fetch and filter from backend
   - Search → Should search via backend API

5. **Verify all API calls:**
   - Should go to `https://your-backend.onrender.com`
   - Should return 200 status codes
   - Should return correct data

### Share Your URLs:

**For Process Venue submission:**
- ✅ GitHub: https://github.com/Monu01123/Me-Api-Playground.git
- ✅ Frontend: https://your-project.vercel.app
- ✅ Backend: https://your-backend.onrender.com
- ✅ Resume: [Add your link]

---

## ⚠️ Important Notes

### Free Tier Limits

**Vercel Free Tier:**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Enough for this project!

**Render Free Tier (Backend):**
- ⚠️ Sleeps after 15 minutes
- ⚠️ First request takes 30-60 seconds to wake
- Solution: Use UptimeRobot to ping every 10 minutes

### Performance Tips

1. **Backend Wake-up:**
   - First load might be slow (backend waking up)
   - Subsequent loads will be fast

2. **Caching:**
   - Vercel caches static assets globally
   - Your React app loads instantly
   - API calls depend on Render backend

---

## 🎉 Congratulations!

Your full-stack MERN application is now **LIVE** on the internet!

**What you've accomplished:**
- ✅ Built a complete MERN stack application
- ✅ Deployed backend to Render
- ✅ Deployed frontend to Vercel
- ✅ Connected MongoDB Atlas cloud database
- ✅ Made it accessible worldwide

**Ready for submission!** 🚀

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Community:** https://github.com/vercel/vercel/discussions
- **Vercel Support:** support@vercel.com

**Good luck with your deployment!** 🎊
