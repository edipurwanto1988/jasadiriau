"use server";
import { Role } from "@/generated/prisma";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/session";
import { cache } from "react";

export const getUser = cache(async (params?: { role?: Role }) => {
  const session = await verifySession();
  if (!session) return null;

  const user = await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      phoneNumber: true,
      role: true,
      email: true,
    },
    where: {
      id: session.userId,
      ...(params?.role && { role: params.role }),
    },
  });

  return user;
});
