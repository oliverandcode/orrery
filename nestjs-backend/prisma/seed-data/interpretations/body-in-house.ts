import { InterpretationInput } from "../types";
import { CELESTIAL_BODY_DICT } from "../celestial-bodies";
import { HOUSE_DICT } from "../houses";

export const SUN_IN_HOUSE: InterpretationInput[] = [
    {
        type: "BODY_IN_HOUSE",
        body: CELESTIAL_BODY_DICT.TRAPPIST_1_SUN,
        house: HOUSE_DICT.HOUSE_01,
        rawText: ({ body, house }) => `Interpretation text for ${body.name} in the ${house.name}.`,
    },
];

// empty for now...
export const T1B_IN_HOUSE: InterpretationInput[] = [];

// empty for now...
export const T1C_IN_HOUSE: InterpretationInput[] = [];

// empty for now...
export const T1D_IN_HOUSE: InterpretationInput[] = [];

// empty for now...
export const T1F_IN_HOUSE: InterpretationInput[] = [];

// empty for now...
export const T1G_IN_HOUSE: InterpretationInput[] = [];

// empty for now...
export const T1H_IN_HOUSE: InterpretationInput[] = [];
