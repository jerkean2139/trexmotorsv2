# Admin Backend Deployment Guide

## Quick Setup for `admin.trexmotors.com`

### Option 1: Railway (Recommended)
1. Push admin-backend folder to GitHub
2. Connect Railway to GitHub repository
3. Set environment variables:
   - `DATABASE_URL` (your Neon database URL)
   - `SESSION_SECRET` (random secure string)
   - `NODE_ENV=production`
4. Deploy with custom domain: `admin.trexmotors.com`

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. In admin-backend folder: `vercel --prod`
3. Set environment variables in Vercel dashboard
4. Configure custom domain

### Option 3: Render
1. Connect GitHub repository
2. Create new Web Service
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add environment variables

## Benefits of This Setup

✅ **Customer Site (Netlify):**
- Ultra-fast static delivery
- No server costs for customer traffic
- Automatic fallback to embedded data

✅ **Admin Backend (admin.trexmotors.com):**
- Full database functionality
- Secure authentication
- Real-time vehicle management
- Feeds live data to Netlify

✅ **Best of Both Worlds:**
- Fast customer experience
- Full admin capabilities
- Cost-effective hosting
- Reliable fallback system

## Data Flow
1. Admin manages vehicles at `admin.trexmotors.com`
2. Changes saved to database instantly
3. Customer site pulls live data from admin backend
4. If admin backend unavailable, uses embedded data
5. No disruption to customer experience

## Next Steps
1. Deploy admin backend to chosen platform
2. Point `admin.trexmotors.com` to deployment
3. Test admin functionality
4. Netlify will automatically use live data