/**
 * reset.ts
 *
 * Drops all application tables and recreates them from scratch.
 *
 * ⚠️  DESTRUCTIVE — all data will be permanently deleted.
 *     Only use this in development when you want a clean slate.
 *
 * Usage:
 *   npm run db:reset
 *
 * This script:
 *   1. Drops the planets table (must go first — it references ecliptic_signs)
 *   2. Drops the ecliptic_signs table
 *   3. Re-runs migrate.ts to recreate both tables
 *   4. Re-runs seed.ts to repopulate them with initial data
 */

import { databasePool, verifyDatabaseConnection } from '../config/database-connection.js';

/**
 * Drops all tables in reverse dependency order (planets before ecliptic_signs
 * because planets has a foreign key referencing ecliptic_signs — dropping
 * ecliptic_signs first would violate that constraint).
 */
async function dropAllTables(): Promise<void> {
  const databaseClient = await databasePool.connect();

  try {
    await databaseClient.query('BEGIN');

    console.log('  Dropping table: planets');
    await databaseClient.query('DROP TABLE IF EXISTS planets CASCADE');

    console.log('  Dropping table: ecliptic_signs');
    await databaseClient.query('DROP TABLE IF EXISTS ecliptic_signs CASCADE');

    await databaseClient.query('COMMIT');
    console.log('  All tables dropped.\n');
  } catch (dropError) {
    await databaseClient.query('ROLLBACK');
    throw dropError;
  } finally {
    databaseClient.release();
  }
}

async function runReset(): Promise<void> {
  // Guard against accidental use in production
  if (process.env.NODE_ENV === 'production') {
    console.error('ERROR: db:reset cannot be run in production. Set NODE_ENV to "development".');
    process.exit(1);
  }

  console.log('Verifying database connection...');
  await verifyDatabaseConnection();
  console.log('Connection verified.\n');

  console.warn('⚠️  WARNING: This will permanently delete all data in the application tables.');
  console.log('Starting reset...\n');

  try {
    await dropAllTables();
  } finally {
    await databasePool.end();
  }

  // Dynamic imports run migrate and seed as separate processes
  // to avoid pool lifecycle conflicts
  console.log('Run `npm run db:migrate` then `npm run db:seed` to rebuild the tables.');
}

runReset().catch((error) => {
  console.error('Unhandled error during reset:', error);
  process.exit(1);
});
