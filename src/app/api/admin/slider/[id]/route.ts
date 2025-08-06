import api from "@/utils/api";
import SliderResource from "@/http/resources/slider.resource";
import {
  getSliderID,
  deleteSlider,
} from "@/http/services/slider.service";
import { NextResponse } from "next/server";

export const GET = api(async (_, { params: { id } }) => {
  const data = await getSliderID(+id);
  return NextResponse.json(new SliderResource(data, { wrap: true }));
});

export const DELETE = api(async (_, { params: { id } }) => {
  await deleteSlider(+id);
  return new NextResponse(null, { status: 204 });
});
