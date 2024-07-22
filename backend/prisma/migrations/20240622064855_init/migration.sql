-- CreateTable
CREATE TABLE "chat_bot" (
    "id" SERIAL NOT NULL,
    "socketId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_bot_pkey" PRIMARY KEY ("id")
);
