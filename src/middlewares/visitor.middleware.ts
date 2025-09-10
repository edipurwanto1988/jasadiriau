import { getOrSetVisitorId } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export default async function visitorMiddleware(req: NextRequest) {
  await getOrSetVisitorId();
}
