import prisma from "@/lib/db";
import { NotFoundException } from "@/utils/exception";
import {
  CreateAdvantageSchema,
  UpdateAdvantageSchema,
} from "@/schema/advantage.schema";
import { StatusType } from "@/generated/prisma";
import { revalidateTag } from "next/cache";
import { paginate } from "@/utils/format";

export const advantagePaginate = async (qs: URLSearchParams) => {
  const count = await prisma.advantages.count();
  const results = await prisma.advantages.findMany({
    ...paginate(qs),
  });
  return { total: count, data: results };
};

export const getAdvantageID = async (id: number) => {
  const model = await prisma.advantages.findFirst({ where: { id } });
  if (!model) {
    throw new NotFoundException("Advantage");
  }
  return model;
};

export const createAdvantage = async (payload: CreateAdvantageSchema) => {
  const created = await prisma.advantages.create({
    data: { ...payload, status: payload.status as StatusType },
  });

  revalidateTag("advantage");
  return created;
};

export const updateAdvantage = async ({
  id,
  ...payload
}: UpdateAdvantageSchema) => {
  const updated = await prisma.advantages.update({
    where: { id: +id! },
    data: { ...payload, status: payload.status as StatusType },
  });

  revalidateTag("advantage");
  return updated;
};

export const deleteAdvantage = async (id: number) => {
  await prisma.advantages.delete({ where: { id } });
  revalidateTag("advantage");
};

export const updateStatusAdvantage = async (id: number) => {
  const advantage = await prisma.advantages.findFirstOrThrow({ where: { id } });
  const updated = await prisma.advantages.update({
    where: { id: +id! },
    data: { status: advantage.status === "active" ? "inactive" : "active" },
  });
  revalidateTag("advantage");
  return updated;
};
