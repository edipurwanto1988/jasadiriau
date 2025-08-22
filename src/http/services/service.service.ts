import prisma from "@/lib/db";
import { NotFoundException } from "@/utils/exception";
import {
  CreateServiceSchema,
  UpdateServiceSchema,
} from "@/schema/service.schema";
import { Prisma, StatusType } from "@/generated/prisma";
import { paginate } from "@/utils/format";

export const servicePaginate = async (qs: URLSearchParams, userId?: number) => {
  const where: Prisma.ServiceWhereInput = {
    ...(qs.has("status") && { status: qs.get("status") as StatusType }),
    ...(userId && {
      businessProfile: {
        userId,
      },
    }),
  };
  const count = await prisma.service.count({ where });
  const results = await prisma.service.findMany({
    include: {
      businessProfile: { select: { businessName: true } },
      category: { select: { name: true } },
    },
    where,
    ...paginate(qs),
  });

  const images = await prisma.image.findMany({
    where: {
      entityId: {
        in: results.map((v) => v.id),
      },
      entityType: "service",
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

export const getServiceID = async (id: number) => {
  const model = await prisma.service.findFirst({
    where: { id },
    include: {
      businessProfile: { select: { businessName: true } },
      category: { select: { name: true } },
    },
  });
  if (!model) {
    throw new NotFoundException("Record");
  }

  const image = await prisma.image.findFirst({
    where: { entityId: model.id, entityType: "service" },
  });
  Object.assign(model, { imageUrl: image?.imageUrl });
  const validations = await prisma.validation.findMany({
    where: { targetId: model.id, targetType: "service" },
  });
  Object.assign(model, { validations: validations });
  return model;
  return model;
};

export const createService = (payload: CreateServiceSchema) => {
  return prisma.$transaction(async (tx) => {
    let number = 1;
    const last = await tx.service.findFirst({ orderBy: { id: "desc" } });
    if (last && last.slug) {
      const [currNum] = last.slug.split("-");
      number = Number(currNum) + 1;
    }
    const padStart = String(number).padStart(4, "0");
    const created = await tx.service.create({
      data: {
        ...payload,
        status: "pending",
        slug: `${padStart}-${payload.name.replaceAll(" ", "-")}`,
      },
    });

    await tx.validation.create({
      data: {
        targetType: "service",
        targetId: created.id,
      },
    });

    return created;
  });
};

export const updateService = ({ id, ...payload }: UpdateServiceSchema) => {
  return prisma.service.update({
    where: { id: +id! },
    data: {
      ...payload,
    },
  });
};

export const deleteService = (id: number) => {
  return prisma.service.delete({ where: { id } });
};
