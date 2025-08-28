import prisma from "@/lib/db";
import { NotFoundException } from "@/utils/exception";
import {
  CreateAccountBusinessProfileSchema,
  UpdateAccountBusinessProfileSchema,
} from "@/schema/business-profile.schema";
import { Platform, Prisma, StatusType } from "@/generated/prisma";
import { paginate } from "@/utils/format";
import { addAdminNotification } from "./notification.service";
import { slugify } from "@/utils/string";

export const businessProfilePaginate = async (
  qs: URLSearchParams,
  userId?: number
) => {
  const where: Prisma.BusinessProfileWhereInput = {
    ...(qs.has("status") && { status: qs.get("status") as StatusType }),
    ...(userId && { userId }),
    ...(qs.has("name") && {
      businessName: {
        contains: String(qs.get("name")),
        mode: "insensitive",
      },
    }),
  };
  const count = await prisma.businessProfile.count({ where });

  const results = await prisma.businessProfile.findMany({
    where,
    include: {
      User: true,
      BusinessContact: true,
      _count: {
        select: {
          Service: true,
        },
      },
    },
    ...paginate(qs),
  });

  const images = await prisma.image.findMany({
    where: {
      entityId: {
        in: results.map((v) => v.id),
      },
      entityType: "profile",
    },
  });

  const newResult = results.map((val) => {
    const image = images.find((f) => f.entityId === val.id);
    if (image) {
      Object.assign(val, { imageUrl: image.imageUrl });
    }
    return val;
  });

  return {
    total: count,
    data: newResult,
  };
};

export const getBusinessProfileID = async (id: number) => {
  const model = await prisma.businessProfile.findFirst({
    where: { id },
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
    throw new NotFoundException("BusinessProfile");
  }

  const image = await prisma.image.findFirst({
    where: { entityId: model.id, entityType: "profile" },
  });
  Object.assign(model, { imageUrl: image?.imageUrl });
  const validations = await prisma.validation.findMany({
    where: { targetId: model.id, targetType: "profile" },
    orderBy: { createdAt: "desc" },
  });
  Object.assign(model, { validations: validations });
  return model;
};

export const deleteBusinessProfile = (id: number) => {
  return prisma.businessProfile.delete({ where: { id } });
};

export const createAccountBusinessProfile = (
  userId: number,
  {
    businessContact,
    businessSocial,
    businessLocation,
    ...payload
  }: CreateAccountBusinessProfileSchema
) => {
  return prisma.$transaction(async (tx) => {
    let number = 1;
    const last = await tx.businessProfile.findFirst({
      where: { slug: { not: null } },
      orderBy: { slug: "desc" },
    });

    if (last && last.slug) {
      const [currNum] = last.slug.split("-");
      number = Number(currNum) + 1;
    }

    const padStart = String(number).padStart(4, "0");
    const data: Prisma.BusinessProfileUncheckedCreateInput = {
      ...payload,
      userId,
      slug: slugify(`${padStart} ${payload.businessName}`),
      status: StatusType.pending,
      BusinessContact: {
        createMany: {
          data: businessContact.map((val) => ({
            ...val,
            whatsappNumber: `62${val.whatsappNumber.trim()}`,
          })),
        },
      },
      BusinessSocial: {
        createMany: {
          data: businessSocial.map((val) => ({
            ...val,
            platform: val.platform as Platform,
          })),
        },
      },
      BusinessLocation: {
        createMany: {
          data: businessLocation,
        },
      },
    };
    const profile = await tx.businessProfile.create({ data });
    await tx.validation.create({
      data: {
        targetType: "profile",
        targetId: profile.id,
      },
    });

    await addAdminNotification(
      tx,
      {
        type: "business-profile",
        id: profile.id,
      },
      "admin.profilePending",
      { businessName: profile.businessName }
    );
    return profile;
  });
};

export const updateAccountBusinessProfile = ({
  id,
  businessContact,
  businessSocial,
  businessLocation,
  ...payload
}: UpdateAccountBusinessProfileSchema) => {
  return prisma.$transaction(async (tx) => {
    const current = await tx.businessProfile.findFirstOrThrow({
      where: { id },
      select: { slug: true },
    });

    let slug = current.slug;
    if (current.slug) {
      const number = current.slug.split("-").at(0);
      if (number) {
        slug = slugify(`${number} ${payload.businessName}`);
      }
    }

    const data: Prisma.BusinessProfileUpdateInput = {
      ...payload,
      slug,
    };

    for (const { id, ...contact } of businessContact) {
      if (id) {
        await tx.businessContact.update({ data: contact, where: { id } });
      }
    }

    for (const { id, ...social } of businessSocial) {
      if (id) {
        await tx.businessSocial.update({
          data: { ...social, platform: social.platform as Platform },
          where: { id },
        });
      }
    }

    await tx.businessLocation.deleteMany({
      where: {
        id: { notIn: businessLocation.filter((v) => !!v.id).map((v) => v.id!) },
        profileId: id,
      },
    });

    for (const { id: locId, ...location } of businessLocation) {
      if (locId) {
        await tx.businessLocation.update({
          data: location,
          where: { id: locId },
        });
      } else {
        await tx.businessLocation.create({
          data: {
            ...location,
            profileId: id,
          },
        });
      }
    }

    return tx.businessProfile.update({
      where: { id: +id! },
      data,
    });
  });
};

export const getMeta = async () => {
  const totalPending = await prisma.businessProfile.count({
    where: { status: "pending" },
  });

  return {
    totalPending,
  };
};
