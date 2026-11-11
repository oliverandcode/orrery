import { CELESTIAL_BODY_DICT } from "./celestial-bodies";
import { ElementType, EntitySlug, Modality, Prisma } from "../generated/client";
import { ZODIAC_SIGN_DICT } from "./zodiac-signs";


export function createLookupKey(keys: EntitySlug[]): string {
    return [...keys].sort().join("_");
};

// interface for helper
interface BodyInSignInput {
    body: Prisma.CelestialBodyCreateInput;
    sign: Prisma.ZodiacSignCreateInput;
    rawText: string | ((cb: Prisma.CelestialBodyCreateInput, s: Prisma.ZodiacSignCreateInput) => string);
};

// helper function to build interpretations gracefully
function createBodyInSignEntry({ body, sign, rawText }: BodyInSignInput): Prisma.InterpretationCreateInput {
    const finalText = typeof rawText === 'function'
        ? rawText(body, sign)
        : rawText;
    const sortedKeys = [body.slug, sign.slug].sort(); // enforce sort order
    /* 
    * this does mean that the keys are sorted twice,
    * once in sortedKeys and once in createLookupKey,
    * but it's worthwhile to keep the sorting in createLookupKey,
    * in case it gets reused elsewhere.
    */
    return {
        title: `${body.name} in ${sign.name}`,
        text: finalText,
        matchKeys: sortedKeys,
        lookupKey: createLookupKey(sortedKeys),
    }
};

export const BODY_IN_SIGN_INTERPRETATIONS: Prisma.InterpretationCreateInput[] = [
    createBodyInSignEntry({
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        sign: ZODIAC_SIGN_DICT.SIGN_ALPHA,
        rawText: (cb, s) => `Interpretation text for ${cb.name} in ${s.name}.`
    }),
];

/*
* NOTE: Interpretation table contains JSON column ("matchKeys") with a lookup array to find specific interpretations
*
* e.g. ["TRAPPIST_1_SUN", "SIGN_ALPHA"]             ...celestial body in a sign (e.g. "Sun in Aries")
* or ["TRAPPIST_1_SUN", "HOUSE_01"]                 ...celestial body in a house (e.g. "Sun in the first house")
* or ["TRAPPIST_1_SUN", "SIGN_ALPHA", "HOUSE_01"]   ...celestial body in a sign AND house (e.g. "Sun in Aries in the first house")
* or for aspects: ["TRAPPIST_1B", "ASPECT_SQUARE", "TRAPPIST_1C"]   ...body squares another body (e.g. "Venus squares Mars")
*
* PLANS for expansion:
* v0.0: interpretation table exists
* v0.1: interpretations for sun in each sign (+12)
* v0.2: interpretations for inner planets (b, c, d) 
*       in each sign (+36)
* v0.3: interpretations for outer planets (f, g, h)
*       in each sign (+36)
* v0.4: interpretations for sun and planets in each house (+84)
* beyond: 
*   - interpretations for sun and planets in each sign/house combo (likely never complete! very large number)
*   - data structure added for aspect interpretations
*   - interpretations for major aspects (conjunction, opposition, trine, square, sextile)
*   - interpretations for minor aspects (quincunx, semi-sextile, semi-square, sesquiquadrate...)
*   - interpretations for sign-house combos (without a celestial body)
*
* LOOKUP ALGORITHM:
* 1. Check for all 3 keys: 
*       - celestial body, sign, house
*       - aspecting celestial body, aspect type, aspected celestial body
* 2. Check for celestial body + sign, AND celestial body + house. (MOST COMMON)
*    WARNING: No fallback for aspect key arrays that are missing an interpretation. Not sure if this is a bug yet or not. 
* 3. Check for sign + house. (UNCOMMON)
*/
