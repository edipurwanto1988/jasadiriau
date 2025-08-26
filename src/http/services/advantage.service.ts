import prisma from "@/lib/db";
import { NotFoundException } from "@/utils/exception";
import {
  CreateAdvantageSchema,
  UpdateAdvantageSchema,
} from "@/schema/advantage.schema";
import { StatusType } from "@/generated/prisma";
import { revalidateTag } from "next/cache";

export const advantagePaginate = async (qs: Record<string, any>) => {
  const count = await prisma.advantages.count();
  const results = await prisma.advantages.findMany({
    take: +(qs.take ?? 10),
    skip: +(qs.skip ?? 0),
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
