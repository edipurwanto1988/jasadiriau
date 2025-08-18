import prisma from "@/lib/db";

export const getCurrent = (id: number) => {
  return prisma.user.findFirst({ where: { id } });
};
