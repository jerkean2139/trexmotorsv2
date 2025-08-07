# T-Rex Motors - Complete Netlify Deployment Guide

## Step 1: Download Your Project Files

Since we can't use Git directly in this environment, you'll need to download your project files:

1. **Download from Replit:**
   - Click the three-dot menu in your Replit file explorer
   - Select "Download as zip"
   - Extract the zip file on your computer

## Step 2: Create Git Repository

1. **Create a new repository on GitHub:**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it: `trex-motors-website`
   - Make it public (for free Netlify deployment)
   - Don't initialize with README (we have files already)

2. **Upload your code:**
   ```bash
   # In your extracted project folder
   git init
   git add .
   git commit -m "Complete T-Rex Motors dealership website with Netlify deployment support"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

## Step 3: Deploy to Netlify

### Option A: Connect GitHub Repository (Recommended)

1. **Go to Netlify:**
   - Visit [netlify.com](https://netlify.com)
   - Sign up/log in (can use GitHub account)

2. **Create new site:**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub
   - Select your `trex-motors-website` repository

3. **Configure build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist/public`
   - **Node version:** `18`
   - Click "Deploy site"

### Option B: Drag & Drop Deploy

If you prefer not to use Git:

1. **Build locally:**
   ```bash
   # In your project directory
   npm install
   npm run build
   ```

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Drag the `dist/public` folder to the deploy area
   - Your site will be live in minutes!

## Step 4: Configure Your Site

After deployment:

1. **Custom domain (optional):**
   - In Netlify dashboard → Site settings → Domain management
   - Add your custom domain

2. **Site name:**
   - Change from random name to something like `trex-motors-richmond`

## Step 5: Verify Deployment

Your deployed site will have:

✅ **Working Features:**
- **Complete vehicle inventory** - All 20 vehicles from your database exported
- **Real vehicle data** - Chevrolet, Buick, Ford, Jeep, Honda, GMC, Subaru, Dodge, Kia, Hyundai, Toyota
- **Advanced search and filtering** - Works with your actual inventory 
- **Vehicle detail modals** - All vehicle images and details included
- **Professional T-Rex Motors branding** - Your actual logo and business information
- **About Us and Contact sections** - Complete business details
- **Financing application form** - Professional loan application interface
- **Mobile-responsive design** - Perfect on all devices

⚠️ **Limitations (Static Deploy):**
- Admin dashboard won't work (needs server)
- Forms won't submit to database (frontend only)
- Vehicle data is frozen at export time (can't be updated through admin)

## Troubleshooting

**Build Fails?**
- Check that Node version is set to 18
- Ensure build command is exactly: `npm run build`
- Ensure publish directory is: `dist/public`

**Site Not Loading?**
- Check the publish directory path
- Look at deploy logs in Netlify dashboard

## Your Deployment Files

These files were created for Netlify deployment:

- `netlify.toml` - Netlify configuration
- `deploy-to-netlify.sh` - Local build script  
- `.nvmrc` - Node version specification
- `NETLIFY_DEPLOYMENT.md` - Technical deployment details

## Next Steps

1. Download your project files from Replit
2. Create GitHub repository and push code
3. Connect to Netlify and deploy
4. Share your live T-Rex Motors website!

Your professional car dealership website is ready to go live! 🚀