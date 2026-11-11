/*
  Warnings:

  - A unique constraint covering the columns `[matchKeys]` on the table `Interpretation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lookupKey]` on the table `Interpretation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lookupKey` to the `Interpretation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interpretation" ADD COLUMN     "lookupKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Interpretation_matchKeys_key" ON "Interpretation"("matchKeys");

-- CreateIndex
CREATE UNIQUE INDEX "Interpretation_lookupKey_key" ON "Interpretation"("lookupKey");
