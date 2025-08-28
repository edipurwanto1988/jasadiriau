/*
  Warnings:

  - The values [galleri_service] on the enum `TargetType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TargetType_new" AS ENUM ('profile', 'service', 'article', 'gallery_service');
ALTER TABLE "images" ALTER COLUMN "entity_type" DROP DEFAULT;
ALTER TABLE "validations" ALTER COLUMN "target_type" TYPE "TargetType_new" USING ("target_type"::text::"TargetType_new");
ALTER TABLE "images" ALTER COLUMN "entity_type" TYPE "TargetType_new" USING ("entity_type"::text::"TargetType_new");
ALTER TYPE "TargetType" RENAME TO "TargetType_old";
ALTER TYPE "TargetType_new" RENAME TO "TargetType";
DROP TYPE "TargetType_old";
ALTER TABLE "images" ALTER COLUMN "entity_type" SET DEFAULT 'profile';
COMMIT;
