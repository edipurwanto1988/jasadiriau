import api from "@/utils/api";

import { NextResponse } from "next/server";
import {
  createService,
  servicePaginate,
  updateService,
} from "@/http/services/service.service";
import ServiceResource from "@/http/resources/service.resource";
import {
  createServiceSchema,
  updateServiceSchema,
} from "@/schema/service.schema";
import { verifySession } from "@/lib/session";

export const GET = api(async (req) => {
  let userId;
  const session = await verifySession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (session.role === "user") userId = session.userId;

  const result = await servicePaginate(req.nextUrl.searchParams, userId);
  return NextResponse.json(ServiceResource.paginate(result));
});

export const POST = api(async (req) => {
  const payload = await req.json();
  const validated = await createServiceSchema.parseAsync(payload);

  const result = await createService(validated);
  return NextResponse.json(new ServiceResource(result, true), {
    status: 201,
  });
});

export const PUT = api(async (req) => {
  const payload = await req.json();
  const validated = await updateServiceSchema.parseAsync(payload);
  const result = await updateService(validated);
  return NextResponse.json(new ServiceResource(result, true));
});
