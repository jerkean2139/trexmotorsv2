# Production Database Setup Guide

## Current Status
✅ Development database has 20 vehicles ready for migration
✅ Vercel backend configured and ready to deploy
✅ Production database URL already set in Vercel

## Steps to Complete Setup

### 1. Get Your Production Database URL
You mentioned you already used your production database URL in Vercel. You need this URL for the migration.

**To find it:**
- Go to your Neon dashboard
- Copy the production database connection string
- It should look like: `postgresql://user:password@host/database?sslmode=require`

### 2. Run Data Migration

**Option A: Manual Migration (Recommended)**
1. Update `migrate-to-production.js` with your production database URL
2. Run: `node migrate-to-production.js`
3. This copies all 20 vehicles from development to production

**Option B: Schema + Manual Entry**
1. Push schema to production: `npm run db:push` (with production DATABASE_URL)
2. Manually add vehicles through admin interface later

### 3. Verify Everything Works

After migration:
1. Deploy admin backend to Vercel
2. Test API endpoints:
   - `https://admin.trexmotors.com/api/public/vehicles`
   - `https://admin.trexmotors.com/api/auth/login`
3. Verify Netlify frontend loads live data

## Environment Variables for Vercel

Make sure these are set in Vercel:
- `DATABASE_URL` → Your production database URL
- `SESSION_SECRET` → `eQwdDJr80Xp8Ipn3Hgfe7hN5wSBX+fnfP1XjkSxWju8=`
- `NODE_ENV` → `production`

## Workflow After Setup

1. **Development:** Work in Replit with dev database
2. **Testing:** Use local admin interface
3. **Production:** Push to main branch → auto-deploys to Vercel/Netlify
4. **Admin:** Use admin.trexmotors.com for live vehicle management

Your setup will be complete once the data migration is done!