import api from "@/utils/api";
import { NextResponse } from "next/server";
import { getSearch } from "@/http/services/search.service";

export const GET = api(async (req) => {
  const [result] = await getSearch(req.nextUrl.searchParams);
  return NextResponse.json(result);
});
