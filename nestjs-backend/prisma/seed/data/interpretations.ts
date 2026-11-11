import { Prisma } from "../../generated/client";
import { InterpretationInput } from "../types";
import { createInterpretation } from "../builders";
import { SUN_IN_SIGN, T1B_IN_SIGN, T1C_IN_SIGN, T1D_IN_SIGN, T1F_IN_SIGN, T1G_IN_SIGN, T1H_IN_SIGN } from "./interpretations/body-in-sign";
import { SUN_IN_HOUSE, T1B_IN_HOUSE, T1C_IN_HOUSE, T1D_IN_HOUSE, T1F_IN_HOUSE, T1G_IN_HOUSE, T1H_IN_HOUSE } from "./interpretations/body-in-house";
import { SUN_IN_SIGN_AND_HOUSE, T1B_IN_SIGN_AND_HOUSE, T1C_IN_SIGN_AND_HOUSE, T1D_IN_SIGN_AND_HOUSE, T1F_IN_SIGN_AND_HOUSE, T1G_IN_SIGN_AND_HOUSE, T1H_IN_SIGN_AND_HOUSE } from "./interpretations/body-in-sign-and-house";
import { CONJUNCTION, OPPOSITION, QUINCUNX, SEMISEXTILE, SEXTILE, SQUARE, TRINE } from "./interpretations/aspects";

const INTERPRETATION_DATA: InterpretationInput[] = [
    // body in sign interpretations
    ...SUN_IN_SIGN,
    ...T1B_IN_SIGN,
    ...T1C_IN_SIGN,
    ...T1D_IN_SIGN,
    ...T1F_IN_SIGN,
    ...T1G_IN_SIGN,
    ...T1H_IN_SIGN,
    // body in house
    ...SUN_IN_HOUSE,
    ...T1B_IN_HOUSE,
    ...T1C_IN_HOUSE,
    ...T1D_IN_HOUSE,
    ...T1F_IN_HOUSE,
    ...T1G_IN_HOUSE,
    ...T1H_IN_HOUSE,
    // body in sign and house
    ...SUN_IN_SIGN_AND_HOUSE,
    ...T1B_IN_SIGN_AND_HOUSE,
    ...T1C_IN_SIGN_AND_HOUSE,
    ...T1D_IN_SIGN_AND_HOUSE,
    ...T1F_IN_SIGN_AND_HOUSE,
    ...T1G_IN_SIGN_AND_HOUSE,
    ...T1H_IN_SIGN_AND_HOUSE,
    // aspect interpretations
    ...CONJUNCTION,  
    ...OPPOSITION,
    ...SQUARE,
    ...TRINE,
    ...SEXTILE,
    ...QUINCUNX,
    ...SEMISEXTILE,
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
* These arrays are systematically sorted and converted into strings joined on underscores to make them easier to query for uniqueness
* 
* e.g.  ["TRAPPIST_1_SUN", "SIGN_ALPHA"] => "SIGN_ALPHA_TRAPPIST_1_SUN"
*       ["SIGN_ALPHA", "TRAPPIST_1_SUN"] => "SIGN_ALPHA_TRAPPIST_1_SUN" (same order to enforce unique combinations)
*       ["TRAPPIST_1_SUN", "HOUSE_01"] => "HOUSE_01_TRAPPIST_1_SUN"
*       ["TRAPPIST_1_SUN", "SIGN_ALPHA", "HOUSE_01"] => "HOUSE_01_SIGN_ALPHA_TRAPPIST_1_SUN"
*       ["TRAPPIST_1B", "ASPECT_SQUARE", "TRAPPIST_1C"] => "ASPECT_SQUARE_TRAPPIST_1B_TRAPPIST_1C" (all aspects are mutual/bidirectional for now)
*
* PLANS FOR EXPANSION:
* 
* v0.0: interpretation table exists [x]
* 
* v0.1: body in sign (+84)          [ ]
*       [x] sun (+12)
*       [ ] b (+12)
*       [ ] c (+12)
*       [ ] d (+12)
*       [ ] f (+12)
*       [ ] g (+12)
*       [ ] h (+12)
* 
* v0.2: body in house (+84)         [ ]
*       [ ] sun (+12)
*       [ ] b (+12)
*       [ ] c (+12)
*       [ ] d (+12)
*       [ ] f (+12)
*       [ ] g (+12)
*       [ ] h (+12)
* 
* v0.3: major aspects (+105)        [ ]
*       [ ] conjunction (+21)
*       [ ] opposition (+21)
*       [ ] square (+21)
*       [ ] trine (+21)
*       [ ] sextile (+21)
* 
*       * aspects are mutual, so
*         don't recount combos
* 
* beyond:
*   - ascendant + midheaven etc (prisma schema update)
*   - body in sign AND house (up to 1008 possible)
*       6 planets * 12 signs * 12 houses
*   - minor aspects
*   - sign + house (no body)
*/
