# T-Rex Motors Admin Backend

This is the separate admin backend for T-Rex Motors that provides full CRUD functionality for vehicle management.

## Features

- **Admin Authentication**: Secure login with session management
- **Vehicle CRUD**: Create, read, update, delete vehicles
- **Public API**: Endpoints for Netlify frontend to fetch vehicle data
- **CORS Enabled**: Configured to work with Netlify frontend

## Environment Variables

```
DATABASE_URL=your_neon_database_url
SESSION_SECRET=your_session_secret
NODE_ENV=production
```

## Deployment

This backend can be deployed to:
- **Replit Deployments**: One-click deploy with automatic scaling
- **Railway**: Connect GitHub and deploy  
- **Vercel**: `vercel --prod`
- **Render**: Connect GitHub and deploy

## API Endpoints

### Admin Routes (Authentication Required)
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/check` - Check auth status
- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Create vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Public Routes (For Netlify Frontend)
- `GET /api/public/vehicles` - Get available vehicles
- `GET /api/public/vehicles/featured` - Get featured vehicles

## Admin Credentials
- Username: `admin`
- Password: `trex2025!`

## Setup

1. Install dependencies: `npm install`
2. Set environment variables
3. Push database schema: `npm run db:push`
4. Start development: `npm run dev`
5. Deploy to your chosen platform

## Integration with Netlify

The Netlify frontend should be updated to use this backend's public API endpoints instead of embedded data when available.