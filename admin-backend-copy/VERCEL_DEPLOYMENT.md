# Vercel Deployment Guide for Admin Backend

## Quick Setup Steps

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy to Vercel
```bash
cd admin-backend
vercel --prod
```

### 3. Set Environment Variables
In Vercel Dashboard > Settings > Environment Variables:
- `DATABASE_URL` → Your Neon database URL
- `SESSION_SECRET` → Random secure string (e.g., `openssl rand -base64 32`)
- `NODE_ENV` → `production`

### 4. Configure Custom Domain (Optional)
- In Vercel Dashboard > Domains
- Add `admin.trexmotors.com`
- Update DNS settings as instructed

### 5. Update Frontend URLs
After deployment, update the Netlify frontend to use your Vercel backend URL:
- Replace `admin.trexmotorsrichmond.vercel.app` with your actual Vercel URL
- Or use custom domain if configured

## Vercel Configuration

The backend is already configured for Vercel with:
- `vercel.json` - Deployment configuration
- Serverless function setup
- CORS configured for Netlify frontend
- Session storage with PostgreSQL

## Testing

After deployment:
1. Visit `https://your-vercel-url.vercel.app/api/public/vehicles`
2. Should return JSON array of vehicles
3. Test admin login at `/api/auth/login`

## Benefits

- Automatic scaling
- Global CDN
- Zero configuration deployment
- Built-in monitoring
- Custom domain support

Your admin backend will be live and the Netlify frontend will automatically use live data instead of embedded data.