"use server";
import prisma from "@/lib/db";
import { unstable_cache } from "next/cache";

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
