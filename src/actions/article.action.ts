"use server";
import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/session";
import { paginate } from "@/utils/format";
import { notFound } from "next/navigation";
import { cache } from "react";

export const getArticleBySlug = cache(async (slug: string) => {
  const session = await verifySession();

  const model = await prisma.article.findFirst({
    where: {
      slug,
      ...(session && session.isAuth && ["admin", "role"].includes(session.role)
        ? {}
        : { status: "active" }),
    },
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
    return notFound();
  }

  return model;
});

export const getArticleAllSlug = cache(async () => {
  return prisma.article.findMany({
    select: { slug: true, updatedAt: true },
    where: { status: "active" },
  });
});

export const getArticlePaginate = cache(
  async (qs: Partial<Record<string, string>>) => {
    const params = new URLSearchParams({ page: String(+(qs.page ?? 1) - 1) });
    const where: Prisma.ArticleWhereInput = {
      status: "active",
      ...(qs.q && {
        businessName: {
          contains: qs.q,
          mode: "insensitive",
        },
      }),
    };

    const data = await prisma.article.findMany({
      where,
      omit: {
        content: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      ...paginate(params),
    });
    const total = await prisma.article.count({ where });

    return {
      total,
      data,
    };
  }
);
