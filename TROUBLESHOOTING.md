# MongoDB Atlas Connection Troubleshooting

## Current Error

**Error Code:** AtlasError 8000  
**Issue:** Cannot connect to MongoDB Atlas cluster

## Possible Causes & Solutions

### 1. IP Address Not Whitelisted ⚠️ (Most Likely)

**Problem:** Your current IP address is not allowed to connect to the MongoDB Atlas cluster.

**Solution:**
1. Go to MongoDB Atlas dashboard: https://cloud.mongodb.com
2. Click on **Network Access** in the left sidebar
3. Check if there's an entry for `0.0.0.0/0` (Allow access from anywhere)
4. If not, click **Add IP Address**
5. Click **Allow Access from Anywhere** button
6. Click **Confirm**
7. Wait for status to become **Active** (green checkmark)

### 2. Database User Not Configured Correctly

**Problem:** The database user doesn't have proper permissions.

**Solution:**
1. Go to **Database Access** in MongoDB Atlas
2. Find user: `monumeena0112_db_user`
3. Click **Edit**
4. Ensure **Database User Privileges** is set to: **Read and write to any database**
5. Click **Update User**

### 3. Cluster is Paused or Not Running

**Problem:** The MongoDB cluster might be paused.

**Solution:**
1. Go to **Database** (Clusters) in MongoDB Atlas
2. Check if cluster shows **Paused** status
3. If paused, click **Resume** button
4. Wait for cluster to become **Active**

### 4. Wrong Connection String

**Problem:** The connection string might be incorrect.

**Solution:**
1. In MongoDB Atlas, click **Connect** on your cluster
2. Choose **Connect your application**
3. Copy the NEW connection string
4. It should look like:
   ```
   mongodb+srv://monumeena0112_db_user:<password>@cluster0.rqsejff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
5. Replace `<password>` with: `Monu8875@`
6. Update `backend/.env` file

## Quick Fix Steps

### Step 1: Verify Network Access
```
1. Login to MongoDB Atlas
2. Network Access → Should show 0.0.0.0/0 as ACTIVE
3. If not, add it and wait for ACTIVE status
```

### Step 2: Verify Database User
```
1. Database Access → Find monumeena0112_db_user
2. Should have "Atlas admin" or "Read and write to any database"
3. Password should be: Monu8875@
```

### Step 3: Verify Cluster Status
```
1. Database (Clusters) → Cluster0 should show as ACTIVE
2. If PAUSED, click Resume
```

### Step 4: Update Connection String

Edit: `c:\Users\monum\OneDrive\Desktop\Projects\Assignments\8 assignment\backend\.env`

Try this connection string format:
```env
MONGODB_URI=mongodb+srv://monumeena0112_db_user:Monu8875%40@cluster0.rqsejff.mongodb.net/me-api-playground?retryWrites=true&w=majority
```

**Note:** The `@` in password is encoded as `%40`

### Step 5: Restart Backend

After making changes:
1. The backend should auto-restart (nodemon is watching)
2. Or manually restart by typing `rs` in the backend terminal
3. Look for message: `MongoDB Connected: cluster0...`

## Testing Connection

Once fixed, test with:

```powershell
# Test health endpoint
Invoke-RestMethod -Uri http://localhost:5000/health

# Seed database
cd "c:\Users\monum\OneDrive\Desktop\Projects\Assignments\8 assignment\backend"
npm run seed

# Test profile endpoint
Invoke-RestMethod -Uri http://localhost:5000/api/profile
```

## Expected Success Output

When working correctly, you should see:
```
MongoDB Connected: cluster0-shard-00-00.rqsejff.mongodb.net
Server is running on port 5000
Environment: development
```

## Still Not Working?

If none of the above works:

1. **Create a new database user:**
   - Go to Database Access
   - Add New Database User
   - Use a simple password (no special characters): `Password123`
   - Update `.env` with new credentials

2. **Check MongoDB Atlas status:**
   - Visit: https://status.mongodb.com/
   - Ensure no outages

3. **Try a different network:**
   - Sometimes corporate/school networks block MongoDB Atlas
   - Try using mobile hotspot

---

**Most Common Fix:** Adding `0.0.0.0/0` to Network Access whitelist! 🎯
