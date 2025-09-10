-- CreateTable
CREATE TABLE "service_views" (
    "id" SERIAL NOT NULL,
    "visitor_id" UUID,
    "service_id" INTEGER NOT NULL,
    "source" VARCHAR,
    "user_agent" TEXT,
    "ip_address" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_views" (
    "id" SERIAL NOT NULL,
    "visitor_id" UUID,
    "profile_id" INTEGER NOT NULL,
    "source" VARCHAR,
    "user_agent" TEXT,
    "ip_address" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_clicks" (
    "id" SERIAL NOT NULL,
    "visitor_id" UUID,
    "contact_id" INTEGER NOT NULL,
    "phone_number" VARCHAR,
    "source" VARCHAR,
    "user_agent" TEXT,
    "ip_address" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_clicks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "service_views" ADD CONSTRAINT "service_views_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_views" ADD CONSTRAINT "business_views_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "business_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_clicks" ADD CONSTRAINT "contact_clicks_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "business_contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
