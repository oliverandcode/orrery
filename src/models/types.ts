/**
 * types.ts
 *
 * TypeScript type definitions for the core domain objects in this application.
 *
 * These types serve two related purposes:
 *
 *  1. They describe the shape of rows returned from the database, so TypeScript
 *     can verify that our code handles database results correctly.
 *
 *  2. They describe the shape of data we pass INTO the database (for inserts
 *     and updates), using a separate "Input" type that omits fields the
 *     database generates automatically (like id and created_at).
 *
 * Keeping these types in a dedicated file means every other module can import
 * them without creating circular dependencies.
 *
 * --- A note on the astrological model ---
 *
 * This application models an astrological system for TRAPPIST-1e, a planet
 * orbiting the star TRAPPIST-1 approximately 40 light-years from Earth.
 *
 * The system we are building uses:
 *   - EclipticSign: one of 12 equal 30° divisions of TRAPPIST-1e's ecliptic
 *     band (the plane of its orbit projected onto the background star field).
 *     Section 1 begins at the zero point where the ecliptic crosses the
 *     galactic plane in the direction of the galactic center.
 *   - Planet: any of the other six planets in the TRAPPIST-1 system, whose
 *     positions within the 12 signs can be calculated from their orbital data.
 */

// ---------------------------------------------------------------------------
// EclipticSign
// ---------------------------------------------------------------------------

/**
 * Represents one of the 12 equal sections of TRAPPIST-1e's ecliptic band.
 *
 * This is the full database row shape — every field is present, including
 * those the database populates automatically.
 */
export interface EclipticSign {
  /** Auto-generated primary key. */
  id: number;

  /**
   * Sequential number from 1 to 12.
   * Section 1 begins at the zero point (ecliptic/galactic plane crossing
   * in the direction of the galactic center) and sections proceed eastward.
   */
  sectionNumber: number;

  /**
   * Human-readable label for this section.
   * Initially "Section 1" through "Section 12" — to be replaced with
   * culturally meaningful names as the astrological system develops.
   */
  name: string;

  /**
   * Ecliptic longitude (in degrees) where this section begins.
   * Ranges from 0° (zero point) to 330° (start of Section 12).
   * Computed as (sectionNumber - 1) * 30.
   */
  startLongitudeDegrees: number;

  /**
   * Ecliptic longitude (in degrees) where this section ends.
   * Ranges from 30° (end of Section 1) to 360° (end of Section 12).
   * Computed as sectionNumber * 30.
   */
  endLongitudeDegrees: number;

  /**
   * Optional description field for notes about this section:
   * notable stars, astrological character, galactic region, etc.
   * Null if not yet populated.
   */
  description: string | null;

  /** Timestamp of when this row was inserted. Set automatically by the database. */
  createdAt: Date;
}

/**
 * The data required to create a new EclipticSign row.
 * Omits fields the database generates (id, createdAt).
 */
export type NewEclipticSign = Omit<EclipticSign, 'id' | 'createdAt'>;

// ---------------------------------------------------------------------------
// Planet
// ---------------------------------------------------------------------------

/**
 * Represents one of the planets in the TRAPPIST-1 system,
 * as observed from TRAPPIST-1e.
 *
 * Initially populated with the six other TRAPPIST-1 planets (b, c, d, f, g, h).
 * TRAPPIST-1 (the star) is not included here — it plays the role of the "Sun"
 * in this astrological system and is handled separately.
 *
 * This is the full database row shape.
 */
export interface Planet {
  /** Auto-generated primary key. */
  id: number;

  /**
   * The planet's common designation, e.g. "TRAPPIST-1b".
   * Used as a display label throughout the application.
   */
  name: string;

  /**
   * Single-letter suffix identifying the planet within the TRAPPIST-1 system.
   * Values: 'b' | 'c' | 'd' | 'f' | 'g' | 'h'
   * (Planet 'e' is TRAPPIST-1e itself — our reference frame — so it is excluded.)
   */
  systemDesignation: string;

  /**
   * The planet's orbital period around TRAPPIST-1, in Earth days.
   * These are known to high precision from transit observations.
   * Used to calculate the planet's position (its current "sign") at any date.
   */
  orbitalPeriodDays: number;

  /**
   * The synodic period of this planet as observed from TRAPPIST-1e, in days.
   *
   * The synodic period is how long the planet takes to complete one full
   * cycle through the 12 signs as seen from TRAPPIST-1e — i.e., the time
   * between successive conjunctions with the reference direction.
   *
   * For interior planets (b, c, d — faster orbits than 1e):
   *   1 / synodicPeriod = 1 / orbitalPeriod - 1 / TRAPPIST_1E_PERIOD
   *
   * For exterior planets (f, g, h — slower orbits than 1e):
   *   1 / synodicPeriod = 1 / TRAPPIST_1E_PERIOD - 1 / orbitalPeriod
   *
   * This determines how quickly the planet moves through the signs:
   *   sign change interval = synodicPeriodDays / 12
   */
  synodicPeriodDays: number;

  /**
   * Whether this planet orbits closer to TRAPPIST-1 than TRAPPIST-1e does.
   * - true  → interior planet (b, c, d): faster orbit, moves through signs quickly
   * - false → exterior planet (f, g, h): slower orbit, moves through signs more slowly
   */
  isInteriorToTrappist1e: boolean;

  /**
   * Optional notes field. Could hold information about the planet's
   * physical characteristics, visibility from TRAPPIST-1e, etc.
   * Null if not yet populated.
   */
  notes: string | null;

  /**
   * The ecliptic sign this planet currently occupies.
   * Null until a position calculation is performed and stored.
   *
   * This is a foreign key referencing the ecliptic_signs table.
   */
  currentSignId: number | null;

  /** Timestamp of when this row was inserted. Set automatically by the database. */
  createdAt: Date;
}

/**
 * The data required to create a new Planet row.
 * Omits fields the database generates (id, createdAt).
 */
export type NewPlanet = Omit<Planet, 'id' | 'createdAt'>;

// ---------------------------------------------------------------------------
// Query result shapes
// ---------------------------------------------------------------------------

/**
 * A Planet row joined with its current EclipticSign data.
 * Returned by queries that fetch a planet along with the sign it occupies.
 */
export interface PlanetWithCurrentSign extends Planet {
  currentSign: EclipticSign | null;
}
