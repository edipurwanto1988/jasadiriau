import prisma from "@/lib/db";
import {
  CreateBusinessViewSchema,
  CreateContacClickSchema,
  CreateServiceViewSchema,
} from "@/schema/interactive.schema";
import dayjs from "dayjs";

export const createContactClick = (payload: CreateContacClickSchema) => {
  return prisma.contactClick.create({ data: payload });
};

export const createBusinessView = async (payload: CreateBusinessViewSchema) => {
  let count = 0;
  // if (payload.visitorId) {
  //   count = await prisma.businessView.count({
  //     where: { visitorId: payload.visitorId, profileId: payload.profileId },
  //   });
  // }

  // if (count > 0) {
  //   return { createdAt: dayjs().format() };
  // }
  return prisma.businessView.create({ data: payload });
};

export const createServiceView = async (payload: CreateServiceViewSchema) => {
  let count = 0;
  // if (payload.visitorId) {
  //   count = await prisma.serviceView.count({
  //     where: { visitorId: payload.visitorId, serviceId: payload.serviceId },
  //   });
  // }

  // if (count > 0) {
  //   return { createdAt: dayjs().format() };
  // }
  return prisma.serviceView.create({ data: payload });
};
