import prisma from "@/lib/db";
import { TargetType } from "@/generated/prisma";
import {
  CreateImageSchema,
  CreateMultiImageSchema,
} from "@/schema/image.schema";

export const createImage = async ({
  url,
  entityType,
  ...payload
}: Omit<CreateImageSchema, "file"> & { url: string }) => {
  return prisma.$transaction(async (tx) => {
    const created = await tx.image.create({
      data: {
        ...payload,
        imageUrl: url,
        entityType: entityType as TargetType,
      },
    });

    await tx.image.deleteMany({
      where: {
        entityId: payload.entityId,
        entityType: entityType as TargetType,
        id: {
          not: created.id,
        },
      },
    });

    return created;
  });
};

export const createMultImage = async ({
  url,
  ...payload
}: Omit<CreateMultiImageSchema, "files"> & { url: string[] }) => {
  return prisma.image.createMany({
    data: url.map((value) => ({
      imageUrl: value,
      entityType: payload.entityType as TargetType,
      entityId: payload.entityId,
    })),
  });
};

export const deleteImage = (id: number) => {
  return prisma.image.delete({ where: { id } });
};
