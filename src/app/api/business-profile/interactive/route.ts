import {getBusinessInteractive } from "@/http/services/business-profile.service";
import api from "@/utils/api";
import { NextResponse } from "next/server";

export const GET = api(async (req) => {
  const qs = req.nextUrl.searchParams
  const results = await getBusinessInteractive(qs);
  return NextResponse.json(results);
});
