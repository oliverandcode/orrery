import { Prisma } from "../generated/client";
import { CelestialBodyType, EntitySlug } from "../generated/enums";

// helper function to validate type
const createCelestialBodyDict = <K extends EntitySlug, T extends Record<K, Prisma.CelestialBodyCreateInput>>(data: T & Record<K, Prisma.CelestialBodyCreateInput>) => data;

export const CELESTIAL_BODY_DICT = createCelestialBodyDict({
    [EntitySlug.TRAPPIST_1_SUN]: {
        name:       "TRAPPIST-1",
        slug:       EntitySlug.TRAPPIST_1_SUN,
        type:       CelestialBodyType.LUMINARY,
        astroLore:  "The sun's role in the TRAPPIST-1e astrological system.",
        astroData:  "Ultracool brown dwarf in the Aquarius constellation. " +
                    "Host star of the local solar system: the sun.",
    },
    [EntitySlug.TRAPPIST_1B]: {
        name:       "TRAPPIST-1b",
        slug:       EntitySlug.TRAPPIST_1B,
        type:       CelestialBodyType.PLANET,
        astroLore:  "The planet's role in the TRAPPIST-1e astrological system.",
        astroData:  "Astronomical information about the planet, with particular focus " +
                    "on observable characteristics from the surface of TRAPPIST-1e.",
    },
    [EntitySlug.TRAPPIST_1C]: {
        name:       "TRAPPIST-1c",
        slug:       EntitySlug.TRAPPIST_1C,
        type:       CelestialBodyType.PLANET,
        astroLore:  "The planet's role in the TRAPPIST-1e astrological system.",
        astroData:  "Astronomical information about the planet, with particular focus " +
                    "on observable characteristics from the surface of TRAPPIST-1e.",
    },
    [EntitySlug.TRAPPIST_1D]: {
        name:       "TRAPPIST-1d",
        slug:       EntitySlug.TRAPPIST_1D,
        type:       CelestialBodyType.PLANET,
        astroLore:  "The planet's role in the TRAPPIST-1e astrological system.",
        astroData:  "Astronomical information about the planet, with particular focus " +
                    "on observable characteristics from the surface of TRAPPIST-1e.",
    },
    [EntitySlug.TRAPPIST_1F]: {
        name:       "TRAPPIST-1f",
        slug:       EntitySlug.TRAPPIST_1F,
        type:       CelestialBodyType.PLANET,
        astroLore:  "The planet's role in the TRAPPIST-1e astrological system.",
        astroData:  "Astronomical information about the planet, with particular focus " +
                    "on observable characteristics from the surface of TRAPPIST-1e.",
    },
    [EntitySlug.TRAPPIST_1G]: {
        name:       "TRAPPIST-1g",
        slug:       EntitySlug.TRAPPIST_1G,
        type:       CelestialBodyType.PLANET,
        astroLore:  "The planet's role in the TRAPPIST-1e astrological system.",
        astroData:  "Astronomical information about the planet, with particular focus " +
                    "on observable characteristics from the surface of TRAPPIST-1e.",
    },
    [EntitySlug.TRAPPIST_1H]: {
        name:       "TRAPPIST-1h",
        slug:       EntitySlug.TRAPPIST_1H,
        type:       CelestialBodyType.PLANET,
        astroLore:  "The planet's role in the TRAPPIST-1e astrological system.",
        astroData:  "Astronomical information about the planet, with particular focus " +
                    "on observable characteristics from the surface of TRAPPIST-1e.",
    },
} as const); // 'as const' ensures text literals carry over exactly

export const CELESTIAL_BODIES: Prisma.CelestialBodyCreateInput[] = Object.values(CELESTIAL_BODY_DICT);
