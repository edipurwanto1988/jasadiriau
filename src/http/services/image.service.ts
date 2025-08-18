import prisma from "@/lib/db";
import { TargetType } from "@/generated/prisma";
import { CreateImageSchema } from "@/schema/image.schema";

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
