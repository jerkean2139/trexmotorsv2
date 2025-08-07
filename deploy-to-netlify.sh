#!/bin/bash

# T-Rex Motors Netlify Deployment Script
echo "🦖 T-Rex Motors - Preparing Netlify Deployment"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🏗️  Building for production..."
npm run build

# Check if build was successful  
if [ ! -d "dist/public" ]; then
    echo "❌ Error: Build failed. dist/public directory not found."
    exit 1
fi

echo "✅ Build complete!"
echo ""
echo "📋 Next steps for Netlify deployment:"
echo ""
echo "Option 1 - Drag & Drop:"
echo "  1. Go to https://netlify.com"
echo "  2. Drag and drop the 'dist/public' folder to deploy"
echo ""
echo "Option 2 - Git Integration:"
echo "  1. Push your code to GitHub/GitLab/Bitbucket"
echo "  2. Connect repository to Netlify"
echo "  3. Use these build settings:"
echo "     - Build command: npm run build"
echo "     - Publish directory: dist/public"
echo "     - Node version: 18"
echo ""
echo "🔍 Build output location: $(pwd)/dist/public"
echo "🌐 Your T-Rex Motors site is ready for deployment!"