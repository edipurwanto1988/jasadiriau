import prisma from "@/lib/db";
import { NotFoundException } from "@/utils/exception";
import {
  CreateServiceSchema,
  UpdateServiceSchema,
} from "@/schema/service.schema";
import { Prisma, StatusType } from "@/generated/prisma";
import { paginate } from "@/utils/format";
import { addAdminNotification } from "./notification.service";
import { slugify } from "@/utils/string";

export const servicePaginate = async (qs: URLSearchParams, userId?: number) => {
  const where: Prisma.ServiceWhereInput = {
    ...(qs.has("status") && { status: qs.get("status") as StatusType }),
    ...(userId && {
      businessProfile: {
        userId,
      },
    }),
    ...(qs.has("name") && {
      name: {
        contains: String(qs.get("name")),
        mode: "insensitive",
      },
    }),
    ...(qs.has("ctg") && {
      categoryId: Number(qs.get("ctg")),
    }),
    ...(qs.has("profile") && {
      businessProfile: {
        businessName: {
          contains: String(qs.get("profile")),
          mode: "insensitive",
        },
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
    orderBy: { createdAt: "desc" },
  });
  Object.assign(model, { validations: validations });
  const images = await prisma.image.findMany({
    where: { entityId: model.id, entityType: "gallery_service" },
  });
  Object.assign(model, { images: images });
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
        slug: slugify(`${padStart} ${payload.name}`),
      },
      include: {
        businessProfile: {
          select: {
            businessName: true,
          },
        },
      },
    });

    await tx.validation.create({
      data: {
        targetType: "service",
        targetId: created.id,
      },
    });

    await addAdminNotification(
      tx,
      {
        type: "service",
        id: created.id,
      },
      "admin.servicePending",
      {
        businessName: created.businessProfile.businessName,
        serviceName: created.name,
      }
    );

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
