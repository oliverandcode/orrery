/**
 * seed.ts
 *
 * Inserts initial data into the database.
 *
 * Run this after migrate.ts to populate the tables with:
 *   - 12 ecliptic sign sections (Section 1 through Section 12)
 *   - 6 TRAPPIST-1 system planets (b, c, d, f, g, h)
 *
 * Usage:
 *   npm run db:seed
 *
 * This script uses INSERT ... ON CONFLICT DO NOTHING, which means it is safe
 * to run multiple times — it will skip rows that already exist rather than
 * failing or creating duplicates.
 */

import { databasePool, verifyDatabaseConnection } from '../config/database-connection.js';
import {
  generateEclipticSections,
  TRAPPIST_SYSTEM_PLANETS,
} from './seed-data.js';
import type { NewEclipticSign, NewPlanet } from '../models/types.js';

/**
 * Inserts a single ecliptic sign section into the database.
 *
 * The ON CONFLICT DO NOTHING clause handles the case where a row with the
 * same section_number already exists — it silently skips the insert.
 *
 * The $1, $2... placeholders are parameterized query syntax. pg substitutes
 * the actual values safely, preventing SQL injection attacks.
 */
async function insertEclipticSign(
  signData: NewEclipticSign
): Promise<void> {
  const insertEclipticSignSQL = `
    INSERT INTO ecliptic_signs
      (section_number, name, start_longitude_degrees, end_longitude_degrees, description)
    VALUES
      ($1, $2, $3, $4, $5)
    ON CONFLICT (section_number) DO NOTHING
  `;

  await databasePool.query(insertEclipticSignSQL, [
    signData.sectionNumber,
    signData.name,
    signData.startLongitudeDegrees,
    signData.endLongitudeDegrees,
    signData.description,
  ]);
}

/**
 * Inserts a single planet into the database.
 *
 * The ON CONFLICT DO NOTHING clause skips the insert if a planet with the
 * same system_designation already exists.
 */
async function insertPlanet(
  planetData: NewPlanet
): Promise<void> {
  const insertPlanetSQL = `
    INSERT INTO planets
      (name, system_designation, orbital_period_days, synodic_period_days,
       is_interior_to_trappist1e, notes, current_sign_id)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (system_designation) DO NOTHING
  `;

  await databasePool.query(insertPlanetSQL, [
    planetData.name,
    planetData.systemDesignation,
    planetData.orbitalPeriodDays,
    planetData.synodicPeriodDays,
    planetData.isInteriorToTrappist1e,
    planetData.notes,
    planetData.currentSignId,
  ]);
}

/**
 * Seeds the ecliptic_signs table with all 12 sections.
 */
async function seedEclipticSigns(): Promise<void> {
  console.log('  Seeding ecliptic_signs...');

  const eclipticSections = generateEclipticSections();

  for (const section of eclipticSections) {
    await insertEclipticSign(section);
    console.log(`    Inserted (or skipped): ${section.name} (${section.startLongitudeDegrees}°–${section.endLongitudeDegrees}°)`);
  }
}

/**
 * Seeds the planets table with all six TRAPPIST-1 system planets.
 * Must run after seedEclipticSigns since planets reference the signs table.
 */
async function seedPlanets(): Promise<void> {
  console.log('  Seeding planets...');

  for (const planet of TRAPPIST_SYSTEM_PLANETS) {
    await insertPlanet(planet);
    console.log(`    Inserted (or skipped): ${planet.name} (synodic period: ${planet.synodicPeriodDays.toFixed(4)} days)`);
  }
}

/**
 * Main seed function — runs all seed operations in the correct order.
 */
async function runSeed(): Promise<void> {
  console.log('Verifying database connection...');
  await verifyDatabaseConnection();
  console.log('Connection verified.\n');

  console.log('Starting seed...');

  try {
    await seedEclipticSigns();
    await seedPlanets();
    console.log('\nSeed complete.');
  } finally {
    await databasePool.end();
  }
}

runSeed().catch((error) => {
  console.error('Unhandled error during seed:', error);
  process.exit(1);
});
