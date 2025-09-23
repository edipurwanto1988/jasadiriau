import { checkService } from "@/http/services/user.service";
import { NextResponse } from "next/server";
import api from "@/utils/api";
import { verifySession } from "@/lib/session";

export const GET = api(async (req) => {
  const session = await verifySession();
  const result = await checkService(session?.userId);
  return NextResponse.json({ data: result });
});
