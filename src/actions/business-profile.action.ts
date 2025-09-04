"use server";
import BusinessProfileResource from "@/http/resources/business-profile.resource";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { cache } from "react";

export const getBusinessBySlug = cache(async (slug: string) => {
  const model = await prisma.businessProfile.findFirst({
    where: { slug,status:"active" },
    include: {
      BusinessContact: true,
      BusinessSocial: true,
      User: true,
      Service: {
        include: {
          category: {
            select: {
              name: true,
            },
          },
          businessProfile: {
            select: {
              businessName: true,
            },
          },
        },
      },
      BusinessLocation: {
        include: {
          province: true,
          regency: true,
          district: true,
        },
      },
    },
  });

  if (!model) {
    return notFound();
  }

  const image = await prisma.image.findFirst({
    where: { entityId: model.id, entityType: "profile" },
  });

  return new BusinessProfileResource({
    ...model,
    imageUrl: image?.imageUrl
  });
});
