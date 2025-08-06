-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('active', 'inactive');

-- AlterTable
ALTER TABLE "services" ALTER COLUMN "slug" DROP NOT NULL;

-- CreateTable
CREATE TABLE "advantages" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL,
    "status" "StatusType" NOT NULL DEFAULT 'inactive',
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "advantages_pkey" PRIMARY KEY ("id")
);
