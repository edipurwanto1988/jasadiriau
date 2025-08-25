import { Prisma, Role } from "@/generated/prisma";
import prisma from "@/lib/db";
import { paginate } from "@/utils/format";

export const userPaginate = async (qs: URLSearchParams) => {
  const where: Prisma.UserWhereInput = {
    ...(qs.has("name") && {
      name: {
        contains: String(qs.get("name")),
        mode: "insensitive",
      },
    }),
    ...(qs.has("email") && {
      email: {
        contains: String(qs.get("email")),
        mode: "insensitive",
      },
    }),
    ...(qs.has("phoneNumber") && {
      phoneNumber: {
        contains: String(qs.get("phoneNumber")),
        mode: "insensitive",
      },
    }),
    ...(qs.has("role") && {
      role: String(qs.get("role")) as Role,
    }),
    ...(qs.has("isActive") && {
      isActive: JSON.parse(String(qs.get("isActive"))),
    }),
  };

  const count = await prisma.user.count({ where });
  const results = await prisma.user.findMany({
    where,
    ...paginate(qs),
    orderBy: {
      id: "desc",
    },
  });

  return { total: count, data: results };
};

export const getCurrent = (id: number) => {
  return prisma.user.findFirst({ where: { id } });
};

export const updateRole = (payload: Prisma.UserUncheckedUpdateInput) => {
  return prisma.user.update({
    where: { id: +payload.id! },
    data: { role: payload.role },
  });
};
