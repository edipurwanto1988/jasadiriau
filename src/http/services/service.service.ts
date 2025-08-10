import prisma from "@/lib/db";
import { NotFoundException } from "@/utils/exception";
import {
  CreateServiceSchema,
  UpdateServiceSchema,
} from "@/schema/service.schema";
import { StatusType } from "@/generated/prisma";

export const getPaginate = async (qs: Record<string, any>) => {
  const count = await prisma.service.count();
  const results = await prisma.service.findMany({
    take: +(qs.take ?? 10),
    skip: +(qs.skip ?? 0),
  });
  return { total: count, data: results };
};

export const getServiceID = async (id: number) => {
  const model = await prisma.service.findFirst({ where: { id } });
  if (!model) {
    throw new NotFoundException("Record");
  }
  return model;
};

export const createService = (payload: CreateServiceSchema) => {
  return prisma.service.create({
    data: { ...payload, status: payload.status as StatusType },
  });
};

export const updateService = ({ id, ...payload }: UpdateServiceSchema) => {
  return prisma.service.update({
    where: { id: +id! },
    data: {
      ...payload,
      status: payload.status as StatusType,
    },
  });
};

export const deleteService = (id: number) => {
  return prisma.service.delete({ where: { id } });
};
