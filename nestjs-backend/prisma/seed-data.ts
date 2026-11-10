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
    {
        name:       "TRAPPIST-1b",
        slug:       EntitySlug.TRAPPIST_1B,
        type:       CelestialBodyType.PLANET,
        astroLore:  "The planet's role in the TRAPPIST-1e astrological system.",
        astroData:  "Astronomical information about the planet, with particular focus " +
                    "on observable characteristics from the surface of TRAPPIST-1e.",
    },
    {
        name:       "TRAPPIST-1c",
        slug:       EntitySlug.TRAPPIST_1C,
        type:       CelestialBodyType.PLANET,
        astroLore:  "The planet's role in the TRAPPIST-1e astrological system.",
        astroData:  "Astronomical information about the planet, with particular focus " +
                    "on observable characteristics from the surface of TRAPPIST-1e.",
    },
    {
        name:       "TRAPPIST-1d",
        slug:       EntitySlug.TRAPPIST_1D,
        type:       CelestialBodyType.PLANET,
        astroLore:  "The planet's role in the TRAPPIST-1e astrological system.",
        astroData:  "Astronomical information about the planet, with particular focus " +
                    "on observable characteristics from the surface of TRAPPIST-1e.",
    },
    {
        name:       "TRAPPIST-1f",
        slug:       EntitySlug.TRAPPIST_1F,
        type:       CelestialBodyType.PLANET,
        astroLore:  "The planet's role in the TRAPPIST-1e astrological system.",
        astroData:  "Astronomical information about the planet, with particular focus " +
                    "on observable characteristics from the surface of TRAPPIST-1e.",
    },
    {
        name:       "TRAPPIST-1g",
        slug:       EntitySlug.TRAPPIST_1G,
        type:       CelestialBodyType.PLANET,
        astroLore:  "The planet's role in the TRAPPIST-1e astrological system.",
        astroData:  "Astronomical information about the planet, with particular focus " +
                    "on observable characteristics from the surface of TRAPPIST-1e.",
    },
    {
        name:       "TRAPPIST-1h",
        slug:       EntitySlug.TRAPPIST_1H,
        type:       CelestialBodyType.PLANET,
        astroLore:  "The planet's role in the TRAPPIST-1e astrological system.",
        astroData:  "Astronomical information about the planet, with particular focus " +
                    "on observable characteristics from the surface of TRAPPIST-1e.",
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
        elementType: ElementType.FIRE, // may change this or get rid of this field entirely
        mode: Modality.CARDINAL, // may change this or get rid of this field entirely
    },
    {
        name: "Bravo",
        slug: EntitySlug.SIGN_BRAVO,
        number: 2,
        symbol: "The symbol for this zodiac sign.",
        startLongitude: (1 * degreeRange),
        astroLore: "This sign's archetype in the TRAPPIST-1e astrological system.",
        astroData: "The star configuration within this sign's segment of the ecliptic plane.",
        elementType: ElementType.EARTH,
        mode: Modality.FIXED,
    },
    {
        name: "Charlie",
        slug: EntitySlug.SIGN_CHARLIE,
        number: 3,
        symbol: "The symbol for this zodiac sign.",
        startLongitude: (2 * degreeRange),
        astroLore: "This sign's archetype in the TRAPPIST-1e astrological system.",
        astroData: "The star configuration within this sign's segment of the ecliptic plane.",
        elementType: ElementType.AIR,
        mode: Modality.MUTABLE,
    },
    {
        name: "Delta",
        slug: EntitySlug.SIGN_DELTA,
        number: 4,
        symbol: "The symbol for this zodiac sign.",
        startLongitude: (3 * degreeRange),
        astroLore: "This sign's archetype in the TRAPPIST-1e astrological system.",
        astroData: "The star configuration within this sign's segment of the ecliptic plane.",
        elementType: ElementType.WATER,
        mode: Modality.CARDINAL,
    },
    {
        name: "Echo",
        slug: EntitySlug.SIGN_ECHO,
        number: 5,
        symbol: "The symbol for this zodiac sign.",
        startLongitude: (4 * degreeRange),
        astroLore: "This sign's archetype in the TRAPPIST-1e astrological system.",
        astroData: "The star configuration within this sign's segment of the ecliptic plane.",
        elementType: ElementType.FIRE,
        mode: Modality.FIXED,
    },
    {
        name: "Foxtrot",
        slug: EntitySlug.SIGN_FOXTROT,
        number: 6,
        symbol: "The symbol for this zodiac sign.",
        startLongitude: (5 * degreeRange),
        astroLore: "This sign's archetype in the TRAPPIST-1e astrological system.",
        astroData: "The star configuration within this sign's segment of the ecliptic plane.",
        elementType: ElementType.EARTH,
        mode: Modality.MUTABLE,
    },
    {
        name: "Golf",
        slug: EntitySlug.SIGN_GOLF,
        number: 7,
        symbol: "The symbol for this zodiac sign.",
        startLongitude: (6 * degreeRange),
        astroLore: "This sign's archetype in the TRAPPIST-1e astrological system.",
        astroData: "The star configuration within this sign's segment of the ecliptic plane.",
        elementType: ElementType.AIR,
        mode: Modality.CARDINAL,
    },
    {
        name: "Hotel",
        slug: EntitySlug.SIGN_HOTEL,
        number: 8,
        symbol: "The symbol for this zodiac sign.",
        startLongitude: (7 * degreeRange),
        astroLore: "This sign's archetype in the TRAPPIST-1e astrological system.",
        astroData: "The star configuration within this sign's segment of the ecliptic plane.",
        elementType: ElementType.WATER,
        mode: Modality.FIXED,
    },
    {
        name: "India",
        slug: EntitySlug.SIGN_INDIA,
        number: 9,
        symbol: "The symbol for this zodiac sign.",
        startLongitude: (8 * degreeRange),
        astroLore: "This sign's archetype in the TRAPPIST-1e astrological system.",
        astroData: "The star configuration within this sign's segment of the ecliptic plane.",
        elementType: ElementType.FIRE,
        mode: Modality.MUTABLE,
    },
    {
        name: "Juliet",
        slug: EntitySlug.SIGN_JULIET,
        number: 10,
        symbol: "The symbol for this zodiac sign.",
        startLongitude: (9 * degreeRange),
        astroLore: "This sign's archetype in the TRAPPIST-1e astrological system.",
        astroData: "The star configuration within this sign's segment of the ecliptic plane.",
        elementType: ElementType.EARTH,
        mode: Modality.CARDINAL,
    },
    {
        name: "Kilo",
        slug: EntitySlug.SIGN_KILO,
        number: 11,
        symbol: "The symbol for this zodiac sign.",
        startLongitude: (10 * degreeRange),
        astroLore: "This sign's archetype in the TRAPPIST-1e astrological system.",
        astroData: "The star configuration within this sign's segment of the ecliptic plane.",
        elementType: ElementType.AIR,
        mode: Modality.FIXED,
    },
    {
        name: "Lima",
        slug: EntitySlug.SIGN_LIMA,
        number: 12,
        symbol: "The symbol for this zodiac sign.",
        startLongitude: (11 * degreeRange),
        astroLore: "This sign's archetype in the TRAPPIST-1e astrological system.",
        astroData: "The star configuration within this sign's segment of the ecliptic plane.",
        elementType: ElementType.WATER,
        mode: Modality.MUTABLE,
    },
];

