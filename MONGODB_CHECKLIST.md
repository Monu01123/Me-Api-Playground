# MongoDB Atlas Configuration Checklist

Since network access is already added but you're still getting connection errors, please verify these settings:

## 1. Database User Permissions ⚠️

**Check in MongoDB Atlas → Database Access:**

- [ ] User `monumeena0112_db_user` exists
- [ ] User has **"Atlas admin"** OR **"Read and write to any database"** privilege
- [ ] Password is exactly: `Monu8875@`
- [ ] Authentication Method is: **Password** (not SCRAM)

**If user doesn't have correct permissions:**
1. Click **Edit** on the user
2. Under **Database User Privileges**, select **"Built-in Role"**
3. Choose **"Atlas admin"** from dropdown
4. Click **Update User**

## 2. Cluster Status

**Check in MongoDB Atlas → Database (Clusters):**

- [ ] Cluster0 status shows **green** (Active/Running)
- [ ] Cluster is NOT paused
- [ ] Cluster is NOT in "Creating" or "Updating" state

**If cluster is paused:**
1. Click the **"..."** menu on cluster
2. Click **Resume**
3. Wait 2-3 minutes for cluster to become active

## 3. Network Access Details

**Check in MongoDB Atlas → Network Access:**

- [ ] There is an entry for `0.0.0.0/0`
- [ ] Status shows **Active** (green checkmark)
- [ ] Entry is NOT expired or pending

**Correct entry should look like:**
```
IP Address: 0.0.0.0/0
Comment: Allow access from anywhere
Status: Active ✓
```

## 4. Connection String Verification

**Get fresh connection string:**

1. Go to **Database** → Click **Connect** on Cluster0
2. Choose **"Connect your application"**
3. Driver: **Node.js**
4. Version: **4.1 or later**
5. Copy the connection string shown

**It should look like:**
```
mongodb+srv://monumeena0112_db_user:<password>@cluster0.rqsejff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

## 5. Alternative: Create New Simple User

If the above doesn't work, try creating a new user with a simple password:

1. Go to **Database Access**
2. Click **Add New Database User**
3. **Username:** `testuser`
4. **Password:** `Test1234` (simple, no special characters)
5. **Database User Privileges:** **Atlas admin**
6. Click **Add User**
7. Wait for user to become active

Then update your `.env`:
```env
MONGODB_URI=mongodb+srv://testuser:Test1234@cluster0.rqsejff.mongodb.net/?retryWrites=true&w=majority
```

## 6. Check MongoDB Atlas Service Status

- Visit: https://status.mongodb.com/
- Verify no ongoing outages or issues

## 7. Test Connection from MongoDB Compass (Optional)

Download MongoDB Compass: https://www.mongodb.com/try/download/compass

Test connection string:
```
mongodb+srv://monumeena0112_db_user:Monu8875%40@cluster0.rqsejff.mongodb.net/
```

If Compass can connect, the issue is with the Node.js driver configuration.

---

## Quick Test After Fixing

Once you've verified the above, restart the backend:

```powershell
# In backend terminal, type:
rs

# Then test:
Invoke-RestMethod -Uri http://localhost:5000/health
```

**Expected output when working:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-..."
}
```

---

## Most Common Issues (in order):

1. ✅ **Database user doesn't have "Atlas admin" privilege** ← Check this first!
2. ✅ **Cluster is paused**
3. ✅ **Password has special characters causing encoding issues**
4. Network access not configured (you said this is done)

Please go through this checklist and let me know what you find!
