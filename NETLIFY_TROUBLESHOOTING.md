# T-Rex Motors Netlify Deployment Troubleshooting

## Problem: No Vehicles Showing on Netlify

If your Netlify deployment shows no vehicles, here are manual troubleshooting steps:

### Step 1: Check Your Build Output
```bash
# After running npm run build, check these files exist:
ls -la dist/public/assets/
# Look for: realVehicleData-*.js or exportedVehicles-*.js
```

### Step 2: Test Locally First
```bash
# Build and serve locally to test
npm run build
cd dist/public
python -m http.server 3000
# Open http://localhost:3000 - do vehicles show?
```

### Step 3: Manual Netlify Deploy Steps

**Option A: Drag & Drop (Easiest)**
1. Run `npm run build` in your project
2. Go to netlify.com and drag the `dist/public` folder
3. Wait for deploy to complete
4. Test your site URL

**Option B: GitHub Integration**
1. Push code to GitHub first
2. Connect GitHub repo to Netlify
3. Use these exact build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist/public`
   - **Node version:** 18

### Step 4: Check Browser Console
If still no vehicles:
1. Open your deployed site
2. Press F12 to open developer tools
3. Go to Console tab
4. Look for errors like:
   - "Failed to fetch /api/vehicles"
   - Import errors
   - CORS issues

### Step 5: Force Real Data Loading

If the hybrid system isn't working, manually edit the home page:

**In `client/src/pages/home.tsx`:**
```typescript
// Replace the API calls with direct imports:
import { getVehiclesForNetlify, getFeaturedVehiclesForNetlify } from "@/lib/realVehicleData";

// In the useQuery functions, use:
const { data: vehiclesData, isLoading } = useQuery({
  queryKey: ["vehicles", filters],
  queryFn: () => getVehiclesForNetlify(filters),
});

const { data: featuredVehicles, isLoading: featuredLoading } = useQuery({
  queryKey: ["featured"],  
  queryFn: () => getFeaturedVehiclesForNetlify(),
});
```

### Step 6: Verify Vehicle Data
Check that `client/src/lib/realVehicleData.ts` contains:
- ✅ 5+ vehicles (Chevrolet Cruze, Buick Enclave, Ford F-150, Jeep Wrangler, Honda Civic)
- ✅ Real T-Rex Motors images
- ✅ Proper vehicle details (price, mileage, etc.)
- ✅ Featured vehicles marked correctly

### Common Issues & Solutions

**Issue: Build succeeds but no vehicles**
- Solution: The API calls might be working in build but failing in browser
- Fix: Use direct imports instead of dynamic imports

**Issue: Images not loading**  
- Solution: Google Drive URLs might be blocked
- Fix: Images should load - they're from your actual Google Drive

**Issue: Search/filters not working**
- Solution: Check that filter functions are included in realVehicleData.ts
- Fix: The filtering logic is built into getVehiclesForNetlify()

### Quick Fix Script
Create this file as `force-static-mode.js`:
```javascript
// Quick fix to force static data mode
const fs = require('fs');

const homePagePath = 'client/src/pages/home.tsx';
let content = fs.readFileSync(homePagePath, 'utf8');

// Replace API calls with direct static calls
content = content.replace(
  /queryFn: async.*?catch \(error\).*?}/gs,
  'queryFn: () => getVehiclesForNetlify(queryKey[1])'
);

fs.writeFileSync(homePagePath, content);
console.log('✅ Forced static mode - rebuild and deploy');
```

Run with: `node force-static-mode.js`

### Support
If none of these work:
1. Check the browser console for specific errors
2. Look at Netlify deploy logs for build failures  
3. Try the drag-and-drop deployment method first
4. Verify your dist/public folder contains all the vehicle data files

Your T-Rex Motors site should show all 5+ real vehicles with working search and filters!