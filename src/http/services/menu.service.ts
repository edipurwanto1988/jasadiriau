import { Menu, Position, Prisma } from "@/generated/prisma";
import prisma from "@/lib/db";
import { revalidateTag } from "next/cache";
import { URLSearchParams } from "url";

export const getMenuAll = async (qs: URLSearchParams) => {
  const header = await prisma.menu.findFirst({ where: { position: "header" } });
  const footer = await prisma.menu.findFirst({ where: { position: "footer" } });
  if (!header) {
    await prisma.menu.create({
      data: {
        status: "active",
        sortOrder: 1,
        position: "header",
      },
    });
  }

  if (!footer) {
    await prisma.menu.create({
      data: {
        status: "active",
        sortOrder: 1,
        position: "footer",
      },
    });
  }

  const result = await prisma.menu.findMany({
    where: {
      ...(qs.has("position") && { position: qs.get("position") as Position }),
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });

  return buildTree(result);
};

export const buildTree = (
  items: Partial<Menu>[],
  parentId: number | null = null
) => {
  return items
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((item) => ({
      id: item.id,
      name: item.name,
      url: item.url,
      position: item.position,
      children: buildTree(items, item.id),
    }));
};

export const createMenu = async (payload: Prisma.MenuUncheckedCreateInput) => {
  const created = await prisma.menu.create({
    data: {
      name: payload.name,
      url: payload.url,
      parentId: payload.parentId,
      status: "active",
      position: payload.position,
      sortOrder: payload.sortOrder,
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });

  revalidateTag(created.position);
  return created;
};

export const updateMenu = async ({
  id,
  ...payload
}: Prisma.MenuUncheckedUpdateInput) => {
  const updated = await prisma.menu.update({
    data: {
      name: payload.name,
      url: payload.url,
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
    where: { id: +id! },
  });

  revalidateTag(updated.position);
  return updated;
};

export const updatOrder = (payload: Prisma.MenuUncheckedUpdateInput[]) => {
  return prisma.$transaction(async (tx) => {
    if (!!payload.length) {
      for (const val of payload) {
        await tx.menu.update({
          where: { id: +val.id! },
          data: {
            sortOrder: val.sortOrder,
            parentId: val.parentId,
          },
        });
      }
      revalidateTag("header");
      revalidateTag("footer");
    }
  });
};

export const deleteMenu = async (id: number) => {
  const deleted = await prisma.menu.delete({ where: { id } });
  revalidateTag(deleted.position)
};
