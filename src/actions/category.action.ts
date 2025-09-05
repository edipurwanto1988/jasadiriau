"use server";
import prisma from "@/lib/db";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getCategories = unstable_cache(
  async () =>
    prisma.category.findMany({
      select: { id: true, name: true, slug: true, imageUrl: true },
      orderBy: {
        name: "asc",
      },
    }),
  ["category_p"],
  { tags: ["category"] }
);

export const getCategoryBySlug = cache(async (slug: string) =>
  prisma.category.findFirstOrThrow({
    where: {
      slug,
    },
  })
);
