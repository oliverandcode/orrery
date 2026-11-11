import { InterpretationInput } from "../../types";
import { CELESTIAL_BODY_DICT } from "../celestial-bodies";
import { EntitySlug } from "../../../generated/enums";
import { formatAspect } from "../../builders";

// MAJOR ASPECTS

// 0º angle (right on top!) 
// nature: overwhelming influence
// metaphor: magnifying glass, megaphone
export const CONJUNCTION: InterpretationInput[] = [
    {
        type: "ASPECT",
        bodyA: CELESTIAL_BODY_DICT.TRAPPIST_1B,
        aspect: EntitySlug.ASPECT_CONJUNCT,
        bodyB: CELESTIAL_BODY_DICT.TRAPPIST_1C,
        rawText: ({ bodyA, aspect, bodyB }) => `When ${bodyA.name} is ${formatAspect(aspect)} ${bodyB.name}...`,
    },
];

// empty for now...
// 180º angle (6 signs away, directly across)
// nature: tension, balance-seeking, dynamic equilibrium
// metaphor: tightrope, tug of war
// same modality, different element, same polarity
export const OPPOSITION: InterpretationInput[] = [];

// empty for now...
// 90º angle (3 signs away)
// nature: obstacles, challenges, productive friction
// metaphor: hurdle, obstacle course, grinding gears
// same modality, different element, different polarity
export const SQUARE: InterpretationInput[] = [];

// empty for now...
// 120º angle (4 signs away)
// nature: harmony, natural ease, flow (passive)
// metaphor: rivers, chords, well-oiled machine
// metaphor: inherited wealth, natural talent, winning the lottery
// same element, different modality, same polarity
export const TRINE: InterpretationInput[] = [];

// empty for now...
// 60º angle (2 signs away)
// nature: opportunity, complementarity, cooperation (active)
// metaphor: jazz/improv, an open door, seeds
// metaphor: scholarship award, job offer
// different element, different modality, same polarity
export const SEXTILE: InterpretationInput[] = [];


// MINOR ASPECTS (low priority)

// empty for now...
// 150º angle (5 signs away)
// nature: awkwardness, lack of common ground
// metaphor: square peg, an itch you can't scratch, language barrier, 
// metaphor: oil and water, crossed wires
// different element, modality, AND polarity
export const QUINCUNX: InterpretationInput[] = [];

// empty for now...
// 30º angle (adjacent signs)
// nature: friction, blind spots
// metaphor: mismatched neighbors, blind spots, shifting gears
// metaphorstrange bedfellows, ships passing in the night, friendly strangers
// different element, modality, AND polarity
export const SEMISEXTILE: InterpretationInput[] = [];

// ***** THE FOLLOWING HAVE NOT BEEN ADDED TO INTERPRETATION_DATA *****

// empty for now...
// 45º angle (1.5 signs away)
// nature: 
// metaphor: 
export const SEMISQUARE: InterpretationInput[] = [];

// empty for now...
// 135º angle (4.5 signs away)
// nature: 
// metaphor: 
export const SESQUIQUADRATE: InterpretationInput[] = [];

// empty for now...
// 72º angle (2.4 signs away)
// nature: 
// metaphor: 
export const QUINTILE: InterpretationInput[] = [];

// empty for now...
// 144º angle (4.8 signs away)
// nature: 
// metaphor: 
export const BIQUINTILE: InterpretationInput[] = [];

// empty for now...
// angle (signs away)
// nature: 
// metaphor: 
export const SEPTILE: InterpretationInput[] = [];

// empty for now...
// angle (signs away)
// nature: 
// metaphor: 
export const NOVILE: InterpretationInput[] = [];

// empty for now...
// angle (signs away)
// nature: 
// metaphor: 
export const DECILE: InterpretationInput[] = [];

