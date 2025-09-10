"use server";
import { Prisma } from "@/generated/prisma";
import BusinessProfileResource from "@/http/resources/business-profile.resource";
import prisma from "@/lib/db";
import { paginate } from "@/utils/format";
import { notFound } from "next/navigation";
import { cache } from "react";

export const getBusinessBySlug = cache(async (slug: string) => {
  const model = await prisma.businessProfile.findFirst({
    where: { slug, status: "active" },
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
    imageUrl: image?.imageUrl,
  });
});

export const getBusinessAllSlug = cache(async () => {
  return prisma.businessProfile.findMany({
    select: { slug: true },
    where: {
      slug: {
        not: null,
      },
    },
  });
});

export const getBusinessPaginate = async (
  qs: Partial<Record<string, string>>
) => {
  const params = new URLSearchParams({ page: String(+(qs.page ?? 1) - 1) });
  const where: Prisma.BusinessProfileWhereInput = {
    status: "active",
    ...(qs.q && {
      businessName: {
        contains: qs.q,
        mode: "insensitive",
      },
    }),
  };

  const data = await prisma.businessProfile.findMany({
    where,
    orderBy: {
      businessName: "asc",
    },
    include: {
      BusinessContact: {
        select: {
          whatsappNumber: true,
        },
      },
      BusinessLocation: true,
    },
    ...paginate(params),
  });
  const total = await prisma.businessProfile.count({ where });

  return {
    total,
    data,
  };
};