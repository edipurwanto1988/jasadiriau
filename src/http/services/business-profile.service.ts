import prisma from "@/lib/db";
import { NotFoundException } from "@/utils/exception";
import {
  CreateAccountBusinessProfileSchema,
  CreateBusinessProfileSchema,
  UpdateAccountBusinessProfileSchema,
  UpdateBusinessProfileSchema,
} from "@/schema/business-profile.schema";
import { Platform, Prisma, Role, StatusType } from "@/generated/prisma";
import omit from "lodash/omit";

export const businessProfilePaginate = async (qs: Record<string, any>) => {
  const where: Prisma.BusinessProfileWhereInput = {};
  const count = await prisma.businessProfile.count({ where });
  const results = await prisma.businessProfile.findMany({
    where,
    include: {
      User: true,
      BusinessContact: true,
    },
    take: +(qs.take ?? 10),
    skip: +(qs.skip ?? 0),
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

  return { total: count, data: newResult };
};

export const getBusinessProfileID = async (id: number) => {
  const model = await prisma.businessProfile.findFirst({
    where: { id },
    include: { BusinessContact: true, BusinessSocial: true, User: true },
  });
  if (!model) {
    throw new NotFoundException("BusinessProfile");
  }

  const image = await prisma.image.findFirst({
    where: { entityId: model.id, entityType: "profile" },
  });
  Object.assign(model, { imageUrl: image?.imageUrl });
  return model;
};

export const createBusinessProfile = ({
  businessContact,
  businessSocial,
  user,
  ...payload
}: CreateBusinessProfileSchema) => {
  const data: Prisma.BusinessProfileCreateInput = {
    ...payload,
    status: payload.status as StatusType,
    User: { create: { ...user, role: user.role as Role } },
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
  };
  return prisma.businessProfile.create({ data });
};

export const updateBusinessProfile = ({
  id,
  businessContact,
  businessSocial,
  user,
  ...payload
}: UpdateBusinessProfileSchema) => {
  return prisma.$transaction(async (tx) => {
    const data: Prisma.BusinessProfileUpdateInput = {
      ...payload,
      status: payload.status as StatusType,
      User: {
        update: {
          data: omit({ ...user, role: user.role as Role }, ["id"]),
        },
      },
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

    return tx.businessProfile.update({
      where: { id: +id! },
      data,
    });
  });
};

export const deleteBusinessProfile = (id: number) => {
  return prisma.businessProfile.delete({ where: { id } });
};

export const createAccountBusinessProfile = (
  userId: number,
  {
    businessContact,
    businessSocial,
    ...payload
  }: CreateAccountBusinessProfileSchema
) => {
  return prisma.$transaction(async (tx) => {
    const data: Prisma.BusinessProfileUncheckedCreateInput = {
      ...payload,
      userId,
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
    };
    const profile = await tx.businessProfile.create({ data });
    await tx.validation.create({
      data: {
        targetType: "profile",
        targetId: profile.id,
      },
    });
    return profile;
  });
};

export const updateAccountBusinessProfile = ({
  id,
  businessContact,
  businessSocial,
  ...payload
}: UpdateAccountBusinessProfileSchema) => {
  return prisma.$transaction(async (tx) => {
    const data: Prisma.BusinessProfileUpdateInput = {
      ...payload,
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

    return tx.businessProfile.update({
      where: { id: +id! },
      data,
    });
  });
};
