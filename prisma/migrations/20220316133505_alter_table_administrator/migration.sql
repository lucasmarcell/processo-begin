/*
  Warnings:

  - Added the required column `nome` to the `administrator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "administrator" ADD COLUMN     "nome" TEXT NOT NULL;
