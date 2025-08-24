import { getProvince } from "@/http/services/location.service";
import api from "@/utils/api";
import { NextResponse } from "next/server";

export const GET = api(async (req) => {
  const result = await getProvince(req.nextUrl.searchParams);
  return NextResponse.json({ data: result });
});
