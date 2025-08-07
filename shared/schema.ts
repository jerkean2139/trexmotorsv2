import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  make: varchar("make", { length: 50 }).notNull(),
  model: varchar("model", { length: 50 }).notNull(),
  year: integer("year").notNull(),
  trim: varchar("trim", { length: 100 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  mileage: integer("mileage").notNull(),
  exteriorColor: varchar("exterior_color", { length: 50 }).notNull(),
  interiorColor: varchar("interior_color", { length: 50 }),
  fuelType: varchar("fuel_type", { length: 20 }).notNull(),
  transmission: varchar("transmission", { length: 50 }).notNull(),
  drivetrain: varchar("drivetrain", { length: 10 }).notNull(),
  engine: varchar("engine", { length: 100 }),
  seatingCapacity: integer("seating_capacity"),
  description: text("description"),
  features: jsonb("features").$type<string[]>(),
  images: jsonb("images").$type<string[]>(),
  status: varchar("status", { length: 20 }).notNull().default("available"),
  statusBanner: varchar("status_banner", { length: 20 }),
  stockNumber: varchar("stock_number", { length: 20 }).unique(),
  vin: varchar("vin", { length: 17 }).unique(),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vehicleId: varchar("vehicle_id").references(() => vehicles.id),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  interestType: varchar("interest_type", { length: 50 }).notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const financingApplications = pgTable("financing_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  address: varchar("address", { length: 200 }).notNull(),
  city: varchar("city", { length: 50 }).notNull(),
  state: varchar("state", { length: 20 }).notNull(),
  zipCode: varchar("zip_code", { length: 10 }).notNull(),
  employmentStatus: varchar("employment_status", { length: 50 }).notNull(),
  monthlyIncome: varchar("monthly_income", { length: 50 }).notNull(),
  creditScore: varchar("credit_score", { length: 50 }),
  downPayment: varchar("down_payment", { length: 50 }),
  vehicleInterest: text("vehicle_interest"),
  additionalInfo: text("additional_info"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export const insertFinancingApplicationSchema = createInsertSchema(financingApplications).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertFinancingApplication = z.infer<typeof insertFinancingApplicationSchema>;
export type FinancingApplication = typeof financingApplications.$inferSelect;
