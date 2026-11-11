import { Prisma } from "../generated/client";
import { EntitySlug } from "../generated/enums";
import { degreeRange } from "./constants";

// helper function to validate type
const createHouseDict = <K extends EntitySlug, T extends Record<K, Prisma.HouseCreateInput>>(data: T & Record<K, Prisma.HouseCreateInput>) => data;

export const HOUSE_DICT = createHouseDict({
    [EntitySlug.HOUSE_01]: {
        name: "First House",
        slug: EntitySlug.HOUSE_01,
        number: 1,
        astroLore: "The domain of the first house in TRAPPIST-1e's astrological system.",
        ascendantOffset: (0 * degreeRange), // the Ascendant cusp (Rise)
    },
    [EntitySlug.HOUSE_02]: {
        name: "Second House",
        slug: EntitySlug.HOUSE_02,
        number: 2,
        astroLore: "The domain of this house.",
        ascendantOffset: (1 * degreeRange), // 30.0º
    },
    [EntitySlug.HOUSE_03]: {
        name: "Third House",
        slug: EntitySlug.HOUSE_03,
        number: 3,
        astroLore: "The domain of this house.",
        ascendantOffset: (2 * degreeRange), // 60.0º
    },
    [EntitySlug.HOUSE_04]: {
        name: "Fourth House",
        slug: EntitySlug.HOUSE_04,
        number: 4,
        astroLore: "The domain of this house.",
        ascendantOffset: (3 * degreeRange), // 90º IC (Imum Coeli, Nadir, Underheaven, Roots)
    },
    [EntitySlug.HOUSE_05]: {
        name: "Fifth House",
        slug: EntitySlug.HOUSE_05,
        number: 5,
        astroLore: "The domain of this house.",
        ascendantOffset: (4 * degreeRange), // 120º
    },
    [EntitySlug.HOUSE_06]: {
        name: "Sixth House",
        slug: EntitySlug.HOUSE_06,
        number: 6,
        astroLore: "The domain of this house.",
        ascendantOffset: (5 * degreeRange), // 150º
    },
    [EntitySlug.HOUSE_07]: {
        name: "Seventh House",
        slug: EntitySlug.HOUSE_07,
        number: 7,
        astroLore: "The domain of this house.",
        ascendantOffset: (6 * degreeRange), // 180º Descendant (Rest)
    },
    [EntitySlug.HOUSE_O8]: {
        name: "Eighth House",
        slug: EntitySlug.HOUSE_O8,
        number: 8,
        astroLore: "The domain of this house.",
        ascendantOffset: (7 * degreeRange), // 210º
    },
    [EntitySlug.HOUSE_09]: {
        name: "Ninth House",
        slug: EntitySlug.HOUSE_09,
        number: 9,
        astroLore: "The domain of this house.",
        ascendantOffset: (8 * degreeRange), // 240º
    },
    [EntitySlug.HOUSE_10]: {
        name: "Tenth House",
        slug: EntitySlug.HOUSE_10,
        number: 10,
        astroLore: "The domain of this house.",
        ascendantOffset: (9 * degreeRange), // 270º MC (Midheaven, Medium Caelum, Zenith, Reach)
    },
    [EntitySlug.HOUSE_11]: {
        name: "Eleventh House",
        slug: EntitySlug.HOUSE_11,
        number: 11,
        astroLore: "The domain of this house.",
        ascendantOffset: (10 * degreeRange), // 300º
    },
    [EntitySlug.HOUSE_12]: {
        name: "Twelfth House",
        slug: EntitySlug.HOUSE_12,
        number: 12,
        astroLore: "The domain of this house.",
        ascendantOffset: (11 * degreeRange), // 330º
    },
} as const); // 'as const' ensures text literals carry over exactly

export const HOUSES: Prisma.HouseCreateInput[] = Object.values(HOUSE_DICT);
