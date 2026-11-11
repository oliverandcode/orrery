import { EntitySlug, Prisma } from "../generated/client";
import { createInterpretation } from "./builders";
import { CELESTIAL_BODY_DICT } from "./celestial-bodies";
import { HOUSE_DICT } from "./houses";
import { InterpretationInput } from "./types";
import { ZODIAC_SIGN_DICT } from "./zodiac-signs";

const INTERPRETATION_DATA: InterpretationInput[] = [
    // body in sign interpretations
    {
        type: "BODY_IN_SIGN",
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        sign: ZODIAC_SIGN_DICT.SIGN_ALPHA,
        rawText: ({ body, sign }) => `Interpretation text for ${body.name} in ${sign.name}.`,
    },
    {
        type: "BODY_IN_SIGN",
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        sign: ZODIAC_SIGN_DICT.SIGN_BRAVO,
        rawText: ({ body, sign }) => `Interpretation text for ${body.name} in ${sign.name}.`,
    },
    {
        type: "BODY_IN_SIGN",
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        sign: ZODIAC_SIGN_DICT.SIGN_CHARLIE,
        rawText: ({ body, sign }) => `Interpretation text for ${body.name} in ${sign.name}.`,
    },
    {
        type: "BODY_IN_SIGN",
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        sign: ZODIAC_SIGN_DICT.SIGN_DELTA,
        rawText: ({ body, sign }) => `Interpretation text for ${body.name} in ${sign.name}.`,
    },
    {
        type: "BODY_IN_SIGN",
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        sign: ZODIAC_SIGN_DICT.SIGN_ECHO,
        rawText: ({ body, sign }) => `Interpretation text for ${body.name} in ${sign.name}.`,
    },
    {
        type: "BODY_IN_SIGN",
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        sign: ZODIAC_SIGN_DICT.SIGN_FOXTROT,
        rawText: ({ body, sign }) => `Interpretation text for ${body.name} in ${sign.name}.`,
    },
    {
        type: "BODY_IN_SIGN",
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        sign: ZODIAC_SIGN_DICT.SIGN_GOLF,
        rawText: ({ body, sign }) => `Interpretation text for ${body.name} in ${sign.name}.`,
    },
    {
        type: "BODY_IN_SIGN",
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        sign: ZODIAC_SIGN_DICT.SIGN_HOTEL,
        rawText: ({ body, sign }) => `Interpretation text for ${body.name} in ${sign.name}.`,
    },
    {
        type: "BODY_IN_SIGN",
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        sign: ZODIAC_SIGN_DICT.SIGN_INDIA,
        rawText: ({ body, sign }) => `Interpretation text for ${body.name} in ${sign.name}.`,
    },
    {
        type: "BODY_IN_SIGN",
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        sign: ZODIAC_SIGN_DICT.SIGN_JULIET,
        rawText: ({ body, sign }) => `Interpretation text for ${body.name} in ${sign.name}.`,
    },
    {
        type: "BODY_IN_SIGN",
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        sign: ZODIAC_SIGN_DICT.SIGN_KILO,
        rawText: ({ body, sign }) => `Interpretation text for ${body.name} in ${sign.name}.`,
    },
    {
        type: "BODY_IN_SIGN",
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        sign: ZODIAC_SIGN_DICT.SIGN_LIMA,
        rawText: ({ body, sign }) => `Interpretation text for ${body.name} in ${sign.name}.`,
    },
    // body in house
    {
        type: "BODY_IN_HOUSE",
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        house: HOUSE_DICT.HOUSE_01,
        rawText: ({ body, house }) => `Interpretation text for ${body.name} in the ${house.name}.`,
    },
    // body in sign and house
    {
        type: "BODY_IN_SIGN_AND_HOUSE",
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        sign: ZODIAC_SIGN_DICT.SIGN_ALPHA,
        house: HOUSE_DICT.HOUSE_01,
        rawText: ({ body, house, sign }) => `Interpretation text for ${body.name} in ${sign.name} in the ${house.name}.`,
    },
    // aspect
    {
        type: "ASPECT",
        bodyA: CELESTIAL_BODY_DICT.TRAPPIST_1B,
        aspect: EntitySlug.ASPECT_CONJUNCT,
        bodyB: CELESTIAL_BODY_DICT.TRAPPIST_1C,
        rawText: ({ bodyA, aspect, bodyB }) => `When ${bodyA.name} is ${aspect} ${bodyB.name}...`,
    },
];

export const INTERPRETATIONS: Prisma.InterpretationCreateInput[] = INTERPRETATION_DATA.map(createInterpretation);

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
*/
