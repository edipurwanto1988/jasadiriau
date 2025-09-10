import { getCategoryPopuler } from "@/http/services/category.service";
import api from "@/utils/api";
import { NextResponse } from "next/server";

export const GET = api(async (req) => {
  const results = await getCategoryPopuler();
  return NextResponse.json({ data: results });
});
