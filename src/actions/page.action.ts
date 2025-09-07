"use server";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/session";
import { notFound } from "next/navigation";
import { cache } from "react";

export const getPageBySlug = cache(async (slug: string) => {
  const session = await verifySession();

  const model = await prisma.page.findFirst({
    where: {
      slug,
      ...(session && session.isAuth && ["admin", "role"].includes(session.role)
        ? {}
        : { status: "active" }),
    },
  });

  if (!model) {
    return notFound();
  }

  return model;
});

export const getPageAllSlug = cache(async () => {
  return prisma.page.findMany({
    select: { slug: true },
    where: { status: "active" },
  });
});
