import {getServiceInteractive } from "@/http/services/service.service";
import api from "@/utils/api";
import { NextResponse } from "next/server";

export const GET = api(async (req) => {
  const qs = req.nextUrl.searchParams
  const results = await getServiceInteractive(qs);
  return NextResponse.json(results);
});
