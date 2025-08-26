"use server";
import prisma from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getAdvantage = unstable_cache(
  async () => {
    return prisma.advantages.findMany({
      where: { status: "active" },
      orderBy: { sortOrder: "asc" },
    });
  },
  ["advantage"],
  { tags: ["advantage"] }
);
