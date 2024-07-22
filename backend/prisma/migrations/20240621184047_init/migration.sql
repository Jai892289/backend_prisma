-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "item" TEXT,
    "price" INTEGER,
    "quantity" INTEGER,
    "description" TEXT,
    "wishlist" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);
