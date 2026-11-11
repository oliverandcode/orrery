import { EntitySlug } from "../generated/enums";

// base interpretation entity
type Entity = { slug: EntitySlug; name: string };

type BaseInput<T> = {
    rawText: string | ((entities: T) => string);
};

// distinct interpretation combinations
type BodyInSign = {
    type: "BODY_IN_SIGN";
    body: Entity;
    sign: Entity;
} & BaseInput<{ body: Entity; sign: Entity }>;

type BodyInHouse = {
    type: "BODY_IN_HOUSE";
    body: Entity;
    house: Entity;
} & BaseInput<{ body: Entity; house: Entity }>;

type BodyInSignAndHouse = {
    type: "BODY_IN_SIGN_AND_HOUSE";
    body: Entity;
    sign: Entity;
    house: Entity;
} & BaseInput<{ body: Entity; sign: Entity; house: Entity }>;

type Aspect = {
    type: "ASPECT";
    bodyA: Entity;
    aspect: EntitySlug;
    bodyB: Entity;
} & BaseInput<{ bodyA: Entity; aspect: EntitySlug; bodyB: Entity }>;

// combined umbrella interpretation type
export type InterpretationInput = BodyInSign | BodyInHouse | BodyInSignAndHouse | Aspect;
