import { Prisma, StatusType } from "@/generated/prisma";
import prisma from "@/lib/db";
import {
  CreateArticleSchema,
  UpdateArticleSchema,
} from "@/schema/article.schema";
import { NotFoundException } from "@/utils/exception";
import { paginate } from "@/utils/format";
import { slugify } from "@/utils/string";
import dayjs from "dayjs";

export const getArticleID = async (id: number) => {
  const model = await prisma.article.findFirst({
    where: { id },
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
  if (!model) {
    throw new NotFoundException("Record");
  }

  return model;
};

export const articlePaginate = async (qs: URLSearchParams) => {
  const where: Prisma.ArticleWhereInput = {
    ...(qs.has("status") && { status: qs.get("status") as StatusType }),
    ...(qs.has("categoryId") && { categoryId: +qs.get("categoryId")! }),
    ...(qs.has("title") && {
      title: {
        contains: String(qs.get("title")),
        mode: "insensitive",
      },
    }),
  };
  const count = await prisma.article.count({ where });
  const results = await prisma.article.findMany({
    omit: {
      content: true,
    },
    where,
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    ...paginate(qs),
  });

  return { total: count, data: results };
};

export const createArticle = async ({
  content,
  status,
  imageUrl,
  ...payload
}: Omit<CreateArticleSchema, "file"> & { imageUrl?: string }) => {
  let number = 1;
  const last = await prisma.article.findFirst({
    where: { slug: { not: null } },
    orderBy: { slug: "desc" },
  });

  if (last && last.slug) {
    const [currNum] = last.slug.split("-");
    number = Number(currNum) + 1;
  }

  const date = dayjs();

  const padStart = String(number).padStart(4, "0");
  return prisma.article.create({
    data: {
      ...payload,
      metaTitle: payload.title,
      slug: slugify(
        `${padStart} ${date.year()} ${date.month() + 1} ${payload.title}`
      ),
      status: status as StatusType,
      thumbnail: imageUrl,
      content: content,
    },
  });
};

export const updateArticle = async ({
  id,
  content,
  status,
  imageUrl,
  ...payload
}: Omit<UpdateArticleSchema, "file"> & { imageUrl?: string }) => {
  const article = await prisma.article.findFirstOrThrow({ where: { id } });

  let thumbnail = article.thumbnail;
  if (imageUrl) {
    thumbnail = imageUrl;
  }

  return prisma.article.update({
    where: { id },
    data: {
      ...payload,
      metaTitle: payload.title,
      status: status as StatusType,
      thumbnail: thumbnail,
      content: content,
    },
  });
};

export const deleteArticle = (id: number) => {
  return prisma.article.delete({ where: { id } });
};
