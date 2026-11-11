import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client";
import { ZODIAC_SIGNS } from "./seed-data/zodiac-signs";
import { CELESTIAL_BODIES } from "./seed-data/celestial-bodies";
import { HOUSES } from "./seed-data/houses";
import { BODY_IN_SIGN_INTERPRETATIONS } from "./seed-data/interpretations";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Starting database seeding...");

    // seed celestial bodies (one by one)
    for (const body of CELESTIAL_BODIES) {
        await prisma.celestialBody.upsert({
            where: { slug: body.slug },
            update: {}, // do nothing if the body has already been created
            create: body,
        })
    };
    console.log("Seeding celestial bodies: complete.");

    // seed zodiac signs (one by one)
    for (const sign of ZODIAC_SIGNS) {
        await prisma.zodiacSign.upsert({
            where: { slug: sign.slug },
            update: {}, // do nothing if the sign has already been created
            create: sign,
        })
    };
    console.log("Seeding zodiac signs: complete.");

    // seed astrological houses (one by one)
    for (const house of HOUSES) {
        await prisma.house.upsert({
            where: { slug: house.slug },
            update: {}, // do nothing if the house has already been created
            create: house,
        })
    };
    console.log("Seeding astrological houses: complete.");

   // seed interpretations (one by one)
   // NOTE: only "celestial body in sign" currently
   for (const interpretation of BODY_IN_SIGN_INTERPRETATIONS) {
        // the idempotent upsert method using a lookup string 
        // composed of systematically sorted and joined matchKey enums
        await prisma.interpretation.upsert({
            where: { lookupKey: interpretation.lookupKey },
            update: {}, // do nothing if the interpretation has already been created
            create: interpretation,
        })
   };
   console.log("Seeding interpretations: complete.");

    console.log("All seeding: complete."); // confirm seeding step complete
}

main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });
