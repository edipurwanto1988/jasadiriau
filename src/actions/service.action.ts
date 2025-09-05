"use server";
import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/db";
import { paginate } from "@/utils/format";
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

export const getServiceByCategory = async (qs: Record<string, string>) => {
  const params = new URLSearchParams({ page: String(+(qs.page ?? 1) - 1) });
  const where: Prisma.ServiceWhereInput = {
    category: {
      slug: qs.category,
    },
    status: "active",
  };

  const data = await prisma.service.findMany({
    where,
    include: {
      businessProfile: {
        select: {
          slug: true,
          businessName: true,
          BusinessLocation: {
            select: {
              province: true,
              regency: true,
              district: true,
            },
          },
          BusinessContact: {
            select: {
              whatsappNumber: true,
            },
          },
        },
      },
      category: { select: { name: true } },
    },
    orderBy: {
      name: "asc",
    },
    ...paginate(params),
  });
  const total = await prisma.service.count({ where });

  return {
    total,
    data: data.map((v) => ({ ...v, price: +(v.price ?? 0) })),
  };
};

export const getServiceAllSlug = cache(async () => {
  return prisma.service.findMany({ select: { slug: true } });
});
