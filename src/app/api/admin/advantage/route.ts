import api from "@/utils/api";
import {
  createAdvantageSchema,
  updateAdvantageSchema,
} from "@/schema/advantage.schema";
import AdvantageResource from "@/http/resources/advantage.resource";
import {
  advantagePaginate,
  createAdvantage,
  updateAdvantage,
} from "@/http/services/advantage.service";
import { NextResponse } from "next/server";

export const GET = api(async (req) => {
  const result = await advantagePaginate(req.nextUrl.searchParams);
  return NextResponse.json(AdvantageResource.paginate(result));
});

export const POST = api(async (req) => {
  const payload = await req.json();
  const validated = await createAdvantageSchema.parseAsync(payload);
  const result = await createAdvantage(validated);
  return NextResponse.json(new AdvantageResource(result), { status: 201 });
});

export const PUT = api(async (req) => {
  const payload = await req.json();
  const validated = await updateAdvantageSchema.parseAsync(payload);
  const result = await updateAdvantage(validated);
  return NextResponse.json(new AdvantageResource(result));
});
