import api from "@/utils/api";
import { createSliderSchema, updateSliderSchema } from "@/schema/slider.schema";
import SliderResource from "@/http/resources/slider.resource";
import {
  sliderAll,
  createSlider,
  updateSlider,
} from "@/http/services/slider.service";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { uniqueImage } from "@/utils/format";
import omit from "lodash/omit";

const uploadDir = path.join(process.cwd(), "public", "images");
fs.mkdirSync(uploadDir, { recursive: true });

export const GET = api(async (req) => {
  const result = await sliderAll();
  return NextResponse.json(SliderResource.collection(result, true));
});

export const POST = api(async (req) => {
  const payload = await req.formData();
  const validated = await createSliderSchema.parseAsync(
    Object.fromEntries(payload.entries())
  );

  const blob = payload.get("file") as Blob;
  const fileName = `${uniqueImage('webp')}`;
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const url = `/images/${fileName}`;

  const result = await createSlider({ ...omit(validated, ["file"]), url });
  fs.writeFileSync(path.join(uploadDir, fileName), buffer);

  return NextResponse.json(new SliderResource(result, true));
});

export const PUT = api(async (req) => {
  const payload = await req.formData();
  const validated = await updateSliderSchema.parseAsync(
    Object.fromEntries(payload.entries())
  );
  let url;
  const blob = payload.get("file") as Blob;
  if (blob) {
    // const ext = blob.type.split("/")[1] || "bin";
    const fileName = `${uniqueImage('webp')}`;
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(path.join(uploadDir, fileName), buffer);
    url = `/images/${fileName}`;
  }

  const result = await updateSlider({ ...omit(validated, ["file"]), url });
  return NextResponse.json(new SliderResource(result, true));
});
