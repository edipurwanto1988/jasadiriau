import api from "@/utils/api";
import {
  createBusinessProfileSchema,
  updateBusinessProfileSchema,
} from "@/schema/business-profile.schema";
import BusinessProfileResource from "@/http/resources/business-profile.resource";
import {
  businessProfilePaginate,
  createBusinessProfile,
  updateBusinessProfile,
} from "@/http/services/business-profile.service";
import { NextResponse } from "next/server";
import { verifySession } from "@/lib/session";

export const GET = api(async (req) => {
  let userId;
  const session = await verifySession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (session.role === "user") userId = session.userId;

  const result = await businessProfilePaginate(
    req.nextUrl.searchParams,
    userId
  );
  return NextResponse.json(BusinessProfileResource.paginate(result));
});

export const POST = api(async (req) => {
  const payload = await req.json();
  const validated = await createBusinessProfileSchema.parseAsync(payload);

  const session = await verifySession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  
  if (session.role === "user") {
    validated.status = "pending";
  }

  const result = await createBusinessProfile(validated);
  return NextResponse.json(new BusinessProfileResource(result), {
    status: 201,
  });
});

export const PUT = api(async (req) => {
  const payload = await req.json();
  const validated = await updateBusinessProfileSchema.parseAsync(payload);
  const result = await updateBusinessProfile(validated);
  return NextResponse.json(new BusinessProfileResource(result));
});
