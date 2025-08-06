-- CreateEnum
CREATE TYPE "Position" AS ENUM ('header', 'footer', 'sidebar');

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "seo_configs" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "service_images" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "services" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tags" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- CreateTable
CREATE TABLE "menus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "icon" VARCHAR,
    "position" "Position" NOT NULL DEFAULT 'header',
    "sort_order" SMALLINT DEFAULT 0,
    "status" "StatusType" NOT NULL DEFAULT 'inactive',
    "parent_id" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sliders" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "caption" TEXT,
    "image_url" TEXT NOT NULL,
    "link" TEXT,
    "sort_order" INTEGER,
    "status" "StatusType" NOT NULL DEFAULT 'inactive',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "sliders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "site_name" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT,
    "meta_keywords" TEXT,
    "meta_title" TEXT NOT NULL,
    "meta_description" TEXT NOT NULL,
    "og_title" TEXT,
    "og_description" TEXT,
    "google_site_verification" TEXT,
    "contact_email" TEXT,
    "contact_phone" TEXT,
    "address" TEXT,
    "facebook_url" TEXT,
    "instagram_url" TEXT,
    "twitter_url" TEXT,
    "linkedin_url" TEXT,
    "youtube_url" TEXT,
    "whatsapp_url" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "settings_site_name_key" ON "settings"("site_name");

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "menus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
