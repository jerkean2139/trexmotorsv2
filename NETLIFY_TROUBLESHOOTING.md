# Netlify Environment Variable Troubleshooting

## Current Issue
Environment variable `VITE_ENABLE_ADMIN=true` is set in Netlify but not taking effect.

## Troubleshooting Steps

### 1. Force Clear Netlify Cache
1. Go to Netlify Dashboard → Your Site
2. **Site Settings** → **Build & deploy** 
3. Click **Clear cache**
4. Then go to **Deploys**
5. Click **Trigger deploy** → **Clear cache and deploy**

### 2. Verify Environment Variable
In Netlify dashboard:
- Go to **Site Settings** → **Environment variables**
- Confirm `VITE_ENABLE_ADMIN` is set to `true`
- Make sure it's not scoped to a specific branch

### 3. Check Build Logs
After deployment:
1. Go to **Deploys** → Click latest deploy
2. Look for build logs showing environment variables
3. Should see debug output from our script

### 4. Alternative: Manual Environment Check
Add this to your `netlify.toml`:

```toml
[build]
  command = "echo 'VITE_ENABLE_ADMIN='$VITE_ENABLE_ADMIN && npm run build"
```

### 5. If Still Not Working
Try deleting and re-adding the variable:
1. Delete `VITE_ENABLE_ADMIN` variable
2. Save
3. Add it back: `VITE_ENABLE_ADMIN` = `true`
4. Deploy again

## Expected Result
After fixing, the admin page should show:
- Blue debug box with `VITE_ENABLE_ADMIN = true`
- Green "Production Admin Mode" banner
- Enabled login form