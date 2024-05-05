/*
  Warnings:

  - You are about to alter the column `amount` on the `basic_pay` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `amount` on the `deduction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "basic_pay" ADD COLUMN     "name" TEXT,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "deduction" ADD COLUMN     "address" TEXT,
ADD COLUMN     "email" TEXT,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE INTEGER;
