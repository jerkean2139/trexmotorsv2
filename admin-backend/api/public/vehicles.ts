import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { eq, sql } from 'drizzle-orm';
import { pgTable, varchar, integer, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import ws from 'ws';

// Configure WebSocket for Neon Database in serverless environment
neonConfig.webSocketConstructor = ws;
neonConfig.fetchConnectionCache = true;

// Define the vehicles table directly - matching production schema
const vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
  year: integer("year").notNull(),
  trim: varchar("trim"),
  price: varchar("price").notNull(),
  mileage: integer("mileage").notNull(),
  exteriorColor: varchar("exterior_color").notNull(),
  interiorColor: varchar("interior_color").notNull(),
  fuelType: varchar("fuel_type").notNull(),
  transmission: varchar("transmission").notNull(),
  drivetrain: varchar("drivetrain").notNull(),
  engine: varchar("engine").notNull(),
  seatingCapacity: integer("seating_capacity"),
  description: text("description"),
  features: varchar("features"),  // jsonb in production
  images: varchar("images"),      // jsonb in production  
  status: varchar("status").notNull().default("available"),
  stockNumber: varchar("stock_number").notNull(),
  vin: varchar("vin").notNull(),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  statusBanner: varchar("status_banner"),
});

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS with credentials - specific frontend URLs
  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://workspace-31rsjcb1j-jeremys-projects-0f68a4ab.vercel.app',
    'https://workspace-3zi5j8xl7-jeremys-projects-0f68a4ab.vercel.app',
    'https://workspace-8bpogweuy-jeremys-projects-0f68a4ab.vercel.app',
    'https://workspace-oy8cx6rgj-jeremys-projects-0f68a4ab.vercel.app',
    'https://workspace-nu-ecru.vercel.app/',
    'https://trexmotorsrichmond.netlify.app',
    'http://localhost:5000',
    'http://localhost:3000'
  ];

  const isAllowedOrigin = origin && (
    allowedOrigins.includes(origin) ||
    (origin.includes('workspace-') && origin.includes('jeremys-projects-0f68a4ab.vercel.app')) ||
    origin.includes('replit.dev') ||
    origin.includes('localhost') ||
    origin.includes('127.0.0.1') ||
    origin.includes('trexmotorsrichmond.netlify.app')
  );
  
  if (isAllowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://workspace-31rsjcb1j-jeremys-projects-0f68a4ab.vercel.app');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-vercel-protection-bypass');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Attempting to connect to database...');
    const vehicleList = await db.select().from(vehicles).where(eq(vehicles.status, 'available'));
    console.log('Database query successful, found vehicles:', vehicleList.length);
    res.json({ vehicles: vehicleList });
  } catch (error) {
    console.error('Database connection error:', error);
    console.error('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.error('DATABASE_URL length:', process.env.DATABASE_URL?.length);
    res.status(500).json({ 
      message: 'Failed to fetch vehicles',
      error: error instanceof Error ? error.message : 'Unknown error',
      hasDbUrl: !!process.env.DATABASE_URL
    });
  }
}