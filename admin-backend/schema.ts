import { sql } from 'drizzle-orm';
import {
  boolean,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for admin authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Vehicles table
export const vehicles = pgTable("vehicles", {
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
  description: text("description"),
  notes: text("notes"),
  images: text("images").array().default([]),
  status: varchar("status").notNull().default("available"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Inquiries table
export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vehicleId: varchar("vehicle_id").references(() => vehicles.id),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone").notNull(),
  interestType: varchar("interest_type").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Financing Applications table
export const financingApplications = pgTable("financing_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone").notNull(),
  address: varchar("address").notNull(),
  city: varchar("city").notNull(),
  state: varchar("state").notNull(),
  zipCode: varchar("zip_code").notNull(),
  employmentStatus: varchar("employment_status").notNull(),
  monthlyIncome: varchar("monthly_income").notNull(),
  creditScore: varchar("credit_score"),
  downPayment: varchar("down_payment"),
  vehicleInterest: text("vehicle_interest"),
  additionalInfo: text("additional_info"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas
export const insertVehicleSchema = createInsertSchema(vehicles);
export const insertInquirySchema = createInsertSchema(inquiries);
export const insertFinancingApplicationSchema = createInsertSchema(financingApplications);

export type Vehicle = typeof vehicles.$inferSelect;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type FinancingApplication = typeof financingApplications.$inferSelect;
export type InsertFinancingApplication = z.infer<typeof insertFinancingApplicationSchema>;