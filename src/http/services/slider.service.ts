import prisma from "@/lib/db";
import { NotFoundException } from "@/utils/exception";
import { CreateSliderSchema, UpdateSliderSchema } from "@/schema/slider.schema";
import path from "path";
import fs from "fs";
import { fillNextNumber } from "@/utils/input";
import { StatusType } from "@/generated/prisma";

const uploadDir = path.join(process.cwd(), "public", "images");
fs.mkdirSync(uploadDir, { recursive: true });

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

  return created;
};

export const updateSlider = async ({
  id,
  file,
  ...payload
}: UpdateSliderSchema) => {
  return prisma.$transaction(async (tx) => {
    const current = await tx.slider.findFirstOrThrow({ where: { id } });

    let url = current.imageUrl;
    if (payload.sortOrder !== current.sortOrder) {
      await tx.slider.updateMany({
        where: { sortOrder: payload.sortOrder, id: { not: current.id } },
        data: { sortOrder: current.sortOrder },
      });
    }

    if (file) {
      url = `/images/${file?.name}`;
    }

    const updated = await tx.slider.update({
      where: { id },
      data: {
        ...payload,
        status: payload.status as StatusType,
        imageUrl: url,
        link: url,
      },
    });

    if (file) {
      fs.writeFileSync(
        path.join(uploadDir, file.name),
        Buffer.from(await file.arrayBuffer())
      );
    }
    return updated;
  });
};

export const deleteSlider = (id: number) => {
  return prisma.slider.delete({ where: { id } });
};
