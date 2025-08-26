"use server";
import { buildTree } from "@/http/services/menu.service";
import prisma from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getHeader = unstable_cache(
  async () => {
    const menus = await prisma.menu.findMany({
      where: { position: "header", status: "active" },
    });
    return buildTree(menus);
  },
  ["header"],
  { tags: ["header"] }
);

export const getFooter = unstable_cache(
  async () => {
    const menus = await prisma.menu.findMany({
      where: { position: "footer", status: "active" },
    });
    return buildTree(menus);
  },
  ["footer"],
  { tags: ["footer"] }
);
