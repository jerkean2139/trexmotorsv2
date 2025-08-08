import express from 'express';
import cors from 'cors';
import session from 'express-session';
import connectPg from 'connect-pg-simple';
import bcrypt from 'bcrypt';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { eq } from 'drizzle-orm';
import * as schema from './schema.js';

// Type declarations for session
declare module 'express-session' {
  interface SessionData {
    isAuthenticated?: boolean;
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

// Session configuration
const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
const pgStore = connectPg(session);
const sessionStore = new pgStore({
  conString: process.env.DATABASE_URL,
  createTableIfMissing: false,
  ttl: sessionTtl,
  tableName: 'sessions',
});

// Middleware
app.use(cors({
  origin: [
    'https://trexmotorsrichmond.netlify.app',
    'https://trexmotors.com',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'admin-secret-key-change-in-production',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: sessionTtl,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  },
}));

// Admin credentials (in production, store hashed password in database)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = '$2b$10$8K1p/a0dclxrZ4q/eGHnV.L7n5s5MNbWz7TqyHCFAoNgEHNJZQs6K'; // trex2025!

// Authentication middleware
const requireAuth = (req: any, res: any, next: any) => {
  if (!req.session.isAuthenticated) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_USERNAME && await bcrypt.compare(password, ADMIN_PASSWORD_HASH)) {
    req.session.isAuthenticated = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.get('/api/auth/check', (req, res) => {
  res.json({ isAuthenticated: !!req.session.isAuthenticated });
});

// Vehicle CRUD routes (admin only)
app.get('/api/vehicles', requireAuth, async (req, res) => {
  try {
    const vehicles = await db.select().from(schema.vehicles);
    res.json({ vehicles });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Failed to fetch vehicles' });
  }
});

app.post('/api/vehicles', requireAuth, async (req, res) => {
  try {
    const vehicleData = req.body;
    const [vehicle] = await db.insert(schema.vehicles).values(vehicleData).returning();
    res.json(vehicle);
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({ message: 'Failed to create vehicle' });
  }
});

app.put('/api/vehicles/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const vehicleData = req.body;
    const [vehicle] = await db
      .update(schema.vehicles)
      .set(vehicleData)
      .where(eq(schema.vehicles.id, id))
      .returning();
    res.json(vehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({ message: 'Failed to update vehicle' });
  }
});

app.delete('/api/vehicles/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(schema.vehicles).where(eq(schema.vehicles.id, id));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({ message: 'Failed to delete vehicle' });
  }
});

// Inquiry routes (admin only)
app.get('/api/inquiries', requireAuth, async (req, res) => {
  try {
    const inquiries = await db.select().from(schema.inquiries);
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ message: 'Failed to fetch inquiries' });
  }
});

// Financing application routes (admin only)
app.get('/api/financing-applications', requireAuth, async (req, res) => {
  try {
    const applications = await db.select().from(schema.financingApplications);
    res.json(applications);
  } catch (error) {
    console.error('Error fetching financing applications:', error);
    res.status(500).json({ message: 'Failed to fetch financing applications' });
  }
});

// Public API for Netlify frontend (no auth required)
app.get('/api/public/vehicles', async (req, res) => {
  try {
    const vehicles = await db.select().from(schema.vehicles).where(eq(schema.vehicles.status, 'available'));
    res.json({ vehicles });
  } catch (error) {
    console.error('Error fetching public vehicles:', error);
    res.status(500).json({ message: 'Failed to fetch vehicles' });
  }
});

app.get('/api/public/vehicles/featured', async (req, res) => {
  try {
    const vehicles = await db.select().from(schema.vehicles).where(eq(schema.vehicles.featured, true));
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching featured vehicles:', error);
    res.status(500).json({ message: 'Failed to fetch featured vehicles' });
  }
});

// Public submission endpoints (no auth required)
app.post('/api/public/inquiries', async (req, res) => {
  try {
    const inquiryData = req.body;
    const [inquiry] = await db.insert(schema.inquiries).values(inquiryData).returning();
    res.json(inquiry);
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ message: 'Failed to create inquiry' });
  }
});

app.post('/api/public/financing-applications', async (req, res) => {
  try {
    const applicationData = req.body;
    const [application] = await db.insert(schema.financingApplications).values(applicationData).returning();
    res.json(application);
  } catch (error) {
    console.error('Error creating financing application:', error);
    res.status(500).json({ message: 'Failed to create financing application' });
  }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Admin backend running on port ${PORT}`);
  });
}

// For Vercel serverless deployment
export default app;