export const HOUSES: Prisma.HouseCreateInput[] = [
    {
        slug: EntitySlug.HOUSE_01,
        number: 1,
        astroLore: "The domain of the first house in TRAPPIST-1e's astrological system.",
        ascendantOffset: (0 * degreeRange), // the Ascendant cusp (Rise)
    },
    {
        slug: EntitySlug.HOUSE_02,
        number: 2,
        astroLore: "The domain of this house.",
        ascendantOffset: (1 * degreeRange), // 30.0º
    },
    {
        slug: EntitySlug.HOUSE_03,
        number: 3,
        astroLore: "The domain of this house.",
        ascendantOffset: (2 * degreeRange), // 60.0º
    },
    {
        slug: EntitySlug.HOUSE_04,
        number: 4,
        astroLore: "The domain of this house.",
        ascendantOffset: (3 * degreeRange), // 90º IC (Imum Coeli, Nadir, Underheaven, Roots)
    },
    {
        slug: EntitySlug.HOUSE_05,
        number: 5,
        astroLore: "The domain of this house.",
        ascendantOffset: (4 * degreeRange), // 120º
    },
    {
        slug: EntitySlug.HOUSE_06,
        number: 6,
        astroLore: "The domain of this house.",
        ascendantOffset: (5 * degreeRange), // 150º
    },
    {
        slug: EntitySlug.HOUSE_07,
        number: 7,
        astroLore: "The domain of this house.",
        ascendantOffset: (6 * degreeRange), // 180º Descendant (Rest)
    },
    {
        slug: EntitySlug.HOUSE_O8,
        number: 8,
        astroLore: "The domain of this house.",
        ascendantOffset: (7 * degreeRange), // 210º
    },
    {
        slug: EntitySlug.HOUSE_09,
        number: 9,
        astroLore: "The domain of this house.",
        ascendantOffset: (8 * degreeRange), // 240º
    },
    {
        slug: EntitySlug.HOUSE_10,
        number: 10,
        astroLore: "The domain of this house.",
        ascendantOffset: (9 * degreeRange), // 270º MC (Midheaven, Medium Caelum, Zenith, Reach)
    },
    {
        slug: EntitySlug.HOUSE_11,
        number: 11,
        astroLore: "The domain of this house.",
        ascendantOffset: (10 * degreeRange), // 300º
    },
    {
        slug: EntitySlug.HOUSE_12,
        number: 12,
        astroLore: "The domain of this house.",
        ascendantOffset: (11 * degreeRange), // 330º
    },
];
