import { getArticleRelated } from "@/http/services/article.service";
import api from "@/utils/api";
import { NextResponse } from "next/server";

export const GET = api(async (req) => {
  const qs = req.nextUrl.searchParams
  const results = await getArticleRelated(qs);
  return NextResponse.json({ data: results });
});
