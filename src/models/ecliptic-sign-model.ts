/**
 * ecliptic-sign-model.ts
 *
 * All database query functions relating to the `ecliptic_signs` table.
 *
 * Follows the same model pattern as planet-model.ts:
 * one file owns all queries for one table, and handles the
 * snake_case → camelCase conversion in one place.
 */

import { databasePool } from '../config/database-connection.js';
import type { EclipticSign, NewEclipticSign } from './types.js';

// ---------------------------------------------------------------------------
// Row-to-model conversion
// ---------------------------------------------------------------------------

function convertDatabaseRowToEclipticSign(
  databaseRow: Record<string, unknown>
): EclipticSign {
  return {
    id:                     Number(databaseRow['id']),
    sectionNumber:          Number(databaseRow['section_number']),
    name:                   String(databaseRow['name']),
    startLongitudeDegrees:  Number(databaseRow['start_longitude_degrees']),
    endLongitudeDegrees:    Number(databaseRow['end_longitude_degrees']),
    description:            databaseRow['description'] != null
                              ? String(databaseRow['description'])
                              : null,
    createdAt:              new Date(String(databaseRow['created_at'])),
  };
}

// ---------------------------------------------------------------------------
// Query functions
// ---------------------------------------------------------------------------

/**
 * Retrieves all 12 ecliptic signs, ordered by section number (1–12).
 */
export async function getAllEclipticSigns(): Promise<EclipticSign[]> {
  const queryResult = await databasePool.query(
    'SELECT * FROM ecliptic_signs ORDER BY section_number ASC'
  );

  return queryResult.rows.map(convertDatabaseRowToEclipticSign);
}

/**
 * Retrieves a single ecliptic sign by its database id.
 * Returns null if not found.
 */
export async function getEclipticSignById(
  signId: number
): Promise<EclipticSign | null> {
  const queryResult = await databasePool.query(
    'SELECT * FROM ecliptic_signs WHERE id = $1',
    [signId]
  );

  if (queryResult.rows.length === 0) {
    return null;
  }

  return convertDatabaseRowToEclipticSign(queryResult.rows[0]);
}

/**
 * Retrieves a single ecliptic sign by its section number (1–12).
 * Returns null if not found.
 */
export async function getEclipticSignBySectionNumber(
  sectionNumber: number
): Promise<EclipticSign | null> {
  const queryResult = await databasePool.query(
    'SELECT * FROM ecliptic_signs WHERE section_number = $1',
    [sectionNumber]
  );

  if (queryResult.rows.length === 0) {
    return null;
  }

  return convertDatabaseRowToEclipticSign(queryResult.rows[0]);
}

/**
 * Finds which ecliptic sign contains a given ecliptic longitude.
 *
 * @param longitudeDegrees - An ecliptic longitude from 0° to 360°
 * @returns The sign that contains that longitude, or null if none found
 *          (which should not happen if all 12 sections are seeded correctly)
 */
export async function getEclipticSignByLongitude(
  longitudeDegrees: number
): Promise<EclipticSign | null> {
  // Normalize to [0, 360) in case a value like 360.0 or -5 is passed
  const normalizedLongitude = ((longitudeDegrees % 360) + 360) % 360;

  const queryResult = await databasePool.query(
    `SELECT * FROM ecliptic_signs
     WHERE start_longitude_degrees <= $1
       AND end_longitude_degrees   >  $1`,
    [normalizedLongitude]
  );

  // Handle 360° edge case: belongs to Section 12 (330°–360°)
  if (queryResult.rows.length === 0 && normalizedLongitude === 0) {
    return getEclipticSignBySectionNumber(1);
  }

  if (queryResult.rows.length === 0) {
    return null;
  }

  return convertDatabaseRowToEclipticSign(queryResult.rows[0]);
}

/**
 * Updates the description of an ecliptic sign.
 * Returns the updated sign, or null if no sign with that id exists.
 */
export async function updateEclipticSignDescription(
  signId: number,
  description: string | null
): Promise<EclipticSign | null> {
  const queryResult = await databasePool.query(
    `UPDATE ecliptic_signs
     SET description = $1
     WHERE id = $2
     RETURNING *`,
    [description, signId]
  );

  if (queryResult.rows.length === 0) {
    return null;
  }

  return convertDatabaseRowToEclipticSign(queryResult.rows[0]);
}

/**
 * Updates the name of an ecliptic sign.
 * Use this when the sections are eventually given proper astrological names.
 *
 * @param signId  - The database id of the sign to rename
 * @param newName - The new name (e.g. a culturally meaningful name to replace "Section 1")
 */
export async function updateEclipticSignName(
  signId: number,
  newName: string
): Promise<EclipticSign | null> {
  const queryResult = await databasePool.query(
    `UPDATE ecliptic_signs
     SET name = $1
     WHERE id = $2
     RETURNING *`,
    [newName, signId]
  );

  if (queryResult.rows.length === 0) {
    return null;
  }

  return convertDatabaseRowToEclipticSign(queryResult.rows[0]);
}

/**
 * Inserts a new ecliptic sign. Intended for testing or custom configurations.
 * Under normal circumstances the 12 sections are created by the seed script.
 */
export async function createEclipticSign(
  signData: NewEclipticSign
): Promise<EclipticSign> {
  const queryResult = await databasePool.query(
    `INSERT INTO ecliptic_signs
       (section_number, name, start_longitude_degrees, end_longitude_degrees, description)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      signData.sectionNumber,
      signData.name,
      signData.startLongitudeDegrees,
      signData.endLongitudeDegrees,
      signData.description,
    ]
  );

  return convertDatabaseRowToEclipticSign(queryResult.rows[0]);
}
