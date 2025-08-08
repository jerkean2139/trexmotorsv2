# Netlify Environment Variable Setup

## Current Issue
The Netlify deployment shows "Admin Not Available" because the `VITE_ENABLE_ADMIN` environment variable is not set.

## Steps to Fix:

### 1. Add Environment Variable in Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Find your `trexmotorsrichmond` site
3. Go to **Site Settings** → **Environment variables**
4. Click **Add a variable**
5. Add:
   - **Key:** `VITE_ENABLE_ADMIN`
   - **Value:** `true`
6. **Save** the variable

### 2. Redeploy the Site
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for deployment to complete

### 3. Test Admin Functionality
After redeployment:
- Visit `trexmotorsrichmond.netlify.app/admin`
- Should see green "Production Admin Mode" banner
- Login button should be enabled
- Console should show `isAdminEnabled: true`

## What Will Happen:
- ✅ Admin form will be enabled
- ✅ Green production banner will appear
- ⚠️ Backend calls will still fail due to Vercel SSO issue
- 🎯 Next: Fix Vercel authentication

The frontend will work, but you'll need to disable Vercel project authentication for full functionality.