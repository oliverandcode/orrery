/**
 * seed-data.ts
 *
 * Source-of-truth constants for seeding the database with known astronomical
 * data about the TRAPPIST-1 system.
 *
 * Separating seed data from the seed script itself means:
 *   - The data is easy to read, verify, and update independently
 *   - The seed script stays clean and focused on the insertion logic
 *   - Data can be imported by other modules (e.g. tests) without side effects
 *
 * --- Data sources ---
 *   Orbital periods: Agol et al. (2021), "Refining the Transit-timing and
 *   Photometric Analysis of TRAPPIST-1", Planet. Sci. J., 2, 1
 *   (the most precise published periods as of 2024)
 *
 *   Synodic periods: derived from orbital periods using the standard formula:
 *     interior: 1/P_syn = 1/P_planet - 1/P_1e
 *     exterior: 1/P_syn = 1/P_1e   - 1/P_planet
 *   where P_1e = 6.099615 days (TRAPPIST-1e's orbital period)
 */

import type { NewEclipticSign, NewPlanet } from '../models/types.js';

/**
 * TRAPPIST-1e's own orbital period, in Earth days.
 * Used as the reference period for synodic period calculations.
 * This planet is our observational reference frame — it is NOT included
 * in the planets table.
 */
export const TRAPPIST_1E_ORBITAL_PERIOD_DAYS = 6.099615;

/**
 * Calculates the synodic period of a TRAPPIST-1 planet as observed from
 * TRAPPIST-1e, given the planet's own orbital period.
 *
 * The synodic period is the time for the planet to return to the same
 * apparent position in TRAPPIST-1e's sky — i.e., one full cycle through
 * the 12 ecliptic signs.
 *
 * @param planetOrbitalPeriodDays - The planet's orbital period around TRAPPIST-1
 * @param isInterior - True if the planet orbits inside TRAPPIST-1e's orbit
 * @returns The synodic period in Earth days
 */
export function calculateSynodicPeriod(
  planetOrbitalPeriodDays: number,
  isInterior: boolean
): number {
  const trappist1eRate = 1 / TRAPPIST_1E_ORBITAL_PERIOD_DAYS;
  const planetRate     = 1 / planetOrbitalPeriodDays;

  const synodicRate = isInterior
    ? planetRate - trappist1eRate   // interior: planet laps TRAPPIST-1e
    : trappist1eRate - planetRate;  // exterior: TRAPPIST-1e laps planet

  // Round to 6 decimal places to avoid floating-point noise
  return Math.round((1 / synodicRate) * 1_000_000) / 1_000_000;
}

/**
 * The six planets in the TRAPPIST-1 system other than TRAPPIST-1e.
 * Ordered by orbital distance from TRAPPIST-1 (innermost first).
 */
export const TRAPPIST_SYSTEM_PLANETS: NewPlanet[] = [
  {
    name:                     'TRAPPIST-1b',
    systemDesignation:        'b',
    orbitalPeriodDays:        1.510826,
    synodicPeriodDays:        calculateSynodicPeriod(1.510826, true),
    isInteriorToTrappist1e:   true,
    currentSignId:            null,
    notes:                    'Innermost planet. Likely tidally locked. Probably too hot for liquid water. Fast-moving — completes a synodic cycle in under 2 days as seen from TRAPPIST-1e.',
  },
  {
    name:                     'TRAPPIST-1c',
    systemDesignation:        'c',
    orbitalPeriodDays:        2.421937,
    synodicPeriodDays:        calculateSynodicPeriod(2.421937, true),
    isInteriorToTrappist1e:   true,
    currentSignId:            null,
    notes:                    'Second planet. Also likely tidally locked and too hot for liquid water.',
  },
  {
    name:                     'TRAPPIST-1d',
    systemDesignation:        'd',
    orbitalPeriodDays:        4.049959,
    synodicPeriodDays:        calculateSynodicPeriod(4.049959, true),
    isInteriorToTrappist1e:   true,
    currentSignId:            null,
    notes:                    'Third planet. Receives slightly more radiation than TRAPPIST-1e. Interior to TRAPPIST-1e\'s orbit.',
  },
  {
    name:                     'TRAPPIST-1f',
    systemDesignation:        'f',
    orbitalPeriodDays:        9.207540,
    synodicPeriodDays:        calculateSynodicPeriod(9.207540, false),
    isInteriorToTrappist1e:   false,
    currentSignId:            null,
    notes:                    'First exterior planet. Receives less stellar radiation than TRAPPIST-1e. Potentially habitable.',
  },
  {
    name:                     'TRAPPIST-1g',
    systemDesignation:        'g',
    orbitalPeriodDays:        12.352446,
    synodicPeriodDays:        calculateSynodicPeriod(12.352446, false),
    isInteriorToTrappist1e:   false,
    currentSignId:            null,
    notes:                    'Second exterior planet. Cooler than TRAPPIST-1e. Slowest-moving of the easily visible planets.',
  },
  {
    name:                     'TRAPPIST-1h',
    systemDesignation:        'h',
    orbitalPeriodDays:        18.772866,
    synodicPeriodDays:        calculateSynodicPeriod(18.772866, false),
    isInteriorToTrappist1e:   false,
    currentSignId:            null,
    notes:                    'Outermost known planet. Likely very cold. Slowest synodic period — takes the longest to move through the signs.',
  },
];

/**
 * Generates the 12 ecliptic sign sections.
 *
 * Each section spans exactly 30° of ecliptic longitude.
 * Section 1 begins at 0° (the zero point: ecliptic/galactic plane crossing
 * toward the galactic center) and sections proceed eastward.
 *
 * Names are placeholder labels. The astrological system will eventually
 * assign culturally meaningful names to each section.
 */
export function generateEclipticSections(): NewEclipticSign[] {
  const TOTAL_SECTIONS     = 12;
  const DEGREES_PER_SECTION = 360 / TOTAL_SECTIONS; // = 30

  return Array.from({ length: TOTAL_SECTIONS }, (_, zeroBasedIndex) => {
    const sectionNumber         = zeroBasedIndex + 1;
    const startLongitudeDegrees = zeroBasedIndex * DEGREES_PER_SECTION;
    const endLongitudeDegrees   = sectionNumber  * DEGREES_PER_SECTION;

    return {
      sectionNumber,
      name:                 `Section ${sectionNumber}`,
      startLongitudeDegrees,
      endLongitudeDegrees,
      description:          null, // To be filled in as the system develops
    };
  });
}
