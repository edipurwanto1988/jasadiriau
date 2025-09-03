"use server";
import prisma from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getLocations = unstable_cache(
  async () =>
    prisma.province.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        regencies: {
          select: {
            id: true,
            name: true,
            slug: true,
            districts: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
              orderBy: {
                name: "asc",
              },
            },
          },
          orderBy: {
            name: "asc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    }),
  ["location_all"],
  { tags: ["location"] }
);
