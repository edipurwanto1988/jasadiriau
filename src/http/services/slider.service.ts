import prisma from "@/lib/db";
import { NotFoundException } from "@/utils/exception";
import { CreateSliderSchema, UpdateSliderSchema } from "@/schema/slider.schema";
import { fillNextNumber } from "@/utils/input";
import { StatusType } from "@/generated/prisma";
import { revalidateTag } from "next/cache";

export const sliderAll = async () => {
  return prisma.slider.findMany({
    orderBy: [{ sortOrder: "asc" }],
  });
};

export const getSliderID = async (id: number) => {
  const model = await prisma.slider.findFirst({ where: { id } });
  if (!model) {
    throw new NotFoundException("Slider");
  }
  return model;
};

export const createSlider = async ({
  url,
  ...payload
}: Omit<CreateSliderSchema, "file"> & { url: string }) => {
  const sliders = await prisma.slider.findMany({ select: { sortOrder: true } });
  payload.sortOrder = fillNextNumber(
    sliders.filter((f) => f.sortOrder !== null).map((v) => v.sortOrder!)
  );

  const created = await prisma.slider.create({
    data: {
      ...payload,
      status: StatusType.inactive,
      imageUrl: url,
      link: url,
    },
  });

  revalidateTag("slider");
  return created;
};

export const updateSlider = async ({
  id,
  url,
  ...payload
}: Omit<UpdateSliderSchema, "file"> & { url?: string }) => {
  return prisma.$transaction(async (tx) => {
    const current = await tx.slider.findFirstOrThrow({ where: { id } });

    let currentUrl = current.imageUrl;
    if (payload.sortOrder !== current.sortOrder) {
      await tx.slider.updateMany({
        where: { sortOrder: payload.sortOrder, id: { not: current.id } },
        data: { sortOrder: current.sortOrder },
      });
    }

    if (url) {
      currentUrl = url;
    }

    const updated = await tx.slider.update({
      where: { id },
      data: {
        ...payload,
        status: payload.status as StatusType,
        imageUrl: currentUrl,
        link: currentUrl,
      },
    });

    revalidateTag("slider");

    return updated;
  });
};

export const deleteSlider = async (id: number) => {
  await prisma.slider.delete({ where: { id } });
  revalidateTag("slider");
};

export const updateStatusSlider = async (id: number) => {
  const slider = await prisma.slider.findFirstOrThrow({ where: { id } });
  const updated = await prisma.slider.update({
    where: { id: +id! },
    data: { status: slider.status === "active" ? "inactive" : "active" },
  });
  revalidateTag("slider");
  return updated;
};
