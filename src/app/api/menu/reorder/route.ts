import { updatOrder } from "@/http/services/menu.service";
import api from "@/utils/api";
import { NextResponse } from "next/server";

export const PUT = api(async (req) => {
  const payload = await req.json();
  await updatOrder(payload);
  return new NextResponse(null, { status: 204 });
});
