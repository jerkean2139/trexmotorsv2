# Admin Backend Deployment Guide

## Quick Setup for `admin.trexmotors.com`

### Option 1: Replit Deployments (Recommended)
1. Create new Replit with admin-backend files
2. Set environment variables in Secrets:
   - `DATABASE_URL` (your Neon database URL)
   - `SESSION_SECRET` (random secure string)
   - `NODE_ENV=production`
3. Click Deploy button in Replit
4. Configure custom domain: `admin.trexmotors.com`
5. Automatic HTTPS and scaling included

### Option 2: Railway
1. Push admin-backend folder to GitHub
2. Connect Railway to GitHub repository
3. Set environment variables
4. Deploy with custom domain

### Option 3: Vercel (Your Choice)
1. Install Vercel CLI: `npm i -g vercel`
2. In admin-backend folder: `vercel --prod`
3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - `NODE_ENV=production`
4. Configure custom domain: `admin.trexmotors.com`
5. Update frontend URL to your Vercel deployment

### Option 4: Render
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