import api from "@/utils/api";
import { NextResponse } from "next/server";
import { createContacClickSchema } from "@/schema/interactive.schema";
import { createContactClick } from "@/http/services/interactive.service";

export const GET = api(async (req) => {
  return NextResponse.json({ data: [] });
});

export const POST = api(async (req) => {
  const payload = await req.json();
  const visitor = req.cookies.get("visitor_id");
  payload.visitorId = visitor?.value
  const userAgent = req.headers.get("user-agent") ?? "";
  let ipAddress = req.headers.get("x-forwarded-for");
  if (ipAddress && ipAddress.includes(",")) {
    ipAddress = ipAddress.split(",")[0].trim();
  }
  
  const validated = await createContacClickSchema.parseAsync(payload);
  const result = await createContactClick({...validated, userAgent, ipAddress});

  return NextResponse.json(
    {
      data: {
         createdAt: result.createdAt,
      },
    },
    { status: 201 }
  );
});
