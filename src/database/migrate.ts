/**
 * migrate.ts
 *
 * Creates the database tables for this application.
 *
 * Run this script once when setting up the project, or after any schema change:
 *   npm run db:migrate
 *
 * What this script does:
 *   1. Creates the `ecliptic_signs` table (the 12 sections of the ecliptic band)
 *   2. Creates the `planets` table (the six other TRAPPIST-1 planets)
 *
 * The CREATE TABLE IF NOT EXISTS syntax means this script is safe to run
 * multiple times — it will not error or overwrite data if the tables exist.
 *
 * --- Table relationship ---
 *
 *   ecliptic_signs  ←──(one-to-many)──  planets
 *
 * Many planets can occupy the same sign at a given time.
 * Each planet can be in at most one sign at a time (or none, if not yet calculated).
 * This is expressed as a nullable foreign key on the planets table: current_sign_id.
 */

import { databasePool, verifyDatabaseConnection } from '../config/database-connection.js';

/**
 * SQL statement that creates the `ecliptic_signs` table.
 *
 * Each row represents one 30° section of TRAPPIST-1e's ecliptic band.
 * The twelve sections are numbered 1–12 starting from the zero point
 * (where the ecliptic crosses the galactic plane toward the galactic center).
 */
const createEclipticSignsTableSQL = `
  CREATE TABLE IF NOT EXISTS ecliptic_signs (
    -- Auto-incrementing integer primary key. SERIAL is PostgreSQL shorthand
    -- for an integer column with a sequence (auto-increment) attached.
    id                       SERIAL PRIMARY KEY,

    -- Section number 1–12. UNIQUE ensures no two rows share a number.
    section_number           INTEGER NOT NULL UNIQUE
                             CHECK (section_number >= 1 AND section_number <= 12),

    -- Display name for this section, e.g. "Section 1" or a future proper name.
    name                     VARCHAR(100) NOT NULL,

    -- The ecliptic longitude where this section begins, in degrees (0–330).
    start_longitude_degrees  NUMERIC(6, 3) NOT NULL
                             CHECK (start_longitude_degrees >= 0
                               AND start_longitude_degrees < 360),

    -- The ecliptic longitude where this section ends, in degrees (30–360).
    end_longitude_degrees    NUMERIC(6, 3) NOT NULL
                             CHECK (end_longitude_degrees > 0
                               AND end_longitude_degrees <= 360),

    -- Optional notes about this section: notable stars, character, etc.
    description              TEXT,

    -- Automatically set to the current time when the row is inserted.
    created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

/**
 * SQL statement that creates the `planets` table.
 *
 * Each row represents one of the six other planets in the TRAPPIST-1 system
 * (b, c, d, f, g, h) — as observed from TRAPPIST-1e.
 *
 * The REFERENCES clause creates a foreign key constraint: current_sign_id
 * must either be NULL or match an existing id in the ecliptic_signs table.
 * ON DELETE SET NULL means if a sign row is deleted, the planet's
 * current_sign_id is automatically set to NULL rather than causing an error.
 */
const createPlanetsTableSQL = `
  CREATE TABLE IF NOT EXISTS planets (
    -- Auto-incrementing integer primary key.
    id                          SERIAL PRIMARY KEY,

    -- Full display name, e.g. "TRAPPIST-1b".
    name                        VARCHAR(100) NOT NULL UNIQUE,

    -- Single-letter suffix: 'b', 'c', 'd', 'f', 'g', or 'h'.
    system_designation          CHAR(1) NOT NULL UNIQUE
                                CHECK (system_designation IN ('b','c','d','f','g','h')),

    -- Orbital period around TRAPPIST-1, in Earth days. Known from transit data.
    orbital_period_days         NUMERIC(10, 6) NOT NULL
                                CHECK (orbital_period_days > 0),

    -- Synodic period as seen from TRAPPIST-1e, in Earth days.
    -- Determines how quickly this planet moves through the 12 signs.
    synodic_period_days         NUMERIC(10, 6) NOT NULL
                                CHECK (synodic_period_days > 0),

    -- TRUE if this planet orbits closer to TRAPPIST-1 than TRAPPIST-1e does.
    is_interior_to_trappist1e   BOOLEAN NOT NULL,

    -- Optional notes: visibility, physical characteristics, etc.
    notes                       TEXT,

    -- Foreign key to ecliptic_signs. Null until position is calculated.
    -- References the sign this planet currently occupies.
    current_sign_id             INTEGER REFERENCES ecliptic_signs(id)
                                ON DELETE SET NULL,

    -- Automatically set to the current time when the row is inserted.
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

/**
 * Runs the migration by executing both CREATE TABLE statements in sequence.
 * Uses a single client (checked out from the pool) to run both statements,
 * which ensures they share a transaction context.
 */
async function runMigration(): Promise<void> {
  console.log('Verifying database connection...');
  await verifyDatabaseConnection();
  console.log('Connection verified.\n');

  // Check out a dedicated client from the pool for this migration.
  // Using a single client (rather than pool.query) lets us wrap multiple
  // statements in a transaction, so either all tables are created or none are.
  const databaseClient = await databasePool.connect();

  try {
    console.log('Starting migration...');

    // BEGIN starts a transaction. If any statement fails, ROLLBACK (in the
    // catch block) will undo all changes made since BEGIN.
    await databaseClient.query('BEGIN');

    console.log('  Creating table: ecliptic_signs');
    await databaseClient.query(createEclipticSignsTableSQL);

    console.log('  Creating table: planets');
    await databaseClient.query(createPlanetsTableSQL);

    // COMMIT makes all changes permanent.
    await databaseClient.query('COMMIT');

    console.log('\nMigration complete. Tables created (or already existed).');
  } catch (migrationError) {
    // Something went wrong — undo all changes since BEGIN.
    await databaseClient.query('ROLLBACK');
    console.error('Migration failed. All changes have been rolled back.');
    throw migrationError;
  } finally {
    // Always release the client back to the pool, even if an error occurred.
    // Failing to do this would leak the connection.
    databaseClient.release();
    await databasePool.end();
  }
}

// Run the migration and handle any top-level errors.
runMigration().catch((error) => {
  console.error('Unhandled error during migration:', error);
  process.exit(1);
});
