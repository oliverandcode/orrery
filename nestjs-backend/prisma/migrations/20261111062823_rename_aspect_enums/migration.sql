/*
  Warnings:

  - The values [ASPECT_CONJUNCTION,ASPECT_OPPOSITION] on the enum `EntitySlug` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EntitySlug_new" AS ENUM ('TRAPPIST_1_SUN', 'TRAPPIST_1B', 'TRAPPIST_1C', 'TRAPPIST_1D', 'TRAPPIST_1F', 'TRAPPIST_1G', 'TRAPPIST_1H', 'SIGN_ALPHA', 'SIGN_BRAVO', 'SIGN_CHARLIE', 'SIGN_DELTA', 'SIGN_ECHO', 'SIGN_FOXTROT', 'SIGN_GOLF', 'SIGN_HOTEL', 'SIGN_INDIA', 'SIGN_JULIET', 'SIGN_KILO', 'SIGN_LIMA', 'HOUSE_01', 'HOUSE_02', 'HOUSE_03', 'HOUSE_04', 'HOUSE_05', 'HOUSE_06', 'HOUSE_07', 'HOUSE_O8', 'HOUSE_09', 'HOUSE_10', 'HOUSE_11', 'HOUSE_12', 'ASPECT_CONJUNCT', 'ASPECT_SEMISEXTILE', 'ASPECT_SEMISQUARE', 'ASPECT_SEXTILE', 'ASPECT_QUINTILE', 'ASPECT_SQUARE', 'ASPECT_TRINE', 'ASPECT_SESQUIQUADRATE', 'ASPECT_BIQUINTILE', 'ASPECT_QUINCUNX', 'ASPECT_OPPOSITE');
ALTER TABLE "CelestialBody" ALTER COLUMN "slug" TYPE "EntitySlug_new" USING ("slug"::text::"EntitySlug_new");
ALTER TABLE "ZodiacSign" ALTER COLUMN "slug" TYPE "EntitySlug_new" USING ("slug"::text::"EntitySlug_new");
ALTER TABLE "House" ALTER COLUMN "slug" TYPE "EntitySlug_new" USING ("slug"::text::"EntitySlug_new");
ALTER TABLE "Interpretation" ALTER COLUMN "matchKeys" TYPE "EntitySlug_new"[] USING ("matchKeys"::text::"EntitySlug_new"[]);
ALTER TYPE "EntitySlug" RENAME TO "EntitySlug_old";
ALTER TYPE "EntitySlug_new" RENAME TO "EntitySlug";
DROP TYPE "public"."EntitySlug_old";
COMMIT;
