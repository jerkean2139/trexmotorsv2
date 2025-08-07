// Migration script to copy development data to production database
import { Pool } from '@neondatabase/serverless';

// You'll need to set these URLs
const DEV_DATABASE_URL = 'postgresql://neondb_owner:npg_8M5exDlqvjsV@ep-dark-pine-adww7qup.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';
const PROD_DATABASE_URL = 'YOUR_PRODUCTION_DATABASE_URL_HERE'; // Replace with your production URL

async function migrateData() {
  const devDb = new Pool({ connectionString: DEV_DATABASE_URL });
  const prodDb = new Pool({ connectionString: PROD_DATABASE_URL });

  try {
    console.log('🔄 Starting data migration...');

    // 1. Get all vehicles from development
    const { rows: vehicles } = await devDb.query('SELECT * FROM vehicles ORDER BY created_at');
    console.log(`📋 Found ${vehicles.length} vehicles in development`);

    // 2. Clear production vehicles (optional - remove if you want to keep existing data)
    await prodDb.query('DELETE FROM vehicles');
    console.log('🗑️ Cleared production vehicles');

    // 3. Insert each vehicle into production
    for (const vehicle of vehicles) {
      const insertQuery = `
        INSERT INTO vehicles (
          id, make, model, year, trim, price, mileage, exterior_color, interior_color,
          fuel_type, transmission, drivetrain, engine, seating_capacity, description,
          features, images, status, stock_number, vin, is_featured, created_at, updated_at, status_banner
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24
        )
      `;
      
      await prodDb.query(insertQuery, [
        vehicle.id, vehicle.make, vehicle.model, vehicle.year, vehicle.trim,
        vehicle.price, vehicle.mileage, vehicle.exterior_color, vehicle.interior_color,
        vehicle.fuel_type, vehicle.transmission, vehicle.drivetrain, vehicle.engine,
        vehicle.seating_capacity, vehicle.description, vehicle.features, vehicle.images,
        vehicle.status, vehicle.stock_number, vehicle.vin, vehicle.is_featured,
        vehicle.created_at, vehicle.updated_at, vehicle.status_banner
      ]);
    }

    console.log(`✅ Successfully migrated ${vehicles.length} vehicles to production!`);

    // 4. Verify the migration
    const { rows: prodVehicles } = await prodDb.query('SELECT COUNT(*) as count FROM vehicles');
    console.log(`🔍 Production now has ${prodVehicles[0].count} vehicles`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await devDb.end();
    await prodDb.end();
  }
}

migrateData();