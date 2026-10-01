/**
 * index.ts
 *
 * Application entry point.
 *
 * Right now this file does two things:
 *   1. Verifies the database connection is working
 *   2. Runs a short demonstration of the model query functions,
 *      printing results to the console
 *
 * As the project grows, this file will be replaced by (or expanded into)
 * an HTTP server, a CLI interface, or whatever interface the application needs.
 *
 * Run with:
 *   npm run dev     (development, with auto-restart on file changes)
 *   npm start       (production, runs compiled JS from dist/)
 */

import { databasePool, verifyDatabaseConnection } from './config/database-connection.js';
import { getAllEclipticSigns, getEclipticSignBySectionNumber } from './models/ecliptic-sign-model.js';
import { getAllPlanets, getAllPlanetsWithCurrentSign } from './models/planet-model.js';

async function main(): Promise<void> {
  console.log('=== TRAPPIST-1e Astrological System ===\n');

  // Step 1: Verify the database is reachable before doing anything else
  console.log('Connecting to database...');
  await verifyDatabaseConnection();
  console.log('Connected.\n');

  // Step 2: Fetch and display all 12 ecliptic sections
  console.log('--- Ecliptic Sections ---');
  const allEclipticSigns = await getAllEclipticSigns();

  if (allEclipticSigns.length === 0) {
    console.log('No ecliptic signs found. Run `npm run db:seed` to populate the database.');
  } else {
    for (const sign of allEclipticSigns) {
      console.log(
        `  ${sign.sectionNumber.toString().padStart(2)}. ${sign.name.padEnd(12)} ` +
        `${sign.startLongitudeDegrees.toFixed(1)}° – ${sign.endLongitudeDegrees.toFixed(1)}°`
      );
    }
  }

  // Step 3: Demonstrate the longitude lookup function
  console.log('\n--- Longitude Lookup Demo ---');
  const testLongitude = 75;
  const { getEclipticSignByLongitude } = await import('./models/ecliptic-sign-model.js');
  const signAtLongitude = await getEclipticSignByLongitude(testLongitude);
  if (signAtLongitude) {
    console.log(`  Ecliptic longitude ${testLongitude}° falls in: ${signAtLongitude.name}`);
  }

  // Step 4: Fetch and display all planets with their current signs
  console.log('\n--- Planets ---');
  const planetsWithSigns = await getAllPlanetsWithCurrentSign();

  if (planetsWithSigns.length === 0) {
    console.log('No planets found. Run `npm run db:seed` to populate the database.');
  } else {
    for (const planet of planetsWithSigns) {
      const signLabel    = planet.currentSign?.name ?? 'No sign assigned';
      const periodLabel  = `synodic period: ${planet.synodicPeriodDays.toFixed(4)} days`;
      const locationNote = planet.isInteriorToTrappist1e ? '(interior)' : '(exterior)';
      console.log(
        `  ${planet.name.padEnd(16)} ${locationNote.padEnd(12)} ` +
        `${periodLabel.padEnd(30)} Current sign: ${signLabel}`
      );
    }
  }

  console.log('\nDone.');
}

// Run main and handle top-level errors
main()
  .catch((error) => {
    console.error('Application error:', error);
    process.exit(1);
  })
  .finally(async () => {
    // Always close the pool when the process is done to allow Node to exit cleanly.
    // Without this, the process would hang waiting for the pool's idle connections.
    await databasePool.end();
  });
