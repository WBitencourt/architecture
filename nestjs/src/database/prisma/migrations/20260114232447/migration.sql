/*
  Warnings:

  - Made the column `name` on table `examples` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "examples" ALTER COLUMN "name" SET NOT NULL;
