/*
  Warnings:

  - You are about to drop the column `contact_number` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `logo_url` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `provider_name` on the `services` table. All the data in the column will be lost.
  - You are about to drop the `service_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `profile_id` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "service_images" DROP CONSTRAINT "service_images_service_id_fkey";

-- DropForeignKey
ALTER TABLE "service_tags" DROP CONSTRAINT "service_tags_service_id_fkey";

-- DropForeignKey
ALTER TABLE "service_tags" DROP CONSTRAINT "service_tags_tag_id_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "contact_number",
DROP COLUMN "logo_url",
DROP COLUMN "profile_image",
DROP COLUMN "provider_name",
ADD COLUMN     "profile_id" INTEGER NOT NULL,
ADD COLUMN     "status" "StatusType" NOT NULL DEFAULT 'pending',
ADD COLUMN     "terms" TEXT;

-- DropTable
DROP TABLE "service_images";

-- DropTable
DROP TABLE "service_tags";

-- DropTable
DROP TABLE "tags";

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "business_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
