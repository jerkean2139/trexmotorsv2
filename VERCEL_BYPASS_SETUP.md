# T-Rex Motors - Vercel Protection Bypass Setup

## ✅ Code Updated for Protection Bypass

The frontend code has been updated to include the `x-vercel-protection-bypass` header for all API calls to the protected backend.

## 🔧 Required Steps to Complete Setup:

### Step 1: Create Bypass Secret in Backend Project
1. Go to: https://vercel.com/dashboard
2. Find project: `admin-backend` 
3. **Settings → Security → Protection Bypass for Automation**
4. Click **"Add Secret"** to generate a bypass token
5. **Copy the generated secret token**

### Step 2: Add Token to Frontend Project
1. Still in Vercel dashboard
2. Find project: `workspace` (your frontend)
3. **Settings → Environment Variables** 
4. **Add Variable:**
   - Name: `VITE_VERCEL_BYPASS_TOKEN`
   - Value: `[paste the secret from Step 1]`
5. **Save** (Vercel will auto-redeploy)

### Step 3: Add Admin Environment Variable
While in the frontend project environment variables:
- Name: `VITE_ENABLE_ADMIN` 
- Value: `true`

## 🎯 Expected Result:
After adding both environment variables:
- ✅ API calls will bypass Vercel protection using the secret header
- ✅ Frontend will connect to your backend database
- ✅ Vehicle inventory will load from live data
- ✅ Admin interface will be fully functional

## 📝 How It Works:
- Your backend stays protected from unauthorized access
- The frontend includes the bypass token in API request headers
- Vercel allows these requests to pass through to your backend
- All functionality works as intended while maintaining security

**New Production URL:** https://workspace-fcfknzdgv-jeremys-projects-0f68a4ab.vercel.app

Once you complete the environment variable setup, your production site will work exactly like your development environment!