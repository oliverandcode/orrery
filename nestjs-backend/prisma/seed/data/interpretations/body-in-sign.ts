import { InterpretationInput } from "../../types";
import { CELESTIAL_BODY_DICT } from "../celestial-bodies";
import { ZODIAC_SIGN_DICT } from "../zodiac-signs";

export const SUN_IN_SIGN: InterpretationInput[] = [
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
];

// empty for now...
export const T1B_IN_SIGN: InterpretationInput[] = [];

// empty for now...
export const T1C_IN_SIGN: InterpretationInput[] = [];

// empty for now...
export const T1D_IN_SIGN: InterpretationInput[] = [];

// empty for now...
export const T1F_IN_SIGN: InterpretationInput[] = [];

// empty for now...
export const T1G_IN_SIGN: InterpretationInput[] = [];

// empty for now...
export const T1H_IN_SIGN: InterpretationInput[] = [];
