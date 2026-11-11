import { Prisma } from "../generated/client";
import { EntitySlug } from "../generated/enums";
import { InterpretationInput } from "./types";

export function createLookupKey(keys: EntitySlug[]): string {
    return [...keys].sort().join("_");
};

// formatting aspect enums for use in text
// NOTE: kind of a hack, should probably create a table 
// with display names and astrological descriptions
function formatAspect(aspect: EntitySlug): string {
    const stringAspect = aspect.toString();
    return stringAspect.replace(/^ASPECT_/, "").toLowerCase();
}

// generic builder function to handle all interpretation types
export function createInterpretation(input: InterpretationInput): Prisma.InterpretationCreateInput {
    let entryTitle: string;
    let rawKeys: EntitySlug[];

    // extract title and raw keys based on the specific combo
    switch (input.type) {
        case "BODY_IN_SIGN":
            entryTitle = `${input.body.name} in ${input.sign.name}`;
            rawKeys = [input.body.slug, input.sign.slug];
            break;
        case "BODY_IN_HOUSE":
            entryTitle = `${input.body.name} in the ${input.house.name}`;
            rawKeys = [input.body.slug, input.house.slug];
            break;
        case "BODY_IN_SIGN_AND_HOUSE":
            entryTitle = `${input.body.name} in ${input.sign.name} in the ${input.house.name}`;
            rawKeys = [input.body.slug, input.sign.slug, input.house.slug];
            break;
        case "ASPECT":
            entryTitle = `${input.bodyA.name} ${formatAspect(input.aspect)} ${input.bodyB.name}`;
            rawKeys = [input.bodyA.slug, input.aspect, input.bodyB.slug];
            break;
        default:
            const _exhaustiveCheck: never = input;
            throw new Error(`Unhandled interpretation type: ${JSON.stringify(_exhaustiveCheck)}`);
    };

    // enforce sort order
    const sortedKeys = [...rawKeys].sort();
    // create lookupKey string from keys (this function also sorts)
    const lookupString = createLookupKey(rawKeys);

    // create the dynamic interpretation text with correct display names
    const entryText = typeof input.rawText === "function"
        ? input.rawText(input as any)
        : input.rawText;

    return {
        title: entryTitle,
        text: entryText,
        matchKeys: sortedKeys,
        lookupKey: lookupString,
    }
};
