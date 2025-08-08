# Vercel Frontend Deployment Guide

## 🎯 Goal
Deploy the T-Rex Motors frontend to Vercel to match the existing backend, solving environment variable issues and unifying the platform.

## ✅ Preparations Complete

### Code Changes Made:
- ✅ Updated all API calls to use relative paths (`/api/`) instead of hardcoded Vercel URLs
- ✅ Fixed Header.tsx admin links to use internal routing
- ✅ Created `vercel.json` configuration file
- ✅ Updated admin.tsx to use relative API calls

### Frontend is Now Ready For:
- Local development (Replit)
- Vercel production deployment
- Unified frontend + backend on same domain

## 🚀 Deployment Steps

### Method 1: Vercel CLI (Recommended)
```bash
# Run the deployment script
chmod +x deploy-to-vercel.sh
./deploy-to-vercel.sh
```

### Method 2: Manual Steps
```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Method 3: GitHub Integration
1. Push code to GitHub repository
2. Connect repository in Vercel dashboard
3. Configure build settings automatically detected
4. Deploy on push

## ⚙️ Environment Variables

Set in Vercel Dashboard → Project Settings → Environment Variables:
```
VITE_ENABLE_ADMIN=true
```

## 🔧 Expected Configuration

Vercel will automatically detect:
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node Version:** 18 (from package.json engines)

## 📍 API Routing

Since both frontend and backend will be on the same Vercel domain:
- Frontend: `your-frontend.vercel.app/`
- API Endpoints: `your-frontend.vercel.app/api/*` (proxied to backend)

This eliminates:
- ❌ CORS issues
- ❌ Environment variable problems
- ❌ Complex API URL configuration

## 🧪 Testing Checklist

After deployment, verify:
- [ ] Admin page loads without errors
- [ ] Environment variable `VITE_ENABLE_ADMIN=true` is recognized
- [ ] Green "Production Admin Mode" banner appears
- [ ] Login form is enabled
- [ ] API calls to `/api/auth/check` work
- [ ] Vehicle inventory loads correctly
- [ ] No CORS errors in browser console

## 🎉 Success Indicators

When working properly:
- Admin page shows green banner: "Production Admin Mode: Admin functionality enabled for production environment"
- Blue debug box shows: `VITE_ENABLE_ADMIN = true`
- Login form is active (not showing "Admin Not Available")
- Console logs show environment variables correctly loaded

## 🔄 Cleanup After Success

Once Vercel frontend is confirmed working:
1. Archive/disable Netlify deployment to avoid confusion
2. Update documentation with new Vercel URL
3. Test end-to-end functionality including login and vehicle management