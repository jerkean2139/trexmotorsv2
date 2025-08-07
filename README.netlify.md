# T-Rex Motors - Netlify Deployment Guide

This guide explains how to deploy the T-Rex Motors website to Netlify as a static site.

## Important Note

This is a full-stack application with a Node.js backend. For Netlify deployment, you'll be deploying only the **frontend** as a static site. The backend functionality (admin dashboard, vehicle management) will not work on Netlify without additional serverless function setup.

## Quick Deployment Steps

### Option 1: Deploy via Git (Recommended)

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Select your repository

3. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

4. **Deploy:**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

### Option 2: Manual Deployment

1. **Build the project locally:**
   ```bash
   # Build the frontend for production
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder to Netlify's deploy area

## Configuration Files

- `netlify.toml` - Netlify configuration for build settings and redirects
- `vite.config.netlify.ts` - Alternative Vite config optimized for Netlify

## Environment Variables (if needed)

If your frontend needs environment variables:

1. Go to your Netlify site dashboard
2. Navigate to Site Settings → Environment Variables
3. Add your variables (must be prefixed with `VITE_`)

## Limitations of Static Deployment

When deployed to Netlify as a static site:

✅ **What Works:**
- Vehicle browsing and search
- Vehicle detail modals
- Contact and about sections
- Financing application form (frontend only)
- Responsive design and all UI components

❌ **What Doesn't Work:**
- Admin dashboard and vehicle management
- Vehicle data persistence (will need to be static data)
- Financing form submission (frontend only)
- Authentication system

## Making it Work with Backend

To have full functionality, you would need:

1. **Serverless Functions**: Convert API routes to Netlify Functions
2. **External Database**: Use a hosted database service
3. **Authentication Service**: Use Netlify Identity or external auth
4. **Form Handling**: Use Netlify Forms or external service

## Static Data Option

For a fully static version, you can:

1. Export your current vehicle data to JSON
2. Update the frontend to use static JSON data instead of API calls
3. Remove admin functionality and make it a pure showcase site

## Support

For questions about this deployment, contact the development team.