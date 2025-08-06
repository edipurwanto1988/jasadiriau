import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/db";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "@/schema/category.schema";

export const createCategory = (payload: CreateCategorySchema) => {
  return prisma.$transaction(async (tx) => {
    const sc = await tx.seoConfigs.create({ data: { title: payload.name } });
    return tx.category.create({
      data: {
        ...payload,
        seoConfigId: sc.id,
      },
    });
  });
};

export const categoryPaginate = (qs: URLSearchParams) => {
  const where: Prisma.CategoryWhereInput = {
    parentId: null,
  };

  return Promise.all([
    prisma.category.count({ where }),
    prisma.category.findMany({ where, include: { children: true } }),
  ]);
};

export const categoryDetail = (id: number) => {
  return prisma.category.findFirstOrThrow({
    where: { id },
    include: { children: true },
  });
};

export const updateCategory = ({ id, ...payload }: UpdateCategorySchema) => {
  return prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const deleteCategory = (id: number) => {
  return prisma.category.delete({
    where: {
      id,
      children: {
        none: {
          parentId: id,
        },
      },
    },
  });
};
