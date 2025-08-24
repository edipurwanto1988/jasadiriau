import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/db";

export const getProvince = (qs: URLSearchParams) => {
  const where: Prisma.ProvinceWhereInput = {};

  return prisma.province.findMany({
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

    where,
    take: 1,
    skip: 0,
    orderBy: {
      name: "asc",
    },
  });
};
