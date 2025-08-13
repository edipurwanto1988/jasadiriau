-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "image_url" VARCHAR;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone_number" VARCHAR(16),
ADD COLUMN     "register_key" TEXT;
