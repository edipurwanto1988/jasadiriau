import prisma from "@/lib/db";
import { InputSettingSchema } from "@/schema/setting.schema";
import { revalidateTag } from "next/cache";

export const getSettingsID = async () => {
  const model = await prisma.setting.findFirst();
  return model;
};

export const createSettings = async (payload: InputSettingSchema) => {
  const current = await prisma.setting.findFirst();
  if (current) {
    revalidateTag("setting");
    return prisma.setting.updateMany({ data: payload });
  }
  return prisma.setting.create({ data: payload });
};
