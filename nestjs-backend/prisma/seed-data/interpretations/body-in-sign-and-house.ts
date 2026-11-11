import { InterpretationInput } from "../types";
import { CELESTIAL_BODY_DICT } from "../celestial-bodies";
import { ZODIAC_SIGN_DICT } from "../zodiac-signs";
import { HOUSE_DICT } from "../houses";

export const SUN_IN_SIGN_AND_HOUSE: InterpretationInput[] = [
    {
        type: "BODY_IN_SIGN_AND_HOUSE",
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        sign: ZODIAC_SIGN_DICT.SIGN_ALPHA,
        house: HOUSE_DICT.HOUSE_01,
        rawText: ({ body, house, sign }) => `Interpretation text for ${body.name} in ${sign.name} in the ${house.name}.`,
    },
];

// empty for now...
export const T1B_IN_SIGN_AND_HOUSE: InterpretationInput[] = [];

// empty for now...
export const T1C_IN_SIGN_AND_HOUSE: InterpretationInput[] = [];

// empty for now...
export const T1D_IN_SIGN_AND_HOUSE: InterpretationInput[] = [];

// empty for now...
export const T1F_IN_SIGN_AND_HOUSE: InterpretationInput[] = [];

// empty for now...
export const T1G_IN_SIGN_AND_HOUSE: InterpretationInput[] = [];

// empty for now...
export const T1H_IN_SIGN_AND_HOUSE: InterpretationInput[] = [];
