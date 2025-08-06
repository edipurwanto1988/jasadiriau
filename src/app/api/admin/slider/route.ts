import api from "@/utils/api";
import { createSliderSchema, updateSliderSchema } from "@/schema/slider.schema";
import SliderResource from "@/http/resources/slider.resource";
import {
  sliderAll,
  createSlider,
  updateSlider,
} from "@/http/services/slider.service";
import { NextResponse } from "next/server";

export const GET = api(async (req) => {
  const result = await sliderAll();
  return NextResponse.json(SliderResource.collection(result, true));
});

export const POST = api(async (req) => {
  const payload = await req.formData();
  const validated = await createSliderSchema.parseAsync(
    Object.fromEntries(payload.entries())
  );
  const result = await createSlider(validated);
  return NextResponse.json(new SliderResource(result, true));
});

export const PUT = api(async (req) => {
  const payload = await req.formData();
  const validated = await updateSliderSchema.parseAsync(
    Object.fromEntries(payload.entries())
  );
  const result = await updateSlider(validated);
  return NextResponse.json(new SliderResource(result, true));
});
