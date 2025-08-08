-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'tiktok', 'whatsapp', 'other');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'operator', 'admin');

-- CreateEnum
CREATE TYPE "TargetType" AS ENUM ('profile', 'service', 'article');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('approved', 'rejected');

-- AlterEnum
ALTER TYPE "StatusType" ADD VALUE 'pending';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" DEFAULT 'user';

-- CreateTable
CREATE TABLE "business_profiles" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "business_name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "website_url" TEXT,
    "status" "StatusType" NOT NULL DEFAULT 'inactive',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "business_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_socials" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "name" TEXT,
    "platform" "Platform" NOT NULL DEFAULT 'other',
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "business_socials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_contacts" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "whatsapp_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "business_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "validations" (
    "id" SERIAL NOT NULL,
    "operator_id" INTEGER,
    "operator_name" TEXT,
    "target_type" "TargetType" NOT NULL,
    "target_id" INTEGER NOT NULL,
    "action" "Action" NOT NULL,
    "note" TEXT,
    "validated_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "validations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "business_profiles" ADD CONSTRAINT "business_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_socials" ADD CONSTRAINT "business_socials_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "business_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_contacts" ADD CONSTRAINT "business_contacts_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "business_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "validations" ADD CONSTRAINT "validations_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
