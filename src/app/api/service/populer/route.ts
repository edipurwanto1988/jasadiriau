import { getServicePopuler } from "@/http/services/service.service";
import api from "@/utils/api";
import { NextResponse } from "next/server";

export const GET = api(async (req) => {
  const results = await getServicePopuler();
  return NextResponse.json({ data: results });
});
