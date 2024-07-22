-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "address" TEXT,
    "amount" INTEGER,
    "state" TEXT,
    "pincode" TEXT,
    "landmark" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
