import api from "@/utils/api";
import {
  createAccountBusinessProfileSchema,
  updateAccountBusinessProfileSchema,
} from "@/schema/business-profile.schema";
import BusinessProfileResource from "@/http/resources/business-profile.resource";
import {
  businessProfilePaginate,
  createAccountBusinessProfile,
  updateAccountBusinessProfile,
} from "@/http/services/business-profile.service";
import { NextResponse } from "next/server";
import { verifySession } from "@/lib/session";

export const GET = api(async (req) => {
  const result = await businessProfilePaginate(req.nextUrl.searchParams);
  return NextResponse.json(BusinessProfileResource.paginate(result));
});

export const POST = api(async (req) => {
  const payload = await req.json();
  const validated = await createAccountBusinessProfileSchema.parseAsync(
    payload
  );

  const session = await verifySession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  const result = await createAccountBusinessProfile(+session.userId, validated);
  return NextResponse.json(new BusinessProfileResource(result, true), {
    status: 201,
  });
});

export const PUT = api(async (req) => {
  const payload = await req.json();
  const validated = await updateAccountBusinessProfileSchema.parseAsync(
    payload
  );
  const result = await updateAccountBusinessProfile(validated);
  return NextResponse.json(new BusinessProfileResource(result, true));
});
