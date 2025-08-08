# Vercel Deployment Plan - Frontend + Backend

## Current Status
- ✅ Backend already deployed on Vercel: `admin-backend-etkz45d8r-jeremys-projects-0f68a4ab.vercel.app`
- ⚠️ Frontend on Netlify having environment variable issues
- 🎯 Goal: Move frontend to Vercel for unified deployment

## Step 1: Prepare Frontend for Vercel ✅

### Files Created/Updated:
- ✅ `vercel.json` - Vercel configuration for frontend
- ✅ Frontend uses relative API paths (`/api/`) - already compatible
- ✅ Build script ready (`npm run build`)

## Step 2: Environment Variables for Frontend on Vercel

### Required Variables:
```
VITE_ENABLE_ADMIN=true
```

## Step 3: Deploy Commands

### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Option B: GitHub Integration
1. Push code to GitHub
2. Connect repository in Vercel dashboard
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

## Step 4: Expected Benefits

### ✅ Solved Issues:
- Environment variables will work properly
- Unified platform (both frontend & backend on Vercel)
- No CORS issues between frontend/backend
- Simplified deployment process
- Better logging and debugging

### 🔧 API Configuration:
- Frontend uses relative paths: `/api/login`, `/api/vehicles`, etc.
- Works automatically since both are on same Vercel domain
- No need to configure VITE_API_URL

## Step 5: Testing Checklist

After Vercel deployment:
- [ ] Admin page shows green "Production Admin Mode" banner
- [ ] Login form is enabled (not "Admin Not Available")
- [ ] API calls work to backend endpoints
- [ ] Environment variables are properly loaded
- [ ] Vehicle inventory loads correctly
- [ ] Admin dashboard functions properly

## Step 6: Cleanup
- Archive Netlify deployment once Vercel is confirmed working
- Update any documentation with new Vercel URL