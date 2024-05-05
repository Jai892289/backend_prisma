/*
  Warnings:

  - You are about to drop the `BasicPay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Deduction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "BasicPay";

-- DropTable
DROP TABLE "Deduction";

-- CreateTable
CREATE TABLE "basic_pay" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "basic_pay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deduction" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "deduction_pkey" PRIMARY KEY ("id")
);
