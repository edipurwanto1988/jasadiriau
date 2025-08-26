"use server";
import prisma from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getSetting = unstable_cache(
  async () => {
    return prisma.setting.findFirst();
  },
  ["setting"],
  { tags: ["setting"] }
);
