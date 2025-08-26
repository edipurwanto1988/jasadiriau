"use server";
import prisma from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getSlider = unstable_cache(
  async () => {
    return prisma.slider.findMany({
      select: {
        title: true,
        imageUrl: true,
      },
      where: {
        status: "active",
      },
      orderBy: {
        sortOrder: "asc",
      },
    });
  },
  ["slider"],
  { tags: ["slider"] }
);
