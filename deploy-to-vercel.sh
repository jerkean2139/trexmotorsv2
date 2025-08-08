#!/bin/bash

echo "🚀 T-Rex Motors - Vercel Frontend Deployment Script"
echo "=================================================="

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing globally..."
    npm install -g vercel
fi

# Step 1: Build frontend locally to check for errors
echo "📦 Building frontend to verify everything works..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix build errors before deploying."
    exit 1
fi

echo "✅ Build successful!"

# Step 2: Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment initiated!"

echo ""
echo "📋 Next Steps:"
echo "1. Set environment variables in Vercel Dashboard:"
echo "   - VITE_ENABLE_ADMIN=true"
echo "2. After deployment, test the admin interface"
echo "3. If successful, archive the Netlify deployment"
echo ""
echo "🔗 Access your Vercel dashboard at: https://vercel.com/dashboard"