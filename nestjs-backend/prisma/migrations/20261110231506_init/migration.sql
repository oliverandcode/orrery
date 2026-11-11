-- CreateEnum
CREATE TYPE "EntitySlug" AS ENUM ('TRAPPIST_1_SUN', 'TRAPPIST_1B', 'TRAPPIST_1C', 'TRAPPIST_1D', 'TRAPPIST_1F', 'TRAPPIST_1G', 'TRAPPIST_1H', 'SIGN_ALPHA', 'SIGN_BRAVO', 'SIGN_CHARLIE', 'SIGN_DELTA', 'SIGN_ECHO', 'SIGN_FOXTROT', 'SIGN_GOLF', 'SIGN_HOTEL', 'SIGN_INDIA', 'SIGN_JULIET', 'SIGN_KILO', 'SIGN_LIMA', 'HOUSE_01', 'HOUSE_02', 'HOUSE_03', 'HOUSE_04', 'HOUSE_05', 'HOUSE_06', 'HOUSE_07', 'HOUSE_O8', 'HOUSE_09', 'HOUSE_10', 'HOUSE_11', 'HOUSE_12', 'ASPECT_CONJUNCTION', 'ASPECT_SEMISEXTILE', 'ASPECT_SEMISQUARE', 'ASPECT_SEXTILE', 'ASPECT_QUINTILE', 'ASPECT_SQUARE', 'ASPECT_TRINE', 'ASPECT_SESQUIQUADRATE', 'ASPECT_BIQUINTILE', 'ASPECT_QUINCUNX', 'ASPECT_OPPOSITION');

-- CreateEnum
CREATE TYPE "CelestialBodyType" AS ENUM ('LUMINARY', 'PLANET');

-- CreateEnum
CREATE TYPE "ElementType" AS ENUM ('AIR', 'EARTH', 'FIRE', 'WATER');

-- CreateEnum
CREATE TYPE "Modality" AS ENUM ('CARDINAL', 'FIXED', 'MUTABLE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CelestialBody" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" "EntitySlug" NOT NULL,
    "type" "CelestialBodyType" NOT NULL,
    "astroLore" TEXT NOT NULL,
    "astroData" TEXT NOT NULL,

    CONSTRAINT "CelestialBody_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZodiacSign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" "EntitySlug" NOT NULL,
    "number" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,
    "startLongitude" DOUBLE PRECISION NOT NULL,
    "astroLore" TEXT NOT NULL,
    "astroData" TEXT NOT NULL,
    "elementType" "ElementType" NOT NULL,
    "mode" "Modality" NOT NULL,

    CONSTRAINT "ZodiacSign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL,
    "slug" "EntitySlug" NOT NULL,
    "number" INTEGER NOT NULL,
    "astroLore" TEXT NOT NULL,
    "ascendantOffset" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Star" (
    "id" TEXT NOT NULL,
    "gaiaDr3Id" TEXT NOT NULL,
    "name" TEXT,
    "eclipticLongitude" DOUBLE PRECISION NOT NULL,
    "eclipticLatitude" DOUBLE PRECISION NOT NULL,
    "apparentMagnitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Star_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chart" (
    "id" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "planetaryLatitude" DOUBLE PRECISION NOT NULL,
    "planetaryLongitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ascendantLongitude" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Chart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transit" (
    "id" TEXT NOT NULL,
    "celestialBodyLongitude" DOUBLE PRECISION NOT NULL,
    "chartId" TEXT NOT NULL,
    "celestialBodyId" TEXT NOT NULL,
    "zodiacSignId" TEXT NOT NULL,
    "houseId" TEXT NOT NULL,

    CONSTRAINT "Transit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interpretation" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "text" TEXT NOT NULL,
    "matchKeys" "EntitySlug"[],

    CONSTRAINT "Interpretation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CelestialBody_name_key" ON "CelestialBody"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CelestialBody_slug_key" ON "CelestialBody"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ZodiacSign_name_key" ON "ZodiacSign"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ZodiacSign_slug_key" ON "ZodiacSign"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ZodiacSign_number_key" ON "ZodiacSign"("number");

-- CreateIndex
CREATE UNIQUE INDEX "ZodiacSign_startLongitude_key" ON "ZodiacSign"("startLongitude");

-- CreateIndex
CREATE UNIQUE INDEX "House_slug_key" ON "House"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "House_number_key" ON "House"("number");

-- CreateIndex
CREATE UNIQUE INDEX "House_ascendantOffset_key" ON "House"("ascendantOffset");

-- CreateIndex
CREATE UNIQUE INDEX "Star_gaiaDr3Id_key" ON "Star"("gaiaDr3Id");

-- CreateIndex
CREATE UNIQUE INDEX "Transit_chartId_celestialBodyId_key" ON "Transit"("chartId", "celestialBodyId");

-- CreateIndex
CREATE INDEX "Interpretation_matchKeys_idx" ON "Interpretation" USING GIN ("matchKeys");

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transit" ADD CONSTRAINT "Transit_chartId_fkey" FOREIGN KEY ("chartId") REFERENCES "Chart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transit" ADD CONSTRAINT "Transit_celestialBodyId_fkey" FOREIGN KEY ("celestialBodyId") REFERENCES "CelestialBody"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transit" ADD CONSTRAINT "Transit_zodiacSignId_fkey" FOREIGN KEY ("zodiacSignId") REFERENCES "ZodiacSign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transit" ADD CONSTRAINT "Transit_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
