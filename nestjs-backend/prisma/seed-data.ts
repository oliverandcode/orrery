import { CelestialBodyType, ElementType, EntitySlug, Modality, Prisma } from "./generated/client";

// all signs and houses are split into equal 30º segments (non-overlapping)
const degreeRange = 360.0 / 30;

export const CELESTIAL_BODIES: Prisma.CelestialBodyCreateInput[] = [
    {
        name:       "TRAPPIST-1",
        slug:       EntitySlug.TRAPPIST_1_SUN,
        type:       CelestialBodyType.LUMINARY,
        astroLore:  "The sun's role in the TRAPPIST-1e astrological system.",
        astroData:  "Ultracool brown dwarf in the Aquarius constellation. " +
                    "Host star of the local solar system: the sun.",
    },
];

export const ZODIAC_SIGNS: Prisma.ZodiacSignCreateInput[] = [
    {
        name: "Alpha",
        slug: EntitySlug.SIGN_ALPHA,
        number: 1,
        symbol: "The symbol for the first zodiac sign of TRAPPIST-1e.",
        startLongitude: (0 * degreeRange), // zero point: intersection of ecliptic & galactic planes
        astroLore: "The first sign's archetype in the TRAPPIST-1e astrological system.",
        astroData: "The star configuration within the first segment of the ecliptic plane.",
        elementType: ElementType.FIRE,
        mode: Modality.CARDINAL,
    },
    {
        name: "Bravo",
        slug: EntitySlug.SIGN_BRAVO,
        number: 2,
        symbol: "The symbol for the second zodiac sign of TRAPPIST-1e.",
        startLongitude: (1 * degreeRange), // zero point: intersection of ecliptic & galactic planes
        astroLore: "The second sign's archetype in the TRAPPIST-1e astrological system.",
        astroData: "The star configuration within the second segment of the ecliptic plane.",
        elementType: ElementType.EARTH,
        mode: Modality.FIXED,
    },
];

export const HOUSES: Prisma.HouseCreateInput[] = [
    {
        slug: EntitySlug.HOUSE_01,
        number: 1,
        astroLore: "The domain of the first house in TRAPPIST-1e's astrological system.",
        ascendantOffset: (0 * degreeRange), // the Ascendant cusp
    },
];
