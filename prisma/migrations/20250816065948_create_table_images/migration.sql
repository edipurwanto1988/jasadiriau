-- AlterTable
ALTER TABLE "users" ADD COLUMN     "image_url" TEXT;

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "entity_type" "TargetType" NOT NULL DEFAULT 'profile',
    "entity_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);
