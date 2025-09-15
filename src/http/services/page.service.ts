import { Prisma, StatusType } from "@/generated/prisma";
import prisma from "@/lib/db";
import { CreatePageSchema, UpdatePageSchema } from "@/schema/page.schema";
import { NotFoundException } from "@/utils/exception";
import { paginate } from "@/utils/format";
import { slugify } from "@/utils/string";

export const getPageID = async (id: number) => {
  const model = await prisma.page.findFirst({
    where: { id },
  });
  if (!model) {
    throw new NotFoundException("Record");
  }

  return model;
};

export const pagePaginate = async (qs: URLSearchParams) => {
  const where: Prisma.PageWhereInput = {
    ...(qs.has("status") && { status: qs.get("status") as StatusType }),
    ...(qs.has("title") && {
      title: {
        contains: String(qs.get("title")),
        mode: "insensitive",
      },
    }),
  };
  const count = await prisma.page.count({ where });
  const results = await prisma.page.findMany({
    omit: {
      content: true,
    },
    where,
    ...paginate(qs),
  });

  return { total: count, data: results };
};

export const createPage = async ({
  content,
  status,
  ...payload
}: CreatePageSchema) => {
  let number = 1;
  const last = await prisma.page.findFirst({
    where: { slug: { not: null } },
    orderBy: { slug: "desc" },
  });

  if (last && last.slug) {
    const [currNum] = last.slug.split("-");
    number = Number(currNum) + 1;
  }

  const padStart = String(number).padStart(4, "0");
  return prisma.page.create({
    data: {
      ...payload,
      metaTitle: payload.title,
      slug: slugify(payload.title),
      status: status as StatusType,
      content
    },
  });
};

export const updatePage = ({ id, status, ...payload }: UpdatePageSchema) => {
  return prisma.page.update({
    where: { id },
    data: {
      ...payload,
      metaTitle: payload.title,
      status: status as StatusType,
    },
  });
};

export const deletePage = (id: number) => {
  return prisma.page.delete({ where: { id } });
};
