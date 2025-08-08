import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { eq, sql } from 'drizzle-orm';
import { pgTable, varchar, integer, text, boolean, timestamp } from 'drizzle-orm/pg-core';

// Define the vehicles table directly
const vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  stockNumber: varchar("stock_number").notNull(),
  vin: varchar("vin").notNull(),
  year: integer("year").notNull(),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
  mileage: integer("mileage").notNull(),
  price: varchar("price").notNull(),
  exteriorColor: varchar("exterior_color").notNull(),
  interiorColor: varchar("interior_color").notNull(),
  transmission: varchar("transmission").notNull(),
  engine: varchar("engine").notNull(),
  drivetrain: varchar("drivetrain").notNull(),
  fuelType: varchar("fuel_type").notNull(),
  bodyStyle: varchar("body_style").notNull(),
  doors: integer("doors").notNull(),
  seats: integer("seats").notNull(),
  features: text("features").array().default([]),
  images: text("images").array().default([]),
  description: text("description"),
  status: varchar("status").notNull().default("available"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS with credentials - wildcard pattern for all Vercel workspace deployments
  const origin = req.headers.origin;
  const isAllowedOrigin = origin && (
    origin.includes('workspace-') && origin.includes('jeremys-projects-0f68a4ab.vercel.app') ||
    origin.includes('replit.dev') ||
    origin.includes('localhost') ||
    origin.includes('127.0.0.1') ||
    origin.includes('trexmotorsrichmond.netlify.app')
  );
  
  if (isAllowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-vercel-protection-bypass');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const vehicleList = await db.select().from(vehicles);
      res.json({ vehicles: vehicleList });
    } else if (req.method === 'POST') {
      const vehicleData = req.body;
      const [vehicle] = await db.insert(vehicles).values(vehicleData).returning();
      res.json(vehicle);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error handling vehicles request:', error);
    res.status(500).json({ message: 'Failed to process request' });
  }
}