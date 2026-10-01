/**
 * planet-model.ts
 *
 * All database query functions relating to the `planets` table.
 *
 * This file follows the "model" pattern: it is the single place in the
 * codebase responsible for translating between:
 *   - The database's snake_case column names (e.g. orbital_period_days)
 *   - The application's camelCase TypeScript properties (e.g. orbitalPeriodDays)
 *
 * Every function returns typed results using the interfaces defined in types.ts.
 * Raw pg query results are typed as `unknown` and converted explicitly —
 * this forces us to be intentional about the shape of data we use.
 */

import { databasePool } from '../config/database-connection.js';
import type { Planet, NewPlanet, PlanetWithCurrentSign } from './types.js';

// ---------------------------------------------------------------------------
// Row-to-model conversion
// ---------------------------------------------------------------------------

/**
 * Converts a raw database row (snake_case keys, string values from pg)
 * into a typed Planet object (camelCase keys, proper TypeScript types).
 *
 * pg returns all values as strings by default — this function handles the
 * necessary type coercions (e.g. string → number, string → boolean).
 *
 * The `Record<string, unknown>` type means "an object with string keys and
 * values we haven't inspected yet" — a safe way to handle raw DB output.
 */
function convertDatabaseRowToPlanet(databaseRow: Record<string, unknown>): Planet {
  return {
    id:                       Number(databaseRow['id']),
    name:                     String(databaseRow['name']),
    systemDesignation:        String(databaseRow['system_designation']),
    orbitalPeriodDays:        Number(databaseRow['orbital_period_days']),
    synodicPeriodDays:        Number(databaseRow['synodic_period_days']),
    isInteriorToTrappist1e:   Boolean(databaseRow['is_interior_to_trappist1e']),
    notes:                    databaseRow['notes'] != null
                                ? String(databaseRow['notes'])
                                : null,
    currentSignId:            databaseRow['current_sign_id'] != null
                                ? Number(databaseRow['current_sign_id'])
                                : null,
    createdAt:                new Date(String(databaseRow['created_at'])),
  };
}

// ---------------------------------------------------------------------------
// Query functions
// ---------------------------------------------------------------------------

/**
 * Retrieves all planets from the database, ordered by orbital period
 * (innermost planet first).
 */
export async function getAllPlanets(): Promise<Planet[]> {
  const queryResult = await databasePool.query(
    'SELECT * FROM planets ORDER BY orbital_period_days ASC'
  );

  return queryResult.rows.map(convertDatabaseRowToPlanet);
}

/**
 * Retrieves a single planet by its database id.
 * Returns null if no planet with that id exists.
 */
export async function getPlanetById(planetId: number): Promise<Planet | null> {
  const queryResult = await databasePool.query(
    'SELECT * FROM planets WHERE id = $1',
    [planetId]
  );

  if (queryResult.rows.length === 0) {
    return null;
  }

  return convertDatabaseRowToPlanet(queryResult.rows[0]);
}

/**
 * Retrieves a single planet by its system designation (e.g. 'b', 'c').
 * Returns null if not found.
 */
export async function getPlanetByDesignation(
  systemDesignation: string
): Promise<Planet | null> {
  const queryResult = await databasePool.query(
    'SELECT * FROM planets WHERE system_designation = $1',
    [systemDesignation]
  );

  if (queryResult.rows.length === 0) {
    return null;
  }

  return convertDatabaseRowToPlanet(queryResult.rows[0]);
}

/**
 * Retrieves all planets that are currently in a given ecliptic sign.
 *
 * @param signId - The database id of the ecliptic sign to query
 */
export async function getPlanetsInSign(signId: number): Promise<Planet[]> {
  const queryResult = await databasePool.query(
    'SELECT * FROM planets WHERE current_sign_id = $1 ORDER BY orbital_period_days ASC',
    [signId]
  );

  return queryResult.rows.map(convertDatabaseRowToPlanet);
}

/**
 * Retrieves all planets joined with their current ecliptic sign data.
 *
 * Uses a LEFT JOIN so that planets with no current sign (current_sign_id IS NULL)
 * are still returned — with null for all sign fields.
 *
 * This is the query to use when you want to display a full "chart" showing
 * every planet and what sign it is currently in.
 */
export async function getAllPlanetsWithCurrentSign(): Promise<PlanetWithCurrentSign[]> {
  const queryResult = await databasePool.query(`
    SELECT
      planets.id,
      planets.name,
      planets.system_designation,
      planets.orbital_period_days,
      planets.synodic_period_days,
      planets.is_interior_to_trappist1e,
      planets.notes,
      planets.current_sign_id,
      planets.created_at,

      -- Prefix sign columns to avoid name collisions with planet columns
      ecliptic_signs.id                        AS sign_id,
      ecliptic_signs.section_number            AS sign_section_number,
      ecliptic_signs.name                      AS sign_name,
      ecliptic_signs.start_longitude_degrees   AS sign_start_longitude_degrees,
      ecliptic_signs.end_longitude_degrees     AS sign_end_longitude_degrees,
      ecliptic_signs.description               AS sign_description,
      ecliptic_signs.created_at                AS sign_created_at

    FROM planets
    LEFT JOIN ecliptic_signs ON planets.current_sign_id = ecliptic_signs.id
    ORDER BY planets.orbital_period_days ASC
  `);

  return queryResult.rows.map((row: Record<string, unknown>) => {
    const planet = convertDatabaseRowToPlanet(row);

    // If the LEFT JOIN found a matching sign row, build the sign object.
    // Otherwise currentSign is null (planet has no assigned sign yet).
    const currentSign = row['sign_id'] != null
      ? {
          id:                     Number(row['sign_id']),
          sectionNumber:          Number(row['sign_section_number']),
          name:                   String(row['sign_name']),
          startLongitudeDegrees:  Number(row['sign_start_longitude_degrees']),
          endLongitudeDegrees:    Number(row['sign_end_longitude_degrees']),
          description:            row['sign_description'] != null
                                    ? String(row['sign_description'])
                                    : null,
          createdAt:              new Date(String(row['sign_created_at'])),
        }
      : null;

    return { ...planet, currentSign };
  });
}

/**
 * Updates the current sign for a planet.
 *
 * @param planetId - The database id of the planet to update
 * @param signId   - The database id of the sign to assign, or null to clear it
 * @returns The updated Planet, or null if no planet with that id exists
 */
export async function updatePlanetCurrentSign(
  planetId: number,
  signId: number | null
): Promise<Planet | null> {
  const queryResult = await databasePool.query(
    `UPDATE planets
     SET current_sign_id = $1
     WHERE id = $2
     RETURNING *`,
    [signId, planetId]
  );

  if (queryResult.rows.length === 0) {
    return null;
  }

  return convertDatabaseRowToPlanet(queryResult.rows[0]);
}

/**
 * Inserts a new planet into the database.
 * Returns the newly created Planet with its auto-generated id and createdAt.
 */
export async function createPlanet(planetData: NewPlanet): Promise<Planet> {
  const queryResult = await databasePool.query(
    `INSERT INTO planets
       (name, system_designation, orbital_period_days, synodic_period_days,
        is_interior_to_trappist1e, notes, current_sign_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      planetData.name,
      planetData.systemDesignation,
      planetData.orbitalPeriodDays,
      planetData.synodicPeriodDays,
      planetData.isInteriorToTrappist1e,
      planetData.notes,
      planetData.currentSignId,
    ]
  );

  return convertDatabaseRowToPlanet(queryResult.rows[0]);
}
