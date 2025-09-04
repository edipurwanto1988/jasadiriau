"use server";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { cache } from "react";

export const getServiceBySlug = cache(async (slug: string) => {
  const model = await prisma.service.findFirst({
    where: { slug, status: "active" },
    include: {
      businessProfile: {
        select: {
          slug: true,
          businessName: true,
          websiteUrl: true,
          BusinessContact: true,
          BusinessLocation: true,
          BusinessSocial: true,
        },
      },
      category: { select: { name: true } },
    },
  });

  if (!model) {
    return notFound();
  }

  const image = await prisma.image.findFirst({
    where: { entityId: model.id, entityType: "service" },
  });

  const validations = await prisma.validation.findMany({
    where: { targetId: model.id, targetType: "service" },
    orderBy: { createdAt: "desc" },
  });

  const images = await prisma.image.findMany({
    where: { entityId: model.id, entityType: "gallery_service" },
  });

  return {
    ...model,
    price: +(model.price || 0),
    imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${
      image?.imageUrl ?? "/images/placeholder.webp"
    }`,
    validations,
    images: (images ?? []).map((v) => ({
      id: v.id,
      imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${v.imageUrl}`,
    })),
  };
});
